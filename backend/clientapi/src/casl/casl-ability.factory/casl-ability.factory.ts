import { AbilityBuilder, ExtractSubjectType, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Client, Unit } from '@prisma/client';
import { JWTPayload } from 'jose';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      Client: Client;
      Unit: Unit;
    }>,
  ],
  PrismaQuery
>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: JWTPayload) {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    const groups = user.Group as Array<string>;

    if (groups.includes('AdminMaster')) {
      can(Action.Manage, 'Client'); // read-write access to everything
      can(Action.Manage, 'Unit'); // read-write access to everything
    } else {
      const clientPermissions = (user.clientPerm as string).split('|');
      const unitPermissions = (user.unitPerm as string).split('|');

      if (clientPermissions) {
        clientPermissions.forEach((perm) => {
          can(Action[perm], 'Client'); // set permission to manage client
        });
      }

      if (unitPermissions) {
        unitPermissions.forEach((perm) => {
          can(Action[perm], 'Unit'); // set permission to manage unit
        });
      }
    }

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<{
          Client: Client;
          Unit: Unit;
        }>,
    });
  }
}
