import { Icons } from "../../../assets/Icons";

export const adminOptions = [
  {
    icon: <Icons.PersonIcon />,
    option: "Pacientes",
    link: "/patients/list/active",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Profesionales",
    link: "/professionals/list/active",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Usuarios",
    link: "/users/list/active",
  },
  {
    icon: <Icons.GroupsIcon />,
    option: "Consultas/Report",
    link: "/medicalRecords/list",
  },
  {
    icon: <Icons.ReceiptIcon />,
    option: "Facturación",
    link: "/billingRecords/list",
  },
  {
    icon: <Icons.ErrorIcon />,
    option: "Reclamos",
    link: "/paymentRequests/list",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Pacientes Inactivos",
    link: "/patients/list/inactive",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Profesionales Inactivos",
    link: "/professionals/list/inactive",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Usuarios Inactivos",
    link: "/users/list/inactive",
  },
];

export const userOptions = () => {
  return [
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
};
