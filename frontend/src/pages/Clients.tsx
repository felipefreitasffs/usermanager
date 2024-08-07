import { ChangeEvent, useEffect, useState } from "react";
import { UserPlusIcon, MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, Button, Input, CardBody, Tooltip, IconButton, CardFooter, Dialog, Alert } from "@material-tailwind/react";
import api from "../utils/Http";

export function Clients() {
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [sendingFormLoading, setSendingFormLoading] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientCNPJ, setClientCNPJ] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [tableRows, setTableRows] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    loadClients(0, 10);
  }, []);

  const tableHead = ["Nome", "Email", "Telefone", "CNPJ", ""];

  const loadClients = function (skip: number, take: number) {
    const pagination = new URLSearchParams({
      skip: skip.toString(),
      take: take.toString(),
    });

    api.get(`/api/clients?${pagination.toString()}`).then((result) => {
      setTableRows(result.data)
      return
    })
  };

  const handleOpenClientDialog = () => setOpenClientDialog((cur) => !cur);

  const handleSendClientForm = async function () {
    setSendingFormLoading(true);

    try {
      await api.post("/api/clients", {
        name: clientName,
        email: clientEmail,
        cnpj: clientCNPJ,
        phone: clientPhone
      })
      handleOpenClientDialog()
      setSendingFormLoading(false);

      setAlertSuccess(true)
      setTimeout(() => {
        setAlertSuccess(false)
      }, 5000);

      loadClients(0, 10);
      setClientName('');
      setClientCNPJ('');
      setClientEmail('');
      setClientPhone('');
    } catch (error) {
      console.error(error)
    }
  };

  const handleClientNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientName(event.target.value);
  };

  const handleClientCNPJChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientCNPJ(event.target.value);
  };

  const handleClientEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientEmail(event.target.value);
  };

  const handleClientPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientPhone(event.target.value);
  };

  return (
    <>
      <Card className="h-full w-full" placeholder={undefined}>
        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined}>
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                Clientes
              </Typography>
              <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                Lista dos clientes do sistema
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Pesquisar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
              </div>
              <Button className="flex items-center gap-3" size="sm" placeholder={undefined} onClick={handleOpenClientDialog}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Novo Cliente
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
                ({ name, email, cnpj, phone }, index) => {
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
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {cnpj}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal" placeholder={undefined}>
                          {phone}
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
        open={openClientDialog}
        handler={handleOpenClientDialog}
        className="bg-transparent shadow-none" placeholder={undefined}>
        <Card className="mx-auto w-full" placeholder={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Typography variant="h4" color="blue-gray" placeholder={undefined}>
              Novo Cliente
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray" placeholder={undefined}>
              Insira as informações para cadastrar um novo cliente
            </Typography>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Input variant="standard" label="Nome" size="lg" crossOrigin={undefined} value={clientName} onChange={handleClientNameChange} />
              </div>
              <div className="w-5/12">
                <Input variant="standard" label="CNPJ" size="lg" crossOrigin={undefined} value={clientCNPJ} onChange={handleClientCNPJChange} />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-6/12">
                <Input variant="standard" type="email" label="Email" size="lg" crossOrigin={undefined} value={clientEmail} onChange={handleClientEmailChange} />
              </div>
              <div className="w-5/12">
                <Input variant="standard" label="Telefone" size="lg" crossOrigin={undefined} value={clientPhone} onChange={handleClientPhoneChange} />
              </div>
            </div>
          </CardBody>
          <br />
          <CardFooter className="pt-0 flex justify-end" placeholder={undefined}>
            <Button variant="gradient" color="blue-gray" onClick={handleSendClientForm} placeholder={undefined} loading={sendingFormLoading}>
              Confirmar
            </Button>
            <Button variant="gradient" color="red" onClick={handleOpenClientDialog} placeholder={undefined}>
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