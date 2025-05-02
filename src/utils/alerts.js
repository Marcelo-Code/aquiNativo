import Swal from "sweetalert2";
import { generalBackGroundColor } from "./helpers";
import "./alerts.css";

export const successToastifyAlert = (message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `${message}`,
    showCloseButton: true,
    showConfirmButton: false,
    timer: 4000, // duración total del toast
    timerProgressBar: false,
    background: generalBackGroundColor,
    color: "white",
    customClass: {
      popup: "custom-toast",
      icon: "custom-icon", // Clase para el ícono
    },

    didOpen: (toast) => {
      const icon = toast.querySelector(".swal2-icon.swal2-success");
      if (icon) {
        icon.style.color = "white"; // Color del ícono
      }
      // Animación de entrada
      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "1";
    },

    willClose: (toast) => {
      // No se usa directamente 'willClose', sino que se maneja el timeout para la animación de salida
    },
  });

  // Se usa setTimeout para iniciar la animación de salida antes de que termine el tiempo
  setTimeout(() => {
    const toast = document.querySelector(".swal2-toast"); // Obtener el toast activo
    if (toast) {
      // Inicia la animación de opacidad de salida antes de que termine el timer
      toast.style.transition = "opacity 1s ease"; // Asegura que la animación se vea
      toast.style.opacity = "0"; // Comienza la animación de salida
    }
  }, 3500); // La animación comienza 500ms antes de que termine el timer
};

export const errorToastifyAlert = (message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: `${message}`,
    showCloseButton: true,
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
    background: "red",
    color: "white",
    customClass: {
      popup: "custom-toast",
      icon: "custom-icon",
    },

    didOpen: (toast) => {
      const icon = toast.querySelector(".swal2-icon.swal2-success");
      if (icon) {
        icon.style.color = "white";
      }
      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "1";
    },

    willClose: (toast) => {},
  });
  setTimeout(() => {
    const toast = document.querySelector(".swal2-toast"); // Obtener el toast activo
    if (toast) {
      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "0";
    }
  }, 3500);
};
