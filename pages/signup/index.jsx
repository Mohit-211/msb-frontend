import React from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import styles from "./signup.module.scss";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { UserRegisterAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import DescriptionAlerts from "@/Constants/alert/alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ImagesCom from "@/Component/images";
const SignUp = () => {
  const router = useRouter();
  const navigate = router.replace;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePhoneChange = (newPhone) => {
    setMobile(newPhone);
  };
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });

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

  // Function to handle email change and validation
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strongPasswordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const isStrongPassword = strongPasswordRegex.test(newPassword);

    if (newPassword.trim() === "") {
      setPasswordError("");
    } else if (!isStrongPassword) {
      setPasswordError(
        "Password should contain at least one digit, one lowercase letter, one uppercase letter, and be at least eight characters long"
      );
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword.trim() === "") {
      setConfirmPasswordError("");
    } else if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (event) => {
    // if (!agree) {
    //   setAlert(true);
    //   setAlertConfig({
    //     text: "Please agree to the terms and conditions to submit the form.",
    //     icon: "info",
    //   });
    //   setTimeout(() => {
    //     setAlert(false);
    //   }, 7000);
    //   return;
    // }
    // const getToken = localStorage.getItem("UserOtpToken");
    // event.preventDefault();
    // const formDataImage = new FormData();
    // formDataImage.append("image", selectedImage);
    // if (setIsLoading === true) {
    //   setAlertConfig({
    //     text: "Your request is Submitted Please Wait for response",
    //     icon: "success",
    //   });
    // }
    UserRegisterAPI(name, email, mobile, password, confirmPassword)
      .then((res) => {
        if (res.data === 200 || res.data.status === 200) {
          setAlert(true);
          setAlertConfig({
            text: "User Created Successfully. Please Continue Your Journey",
            icon: "success",
          });
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error, "error");

        if (error.response.status === 400) {
          setAlert(true);
          setAlertConfig({
            text: error.response.data.message,
            icon: "info",
          });
          setTimeout(() => {
            setAlert(false);
            // navigate("/send/otp");
          }, 4000);
        }
      });
  };

  const handleAlertSubmit = () => {
    const missingFields = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.trim());
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!mobile) missingFields.push("Mobile");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");
    if (!isEmailValid) missingFields.push("Invalid email format")

    if (missingFields.length > 0) {
      setAlert(true);
      setAlertConfig({
        icon: "info",
        text: `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}.`,
      });
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else if (passwordError) {
      setAlert(true);
      setAlertConfig({
        icon: "error",
        text: passwordError,
      });
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      handleSubmit();
    }
  };

  const handleShowPass = () => setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPass = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {alert ? (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      ) : null}
      <Container className={styles.Signup}>
        <div className={styles.Main}>
          <div className={styles.Left}>
          <ImagesCom/>

          </div>
          <div className={styles.Right}>
            <div className={styles.form_inner}>
              <h1>Sign up</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className={styles.error_message}>{emailError}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <PhoneInput
                    country={"us"}
                    value={mobile}
                    onChange={handlePhoneChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password </Form.Label>
                  <div className={styles.input_container}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Passsword"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span className="eyesHidden">
                      <p
                        onClick={handleShowPass}
                        onMouseDown={handleMouseDownPass}
                      >
                        {showPassword ? (
                          <AiFillEye size={25} />
                        ) : (
                          <AiFillEyeInvisible size={25} />
                        )}
                      </p>
                    </span>
                  </div>
                  {passwordError && (
                    <p className={styles.error_message}>{passwordError}</p>
                  )}
                </Form.Group>{" "}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Passsword</Form.Label>
                  <div className={styles.input_container}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter confirm paassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <span className="eyesHidden">
                      <p
                        onClick={handleShowPass}
                        onMouseDown={handleMouseDownPass}
                      >
                        {showPassword ? (
                          <AiFillEye size={25} />
                        ) : (
                          <AiFillEyeInvisible size={25} />
                        )}
                      </p>
                    </span>
                  </div>
                  {confirmPasswordError && (
                    <p className={styles.error_message}>
                      {confirmPasswordError}
                    </p>
                  )}
                </Form.Group>
              </Form>
              <Button className={`button_theme ${styles.SignUpBtn}`} onClick={handleAlertSubmit}>
                Continue
              </Button>
            </div>
            <p className={styles.buttom_text}>
              Already have an account?{" "}
              <span
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const path = "/signin";
                  router.push(path);
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};
export default SignUp;
