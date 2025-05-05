import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./confirmationAlert.css";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Icons } from "../../../assets/Icons";

export const ConfirmationAlert = ({ open, onCancel, onConfirm, message }) => (
  <Dialog
    open={open}
    onCancel={onCancel}
    className="confirmationAlertPopup"
    PaperProps={{
      sx: {
        backgroundColor: `${generalBackGroundColor}`,
        borderRadius: 2,
        padding: 3,
      },
    }}
  >
    <DialogTitle sx={{ textAlign: "center", fontSize: "20px" }}>
      ¿Estás seguro?
    </DialogTitle>
    <DialogContent sx={{ textAlign: "center", fontSize: "15px" }}>
      {message}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center" }}>
      <Button
        startIcon={<Icons.DeleteIcon />}
        variant="contained"
        onClick={onConfirm}
        sx={{ backgroundColor: "red" }}
      >
        confirmar
      </Button>
      <Button
        startIcon={<Icons.CloseIcon />}
        variant="contained"
        onClick={onCancel}
        sx={{ backgroundColor: "black" }}
      >
        Cancelar
      </Button>
    </DialogActions>
  </Dialog>
);
