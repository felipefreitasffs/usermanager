import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from 'jose';
import { User } from '../../users/entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: JWTPayload) {
    const { can, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(
      PureAbility,
    );

    const groups = user.Group as Array<string>;
    const userPermission = (user.userPerm as string).split('|');

    if (groups.includes('AdminMaster')) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else if (userPermission) {
      userPermission.forEach((perm) => {
        can(Action[perm], User); // set permission to manage user
      });
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
