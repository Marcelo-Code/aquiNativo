import { Icons } from "../../../assets/Icons";

export const adminOptions = [
  {
    icon: <Icons.SettingsIcon />,
    option: "Ajustes",
    link: "/settings",
  },
  {
    icon: <Icons.EditIcon />,
    option: "Categorias",
    link: `/categories`,
  },
  {
    icon: <Icons.EditIcon />,
    option: "Edición productos",
    link: `/updateProducts`,
  },
  {
    icon: <Icons.EditIcon />,
    option: "Marcas",
    link: `/brands`,
  },
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/",
  },
  {
    icon: <Icons.ReceiptIcon />,
    option: "Ordenes de compra",
    link: "/purchaseOrders",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Usuarios",
    link: "",
  },
];

export const userOptions = [
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/",
  },
  {
    icon: <Icons.GroupsIcon />,
    option: "Nosotros",
    link: "/aboutUs",
  },
  {
    icon: <Icons.ContactsIcon />,
    option: "Contacto",
    link: "/contactUs",
  },
];
