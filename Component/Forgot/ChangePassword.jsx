import React from "react";
import { useState } from "react";
import styles from "./Forgot.module.scss";
import { Field, Input, PasswordInput } from "@/Component/ui/field/Field";
const ChangePassword = ({ formData, setFormData }) => {
  const [otp, setOtp] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const handlePasswordChange = (password) => {
    setPasswordError(!isPasswordStrong(password));
    setFormData({ ...formData, password: password });
  };
  const isPasswordStrong = (enteredPassword) => {
    const passwordRegex =
      /^(?=.*[!@#$%^&()\-_=+<>?/{}~])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(enteredPassword);
  };
  const handleConfirmPassChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setFormData({ ...formData, confirmPassword: enteredConfirmPassword });
    if (enteredConfirmPassword === '') {
      setPasswordMatchError(false);
    } else {
      setPasswordMatchError(formData.password !== enteredConfirmPassword);
    }
  };
  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Field label="Email">
            <Input type="email" value={formData.email} disabled readOnly />
          </Field>
          <Field label="Enter OTP">
            <Input
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setFormData({ ...formData, otp: e.target.value });  // Update formData with OTP
              }}
            />
          </Field>
          <Field
            label="Password"
            error={
              passwordError
                ? "Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one number."
                : undefined
            }
          >
            <PasswordInput
              placeholder="New Password"
              value={formData.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              autoComplete="new-password"
            />
          </Field>
          <Field
            label="Confirm New Password"
            error={passwordMatchError ? "Passwords do not match" : undefined}
          >
            <PasswordInput
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleConfirmPassChange}
              autoComplete="new-password"
            />
          </Field>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
