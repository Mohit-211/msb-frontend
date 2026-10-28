import React, { useState } from "react";
import styles from "./OtpStep.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { UserRegisterAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { Button } from "@/Component/ui/button/Button";
import { Field, Input, PasswordInput } from "@/Component/ui/field/Field";
import { toast } from "@/Component/ui/toast/toast";
const CreateAccount = ({ formData, setFormData }) => {
  const router = useRouter();
  const navigate = router.replace;
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handlePhoneChange = (newPhone) => {
    setMobile(newPhone);
  };

  const strongPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isStrongPassword = strongPasswordRegex.test(newPassword);

    if (newPassword.trim() === '') {
      setPasswordError('');
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

    if (newConfirmPassword.trim() === '') {
      setConfirmPasswordError('');
    } else if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleCreateAccount = () => {
    UserRegisterAPI(name, formData.email, mobile, password, confirmPassword)
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

    if (!name) missingFields.push("Name");
    if (!formData.email) missingFields.push("Email");
    if (!mobile) missingFields.push("Mobile");
    if (!password) missingFields.push("Password");
    if (!confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      toast.info(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}.`
      );
    } else if (passwordError) {
      toast.error(passwordError);
    } else {
      handleCreateAccount();
    }
  };

  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
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
          <Field label="Email">
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              disabled
              readOnly
            />
          </Field>
          <Field id="create-account-phone" label="Phone Number">
            <PhoneInput
              country={"us"}
              value={mobile}
              onChange={handlePhoneChange}
              disableDropdown={true}
              inputProps={{ id: "create-account-phone" }}
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
    </div>
  );
};
export default CreateAccount;
