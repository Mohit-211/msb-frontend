import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
export default function DescriptionAlerts({ text,icon,button,rechageButton }) {
  // const navigate= useNavigate()
  const router =useRouter()
  useEffect(() => {
    const handleClose = () => {
      Swal.close();
    };

    Swal.fire({
      text: text,
      icon: icon,
      showCancelButton: button,
      showConfirmButton: true,
      confirmButtonText:rechageButton|| "Ok" ,
      
    }).then((result) => {
      if(rechageButton){
        if(result.isConfirmed === true){
          router.replace('/payment')
        }
      }
      
      handleClose();
     
    });
  }, [text]);

  return null;
}
