import React, { useEffect, useState } from "react";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import { SendOTPAPI, VerifyOtpAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import CreateAccount from "./CreateAccount";
import Styles from "./OtpStep.module.scss";
import { Button } from "@/Component/ui/button/Button";
import { toast } from "@/Component/ui/toast/toast";
export default function OtpStep() {
  const steps = ["Select campaign settings", "Create an ad group", "test"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [emailError, setEmailError] = useState("");
  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.trim() === "") {
      setEmailError("");
    } else if (!emailRegex.test(input)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const router = useRouter();
  const navigate = router.replace;
  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleVerifyOTP = () => {
    VerifyOtpAPI(formData.email, formData.otp)
      .then((res) => {
        if (res.data === 200 || res.data.status === 200) {
          toast.success("OTP has been verified. Please Create Your Profile.");
          setTimeout(() => {
            // navigate("/signup")
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            handleNext();
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(
          error?.response?.data?.message ||
            "That code didn't work. Check it and try again.",
        );
      });
  };
  const handleSendOTP = () => {
    if (emailError) {
      toast.error("Invalid email format");
    } else {
      SendOTPAPI(formData.email)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("OTP has been Sent To Your Email");
            setTimeout(() => {
              const newCompleted = completed;
              newCompleted[activeStep] = true;
              setCompleted(newCompleted);
              handleNext();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error, "error");
          toast.error(
            error?.response?.data?.message ||
              "Couldn't send the code. Try again.",
          );
        });
    }
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {allStepsCompleted() ? null : (
        <>
          <div className={Styles.stepBody}>
            {isClient && activeStep === 0 && (
              <SendOtp
                formData={formData}
                setFormData={setFormData}
                emailError={emailError}
                validateEmail={validateEmail}
              />
            )}
            {activeStep === 1 && (
              <VerifyOtp formData={formData} setFormData={setFormData} />
            )}
            {activeStep === 2 && (
              <CreateAccount formData={formData} setFormData={setFormData} />
            )}
          </div>
          <div className={Styles.stepActions}>
            {isClient && completedSteps() === totalSteps() - 3 ? (
              <div className={Styles.nextBtn}>
                <Button
                  onClick={handleSendOTP}
                  className={Styles.forgot_form_button}
                  disabled={!formData.email}
                >
                  Send Otp
                </Button>
              </div>
            ) : isClient && completedSteps() === totalSteps() - 2 ? (
              <div className={Styles.nextBtn}>
                <Button
                  onClick={handleVerifyOTP}
                  className={Styles.forgot_form_button}
                  disabled={!formData.otp}
                >
                  Verify Otp
                </Button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
