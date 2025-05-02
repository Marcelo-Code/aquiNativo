import { useEffect, useState } from "react";
import { BurguerMenu } from "./BurguerMenu";
import { adminOptions, userOptions } from "./optionsMenu";

export const BurguerMenuContainer = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const { userProfile = "profesional", userProfessionalId } =
  //   useContext(GeneralContext);

  const userProfile = "user";
  const userProfessionalId = 1;

  useEffect(() => {
    if (userProfile === "admin") setOptions(adminOptions);
    if (userProfile === "user") setOptions(userOptions(userOptions));
  }, [userProfile, userProfessionalId]);

  const burguerMenuProps = {
    toggleDrawer,
    options,
    open,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
