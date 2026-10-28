import { useEffect } from "react";
import Swal from "sweetalert2";
export default function DescriptionAlerts({ text,icon,button }) {
  useEffect(() => {
    const handleClose = () => {
      Swal.close();
    };

    Swal.fire({
      text: text,
      icon: icon,
      showCancelButton: button,
      showConfirmButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "var(--color-primary)",
    }).then(() => {
      handleClose();
    });
  }, [text]);

  return null;
}
