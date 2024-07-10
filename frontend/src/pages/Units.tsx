import { ChangeEvent, cloneElement, useEffect, useState } from "react";
import { UserPlusIcon, MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button, Input, CardBody, Tooltip, IconButton, CardFooter, Dialog, Alert, Select, Option } from "@material-tailwind/react";
import { State, City } from 'country-state-city';
import api from "../utils/Http";

type client = {
  name: string;
  email: string;
  cnpj: string;
  phone: string;
}

type units = {
  name: string;
  state: string;
  city: string;
  address: string;
  client: client;
  responsible: string;
}

export function Units() {
  const [openUnitDialog, setOpenUnitDialog] = useState(false);
  const [sendingFormLoading, setSendingFormLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [unitName, setUnitName] = useState('');
  const [unitAddress, setUnitAddress] = useState('');
  const [unitClient, setUnitClient] = useState('');
  const [unitResponsible, setUnitResponsible] = useState('');
  const [unitCity, setUnitCity] = useState('');
  const [unitState, setUnitState] = useState('');
  const [tableRows, setTableRows] = useState<units[]>([]);
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    loadUnits(0, 10);
    loadUser();
    loadClients();
    setStates(State.getStatesOfCountry('BR').map((state) => state.name))
  }, []);

  useEffect(() => {
    const state = State.getStatesOfCountry('BR').filter((state) => state.name === unitState)[0]

    if (state) setCities(City.getCitiesOfState('BR', state.isoCode).map((city) => city.name))
  }, [unitState])

  const tableHead = ["Nome", "Estado", "Cidade", "Endereço", "Cliente", "Responsável", ""];

  const loadUser = function () {
    api.get("/api/users").then((result) => {
      const listUsers = result.data.map((user: { email: string; firstName: string; lastName: string; }) => {
        return { id: user.email, name: `${user.firstName} ${user.lastName}` }
      })
      setUsers(listUsers)
      return
    })
  }

  const loadClients = function () {
    api.get("/api/clients").then((result) => {
      const listClients = result.data.map((client: { id: string; name: string }) => {
        return { id: client.id, name: client.name }
      })
      setClients(listClients)
      return
    })
  }

  const loadUnits = function (skip: number, take: number) {
    const pagination = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
    });

    api.get(`/api/units?${pagination.toString()}`).then((result) => {
      setTableRows(result.data)
      return
    })
  };

  const handleOpenUnitDialog = () => setOpenUnitDialog((cur) => !cur);

  const handleSendUnitForm = async function () {
    setSendingFormLoading(true);

    try {
      await api.post("/api/units", {
        name: unitName,
        address: unitAddress,
        state: unitState,
        city: unitCity,
        clientId: +unitClient,
        responsible: unitResponsible
      })

      handleOpenUnitDialog()
      setSendingFormLoading(false);

      setAlertSuccess(true)
      setTimeout(() => {
        setAlertSuccess(false)
      }, 5000);

      loadUnits(0, 10);
      setUnitName('');
      setUnitAddress('');
      setUnitClient('');
      setUnitResponsible('');
    } catch (error) {
      setSendingFormLoading(false);
      console.error(error)
    }
  };

  const handleUnitNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnitName(event.target.value);
  };

  const handletUnitAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnitAddress(event.target.value);
  };

  const handleUnitClientChange = (event: string | undefined) => {
    if (event) setUnitClient(event);
  };

  const handleUnitResponsibleChange = (event: string | undefined) => {
    if (event) setUnitResponsible(event);
  };

  const handleUnitStateChange = (event: string | undefined) => {
    if (event) setUnitState(event);
  };

  const handleUnitCityChange = (event: string | undefined) => {
    console.log('city', event)
    if (event) setUnitCity(event);
  };

  return (
    <>
      <Card className="h-full w-full" placeholder={undefined}>
        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                Unidades
              </Typography>
              <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                Lista das unidades dos clientes
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Pesquisar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
              </div>
              <Button className="flex items-center gap-3" size="sm" placeholder={undefined} onClick={handleOpenUnitDialog}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Nova Unidade
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
                ({ name, state, city, address, client, responsible }, index) => {
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
                          {state}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {city}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {address}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {client.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {responsible}
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
        open={openUnitDialog}
        handler={handleOpenUnitDialog}
        className="bg-transparent shadow-none" placeholder={undefined}>
        <Card className="mx-auto w-full" placeholder={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              Nova Unidade
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray" placeholder={undefined}>
              Insira as informações para cadastrar uma nova unidade
            </Typography>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Input variant="standard" label="Nome" size="lg" crossOrigin={undefined} value={unitName} onChange={handleUnitNameChange} />
              </div>
              <div className="w-6/12">
                <Input variant="standard" label="Endereço" size="lg" crossOrigin={undefined} value={unitAddress} onChange={handletUnitAddressChange} />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Select
                  variant="standard"
                  size="lg"
                  label="Estado"
                  value={unitState}
                  onChange={handleUnitStateChange}
                  selected={(element) => element &&
                    cloneElement(element, {
                      disabled: true,
                      className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })} placeholder={undefined}                >
                  {states.map((state) => (
                    <Option key={state} value={state} className="flex items-center gap-2">
                      {state}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="w-6/12">
                {cities && (
                  <Select
                    variant="standard"
                    size="lg"
                    label="Cidade"
                    value={unitCity}
                    onChange={handleUnitCityChange}
                    placeholder={undefined}
                    selected={(element) => element &&
                      cloneElement(element, {
                        disabled: true,
                        className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                      })}
                  >
                    {cities.map((city) => (
                      <Option key={city} value={city} className="flex items-center gap-2">
                        {city}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Select
                  variant="standard"
                  size="lg"
                  label="Cliente"
                  value={unitClient}
                  onChange={handleUnitClientChange}
                  selected={(element) => element &&
                    cloneElement(element, {
                      disabled: true,
                      className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })} placeholder={undefined}                >
                  {clients.map(({ id, name }) => (
                    <Option key={id} value={`${id}`} className="flex items-center gap-2">
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="w-6/12">
                <Select
                  variant="standard"
                  size="lg"
                  label="Responsáveis"
                  value={unitResponsible}
                  onChange={handleUnitResponsibleChange}
                  selected={(element) => element &&
                    cloneElement(element, {
                      disabled: true,
                      className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })} placeholder={undefined}                >
                  {users.map(({ id, name }) => (
                    <Option key={id} value={id} className="flex items-center gap-2">
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </CardBody>
          <br />
          <CardFooter className="pt-0 flex justify-end" placeholder={undefined}>
            <Button variant="gradient" color="blue-gray" onClick={handleSendUnitForm} placeholder={undefined} loading={sendingFormLoading}>
              Confirmar
            </Button>
            <Button variant="gradient" color="red" onClick={handleOpenUnitDialog} placeholder={undefined}>
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