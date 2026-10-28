import * as React from "react";
import SendOtp from "./SendOtp";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { ForgetSendOTPAPI, ForgotPassword } from "@/Constants/Api/Api";
import styles from "./Forgot.module.scss";
import { Button } from "@/Component/ui/button/Button";
import { toast } from "@/Component/ui/toast/toast";
const steps = ["Create an ad group", "Create an ad"];
export default function ForgotPasswordComponent() {
  const router =useRouter()
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const Navigation = useCallback(() => {
    let value = "/signin";
    router.replace(value);
  }, [router]);

  const handleChangePassword = () => {
    ForgotPassword(
      formData.email,
      parseInt(formData.otp),
      formData.password,
      formData.confirmPassword
    )
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          Navigation();
        }, 2000);
      })
      .catch((error) => {
        toast.warning(
          error?.response?.data?.message ||
            "Password and Confirm Password must be equal",
        );
      });
  };

  const handleSendOTP = () => {
    if (formData.email.trim() === '') {
      toast.warning("Email is required to send OTP.");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.warning("Invalid email format. Please enter a valid email address.");
      return;
    }

    ForgetSendOTPAPI(formData.email)
      .then((res) => {
        if (res.status === 200) {
          toast.info("We have sent an OTP to your email.");
        }
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      })
      .catch((error) => {
        const data = error?.response?.data;
        const show = data?.code === 404 ? toast.warning : toast.info;
        show(data?.message || "Couldn't send the code. Try again.");
      });
  };

  return (
    <div className={styles.forgotCard}>
        <div>
          <div >
            {activeStep === 0 && (
              <SendOtp formData={formData} setFormData={setFormData} validateEmail={validateEmail} />
            
            )}
            {activeStep === 1 && (
              <ChangePassword formData={formData} setFormData={setFormData} />
            
            )}
          </div> 
          <div>
              <div className={styles.actions}>
                {completedSteps() === totalSteps() - 2 ? (
                  <Button onClick={handleSendOTP}>Send OTP</Button>
                ) : (
                  <Button onClick={handleChangePassword}>Reset Password</Button>
                )}
              </div>
            </div>
        </div>
    </div>
  );
}
