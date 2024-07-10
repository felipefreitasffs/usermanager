import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Unit } from '@prisma/client';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UnitCreateInput): Promise<Unit> {
    return this.prisma.unit.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UnitWhereUniqueInput;
    where?: Prisma.UnitWhereInput;
    orderBy?: Prisma.UnitOrderByWithRelationInput;
  }): Promise<Unit[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.unit.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        client: true,
      },
    });
  }

  findOne(
    UnitWhereUniqueInput: Prisma.UnitWhereUniqueInput,
  ): Promise<Unit | null> {
    return this.prisma.unit.findUnique({
      where: UnitWhereUniqueInput,
      include: {
        client: true,
      },
    });
  }

  update(params: {
    where: Prisma.UnitWhereUniqueInput;
    data: Prisma.UnitUpdateInput;
  }): Promise<Unit> {
    const { where, data } = params;
    return this.prisma.unit.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UnitWhereUniqueInput): Promise<Unit> {
    return this.prisma.unit.delete({
      where,
    });
  }
}
