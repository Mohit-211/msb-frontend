import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import { Button } from "react-bootstrap";
import { SendOTPAPI, VerifyOtpAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import DescriptionAlerts from "@/Constants/alert/alert";
import CreateAccount from "./CreateAccount";
import  Styles from "./OtpStep.module.scss";
export default function OtpStep() {
  const steps = ["Select campaign settings", "Create an ad group", "test"];
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
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
    setAlert(false);
    VerifyOtpAPI(formData.email, formData.otp)
      .then((res) => {
        if (res.data === 200 || res.data.status === 200) {
          setAlert(true);
          setAlertConfig({
            text: "OTP has been verified. Please Create Your Profile.",
            icon: "success",
          });
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
      });
  };
  const handleSendOTP = () => {
    if (emailError) {
      setAlert(true);
      setAlertConfig({
        text: "Invalid email format",
        icon: "error",
      });
    } else {
      SendOTPAPI(formData.email)
        .then((res) => {
          if (res.data.status === 200) {
            setAlert(true);
            setAlertConfig({
              text: "OTP has been Sent To Your Email",
              icon: "success",
            });
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
          if (error.response.data.message) {
            setAlert(true);
            setAlertConfig({
              text: error.response.data.message,
              icon: "error",
            });
            setTimeout(() => {
              setAlert(false);
            }, 2000);
          }
        });
    }
  };
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {alert ? (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      ) : null}
      <div className="forgot_form-11">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
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
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <>
                {isClient && completedSteps() === totalSteps() - 3 ? (
                  <div className={`procced-btn ${Styles.nextBtn}`}>
                    <Button
                      onClick={handleSendOTP}
                      className={`button_theme ${Styles.forgot_form_button}`}
                      // style={{ marginLeft: "20px", marginRight: "20px" }}
                      disabled={!formData.email}
                      // size="sm"
                    >
                      Send Otp
                    </Button>
                  </div>
                ) : isClient && completedSteps() === totalSteps() - 2 ? (
                  <div className={`next-btn ${Styles.nextBtn}`}>
                    <Button
                      onClick={handleVerifyOTP}
                      className={`button_theme ${Styles.forgot_form_button}`}
                      // style={{ marginLeft: "20px", marginRight: "20px" }}
                      // size="sm"
                      disabled={!formData.otp}
                    >
                      Verify Otp
                    </Button>
                  </div>
                ) : (
                  <div className="reset-btn"></div>
                )}
              </>
            </Box>
          </React.Fragment>
        )}
      </div>
    </>
  );
}
