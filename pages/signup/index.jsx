import React from "react";
import styles from "./signup.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { UserRegisterAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import ImagesCom from "@/Component/images";
import { Button } from "@/Component/ui/button/Button";
import { Container } from "@/Component/ui/container/Container";
import { Field, Input, PasswordInput } from "@/Component/ui/field/Field";
import { toast } from "@/Component/ui/toast/toast";
const SignUp = () => {
  const router = useRouter();
  const navigate = router.replace;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePhoneChange = (newPhone) => {
    setMobile(newPhone);
  };

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
    UserRegisterAPI(name, email, mobile, password, confirmPassword)
      .then((res) => {
        if (res.data === 200 || res.data.status === 200) {
          toast.success("User Created Successfully. Please Continue Your Journey");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error, "error");

        if (error?.response?.status === 400) {
          toast.info(error.response.data.message);
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
      toast.info(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}.`
      );
    } else if (passwordError) {
      toast.error(passwordError);
    } else {
      handleSubmit();
    }
  };

  return (
    <Container className={styles.Signup}>
      <div className={styles.Main}>
        <div className={styles.Left}>
          <ImagesCom />
        </div>
        <div className={styles.Right}>
          <div className={styles.form_inner}>
            <h1>Sign up</h1>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleAlertSubmit();
              }}
            >
              <Field label="Full Name">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field label="Email" error={emailError || undefined}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Field>
              <Field id="signup-phone" label="Phone Number">
                <PhoneInput
                  country={"us"}
                  value={mobile}
                  onChange={handlePhoneChange}
                  inputProps={{ id: "signup-phone" }}
                />
              </Field>
              <Field label="Password" error={passwordError || undefined}>
                <PasswordInput
                  placeholder="Enter a password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                />
              </Field>
              <Field label="Confirm Password" error={confirmPasswordError || undefined}>
                <PasswordInput
                  placeholder="Enter the password again"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  autoComplete="new-password"
                />
              </Field>
              <Button type="submit" className={styles.SignUpBtn}>
                Continue
              </Button>
            </form>
          </div>
          <p className={styles.buttom_text}>
            Already have an account?{" "}
            <span
              className={styles.signinLink}
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
  );
};
export default SignUp;
