import { ChangeEvent, useEffect, useState } from "react";
import { UserPlusIcon, MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button, Input, CardBody, Tooltip, IconButton, CardFooter, Dialog, Alert, Checkbox } from "@material-tailwind/react";
import api from "../utils/Http";

type groups = {
  name: string;
  attributes: unknown[]
}

export function Groups() {
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [sendingFormLoading, setSendingFormLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [tableRows, setTableRows] = useState<groups[]>([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [groupAttr, setGroupAttr] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    loadGroups(0, 10);
    loadPermissions();
  }, []);

  const tableHead = ["Nome", "Permissões", ""];

  const loadGroups = function (skip: number, take: number) {
    const pagination = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
    });

    api.get(`/api/groups?${pagination.toString()}`).then((result) => {
      setTableRows(result.data)
      return
    })
  };

  const loadPermissions = function () {
    api.get(`/api/groups/permissions`).then((result) => {
      const gpAttr: Record<string, string | undefined> = {}

      console.log('result.data', result.data)

      result.data.map((perm: { config: { [x: string]: string | string; }; }) => {
        gpAttr[perm.config["user.attribute"]] = undefined
      })

      console.log('gpAttr', gpAttr)

      setGroupAttr(gpAttr)

      setPermissions(result.data)
      return
    })
  };

  const handleOpenGroupDialog = () => setOpenGroupDialog((cur) => !cur);

  const handleSendGroupForm = async function () {
    setSendingFormLoading(true);

    try {
      await api.post("/api/groups", {
        name: groupName,
        attributes: groupAttr
      })

      handleOpenGroupDialog()
      setSendingFormLoading(false);

      setAlertSuccess(true)
      setTimeout(() => {
        setAlertSuccess(false)
      }, 5000);

      loadGroups(0, 10);
      setGroupName('');
    } catch (error) {
      setSendingFormLoading(false);
      console.error(error)
    }
  };

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleCheckPermissionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checkType = event.target.name.split('#')[0];
    const permissionId = event.target.name.split('#')[1];

    const permissionName = permissions.find(p => p.id === permissionId)?.name;

    console.log(event.target.checked)

    if (event.target.checked) {
      const listPerms = groupAttr[permissionName] ? groupAttr[permissionName].split('|') : [""]

      if (listPerms.indexOf('') >= 0)
        listPerms.splice(listPerms.indexOf(''), 1)

      listPerms.push(checkType)

      groupAttr[permissionName] = listPerms.join('|')
    } else {
      const listPerms = groupAttr[permissionName] ? groupAttr[permissionName].split('|') : [""]

      if (listPerms.indexOf('') >= 0)
        listPerms.splice(listPerms.indexOf(''), 1)

      listPerms.splice(listPerms.indexOf(checkType), 1)
      groupAttr[permissionName] = listPerms.join('|')
    }

    console.log(groupAttr)

    setGroupAttr(groupAttr);

  }

  return (
    <>
      <Card className="h-full w-full" placeholder={undefined}>
        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                Grupos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                Lista de Grupos de Usuários
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Pesquisar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
              </div>
              <Button className="flex items-center gap-3" size="sm" placeholder={undefined} onClick={handleOpenGroupDialog}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Novo Grupo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto p-2 px-0" placeholder={undefined}>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head, index) => (
                  <th
                    key={`${head}-${index}`}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70" placeholder={undefined}>
                      {head}{" "}
                      {index !== tableHead.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(
                ({ name, attributes }, index) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {name}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {Object.keys(attributes).map((key) => <p key={key}>{key}: {attributes[key]}</p>)}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Editar Client">
                          <IconButton variant="text" placeholder={undefined}>
                            <PencilIcon color="blue-gray" className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Excluir Client">
                          <IconButton variant="text" placeholder={undefined}>
                            <TrashIcon color="red" className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
          <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
            Página 1 de 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" placeholder={undefined}>
              Anterior
            </Button>
            <Button variant="outlined" size="sm" placeholder={undefined}>
              Próxima
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog
        size="md"
        open={openGroupDialog}
        handler={handleOpenGroupDialog}
        className="bg-transparent shadow-none" placeholder={undefined}>
        <Card className="mx-auto w-full" placeholder={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              Novo Grupo
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray" placeholder={undefined}>
              Insira as informações para cadastrar um novo grupo
            </Typography>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Input variant="standard" label="Nome" size="lg" crossOrigin={undefined} value={groupName} onChange={handleGroupNameChange} />
              </div>
            </div>
          </CardBody>
          <br />
          <Card className="mx-auto w-full" placeholder={undefined}>
            <CardBody className="flex flex-row gap-4" placeholder={undefined}>
              {
                permissions.map(p => {
                  return (
                    <Card className="mx-auto" placeholder={undefined}>
                      <CardHeader className="text-center" placeholder={undefined}>
                        <Typography
                          className="mb-3 font-normal"
                          variant="lead"
                          color="gray" placeholder={undefined}>
                          {p.name}
                        </Typography>
                      </CardHeader>
                      <CardBody placeholder={undefined}>
                        <Checkbox color="indigo" crossOrigin={undefined} label="Ler" name={`read#${p.id}`} onChange={handleCheckPermissionChange} />
                        <Checkbox color="indigo" crossOrigin={undefined} label="Criar" name={`create#${p.id}`} onChange={handleCheckPermissionChange} />
                        <Checkbox color="indigo" crossOrigin={undefined} label="Atualizar" name={`update#${p.id}`} onChange={handleCheckPermissionChange} />
                        <Checkbox color="indigo" crossOrigin={undefined} label="Deletar" name={`delete#${p.id}`} onChange={handleCheckPermissionChange} />
                      </CardBody>
                    </Card>
                  )
                })
              }
            </CardBody>
          </Card>
          <br />
          <CardFooter className="pt-0 flex justify-end" placeholder={undefined}>
            <Button variant="gradient" color="blue-gray" onClick={handleSendGroupForm} placeholder={undefined} loading={sendingFormLoading}>
              Confirmar
            </Button>
            <Button variant="gradient" color="red" onClick={handleOpenGroupDialog} placeholder={undefined}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      {
        alertSuccess ? <Alert color="green" className="top-10 right-0">A success alert for showing message.</Alert> : <></>
      }
    </>
  )
}