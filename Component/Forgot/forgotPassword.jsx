import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SendOtp from "./SendOtp";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useCallback } from "react";
import { useRouter } from "next/router";
import DescriptionAlerts from "@/Constants/alert/alert";
import { ForgetSendOTPAPI, ForgotPassword, SendOTPAPI } from "@/Constants/Api/Api";
import styles from  "./Forgot.module.scss";
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
  const [alert, setalert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
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
    setalert(false)
    ForgotPassword(
      formData.email,
      parseInt(formData.otp),
      formData.password,
      formData.confirmPassword
    )
      .then((res) => {
        if (res.status) {
          setalert(true);
          setAlertConfig({
            icon: "success",
            text: res.data.message,
            time: 3000,
          });
        }
        setTimeout(() => {
          setalert(false);
          Navigation();
        }, 2000);
      })
      .catch((error) => {
        setalert(true);
        setAlertConfig({
          icon: "warning",
          text: "Password and Confirm Password must be equal",
        });
        setTimeout(() => {
          setalert(false);
        }, 7000);
      });
  };

  const handleSendOTP = () => {
    setalert(false);
  
    // Check if formData.email is empty
    if (formData.email.trim() === '') {
      setalert(true);
      setAlertConfig({
        icon: "warning",
        text: "Email is required to send OTP.",
      });
      setTimeout(() => {
        setalert(false);
      }, 5000);
      return; // Prevent further execution
    }

     // Check if email format is invalid
  if (!validateEmail(formData.email)) {
    setalert(true);
    setAlertConfig({
      icon: "warning",
      text: "Invalid email format. Please enter a valid email address.",
    });
    setTimeout(() => {
      setalert(false);
    }, 5000);
    return; // Prevent further execution
  }
  
    ForgetSendOTPAPI(formData.email)
      .then((res) => {
        if (res.status === 200) {
          setalert(true);
          setAlertConfig({
            icon: "info",
            text: "We have sent an OTP to your email.",
            time: 5000,
          });
        }
        setTimeout(() => {
          setalert(false);
        }, 5000);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      })
      .catch((error) => {
        setalert(true);
        setAlertConfig({
          icon: error.response.data.code === 404 ? "warning" : "info",
          text: error.response.data.message,
        });
        setTimeout(() => {
          setalert(false);
        }, 7000);
      });
  };

  return (
    <div className="forgot_form-1">
      {alert && (
        <DescriptionAlerts
          text={alertConfig.text}
          icon={alertConfig.icon}
          time={alertConfig.time}
        />
      )}
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
              {completedSteps() === totalSteps() - 2 ? (
                <div className="next-btn" style={{textAlign:"center",width:"30%", margin:"auto"}}>
                  <Button
                    onClick={handleSendOTP}
                    className="button_theme"
                  >
                    Send OTP
                  </Button>
                </div>
              ) : (
                <div className="reset-btn"  style={{textAlign:"center",width:"30%", margin:"auto"}}>
                  <Button
                    onClick={handleChangePassword}
                    className="button_theme"
                  >
                    Reset Password
                  </Button>
                </div>
              )}
            </div>
        </div>
    </div>
  );
}
