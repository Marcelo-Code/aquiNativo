import { Icons } from "../../../assets/Icons";

export const adminOptions = [
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/",
  },
  {
    icon: <Icons.EditIcon />,
    option: "Edición",
    link: `/updateProducts`,
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
  {
    icon: <Icons.ReceiptIcon />,
    option: "Ordenes de compra",
    link: "/purchaseOrders",
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
