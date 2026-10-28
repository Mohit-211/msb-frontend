"use client";

import { useState } from "react";
import styles from "./ForgotPasswordPage.module.scss";
import { Field, Input } from "@/components/ui/field/Field";
import { OtpInput } from "@/components/ui/otp-input/OtpInput";
const RequestCodeStep = ({ formData, setFormData, validateEmail }) => {
  const [emailValid, setEmailValid] = useState(true);

  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Field label="Email address" error={emailValid ? undefined : "Invalid email address"}>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setFormData({ ...formData, email: newEmail });
                setEmailValid(validateEmail(newEmail));
              }}
            />
          </Field>
          <Field label="Enter OTP">
            <OtpInput disabled />
          </Field>
          <Field label="Password">
            <Input type="password" placeholder="New Password" disabled />
          </Field>
          <Field label="Confirm New Password">
            <Input type="password" placeholder="Confirm New Password" disabled />
          </Field>
        </form>
      </div>
    </div>
  );
};
export default RequestCodeStep;
