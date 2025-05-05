import { Icons } from "../../../assets/Icons";

export const adminOptions = [
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/readProducts",
  },
  {
    icon: <Icons.EditIcon />,
    option: "Edición",
    link: `/updateProducts`,
  },
  {
    icon: <Icons.GroupsIcon />,
    option: "Nosotros",
    link: "",
  },
  {
    icon: <Icons.ContactsIcon />,
    option: "Contacto",
    link: "",
  },
  {
    icon: <Icons.ReceiptIcon />,
    option: "Mis compras",
    link: "",
  },
  {
    icon: <Icons.LogoutIcon />,
    option: "Logout",
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
    link: "",
  },
  {
    icon: <Icons.ContactsIcon />,
    option: "Contacto",
    link: "",
  },
  {
    icon: <Icons.ReceiptIcon />,
    option: "Mis compras",
    link: "",
  },
  {
    icon: <Icons.LogoutIcon />,
    option: "Logout",
    link: "",
  },
];
