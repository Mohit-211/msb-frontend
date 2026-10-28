"use client";

import { useState } from "react";
import styles from "./ForgotPasswordPage.module.scss";
import { Field, Input, PasswordInput } from "@/components/ui/field/Field";
import { OtpInput } from "@/components/ui/otp-input/OtpInput";
import { PASSWORD_RULE, meetsPasswordPolicy } from "@/lib/password";
const ResetPasswordStep = ({ formData, setFormData }) => {
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const handlePasswordChange = (password) => {
    setPasswordError(password !== "" && !meetsPasswordPolicy(password));
    setFormData({ ...formData, password: password });
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
            <OtpInput
              value={formData.otp}
              onChange={(code) => setFormData({ ...formData, otp: code })}
            />
          </Field>
          <Field
            label="Password"
            hint={passwordError ? undefined : PASSWORD_RULE}
            error={passwordError ? PASSWORD_RULE : undefined}
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
export default ResetPasswordStep;
