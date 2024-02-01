import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from 'jose';
import { Client } from 'src/clients/entities/client.entity';
import { Unit } from 'src/units/entities/unit.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof Client | typeof Unit> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: JWTPayload) {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    const groups = user.Group as Array<string>;

    if (groups.includes('AdminMaster')) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      const clientPermission = (user.clientPerm as string).split('|');
      const unitPermission = (user.unitPerm as string).split('|');

      if (clientPermission) {
        clientPermission.forEach((perm) => {
          can(Action[perm], Client); // set permission to manage client
        });
      }

      if (unitPermission) {
        unitPermission.forEach((perm) => {
          can(Action[perm], Unit); // set permission to manage unit
        });
      }
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
