import { useContext, useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.jpg";
import { BuildingOfficeIcon } from "@heroicons/react/16/solid";
import { AuthContext } from "../Context/AuthProvider";

export function SidebarWithBurgerMenu() {
  const { auth } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [location, setLocation] = useState('');

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const pathname = window.location.pathname;

  useEffect(() => {
    setLocation(pathname)
  }, [pathname]);

  return (
    <>
      <div className="flex justify-between items-center flex-row py-2 px-5 bg-myBlue drop-shadow-lg">
        <div className="flex items-center">
          <IconButton variant="text" size="md" color="white" onClick={openDrawer} placeholder={undefined}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <Typography
            as="li"
            variant="h6"
            color="white"
            className="py-1 px-5 font-normal" placeholder={undefined}        >
            UserManager
          </Typography>
        </div>
        <Typography
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal" placeholder={undefined}        >
          Olá, {auth ? auth.name as string : ''}
        </Typography>
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} placeholder={undefined}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4" placeholder={undefined}>
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src={logo}
              alt="brand"
              className="h-12 w-12"
            />
            <Typography variant="h5" color="white" placeholder={undefined}>
              UserManager
            </Typography>
          </div>
          <List placeholder={undefined}>
            <a href="/users" className="text-initial">
              <ListItem selected={location === '/users'} placeholder={undefined}>
                <ListItemPrefix placeholder={undefined}>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Usuários
              </ListItem>
            </a>
            <a href="/groups" className="text-initial">
              <ListItem placeholder={undefined}>
                <ListItemPrefix placeholder={undefined}>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                Grupos
              </ListItem>
            </a>

            <hr className="my-2 border-blue-gray-50" />

            <a href="/clients" className="text-initial">
              <ListItem selected={location === '/clients'} placeholder={undefined}>
                <ListItemPrefix placeholder={undefined}>
                  <UsersIcon className="h-5 w-5" />
                </ListItemPrefix>
                Clientes
              </ListItem>
            </a>
            <a href="/units" className="text-initial">
              <ListItem selected={location === '/units'} placeholder={undefined}>
                <ListItemPrefix placeholder={undefined}>
                  <BuildingOfficeIcon className="h-5 w-5" />
                </ListItemPrefix>
                Unidades
              </ListItem>
            </a>

            <hr className="my-2 border-blue-gray-50" />

            <a href="/logout" className="text-initial">
              <ListItem placeholder={undefined}>
                <ListItemPrefix placeholder={undefined}>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </a>
          </List>
        </Card>
      </Drawer>
    </>
  );
}