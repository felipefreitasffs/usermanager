import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import kcAdminClient from 'src/helpers/keycloak';

@Injectable()
export class GroupsService {
  async create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto);

    try {
      const kc = await kcAdminClient();
      const group = await kc.groups.create(createGroupDto);
      return group;
    } catch (error) {
      console.error(error);
      console.error(error.body);
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const kc = await kcAdminClient();
    const groups = await kc.groups.find({
      briefRepresentation: false,
    });

    return groups;
  }

  async findAllPermissions() {
    const kc = await kcAdminClient();
    const scope = await kc.clientScopes.findOneByName({
      name: 'Permissions',
    });

    const listScopeMappings = await kc.clientScopes.listProtocolMappers({
      id: scope.id,
    });

    return listScopeMappings;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
