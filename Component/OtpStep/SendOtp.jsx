import React from "react";
import styles from "./OtpStep.module.scss";
import { Field, Input } from "@/Component/ui/field/Field";

const SendOtp = ({ formData, setFormData, emailError,validateEmail }) => {

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setFormData({ ...formData, email: inputEmail });
    validateEmail(inputEmail);
  };

  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Field label="Email address" error={emailError || undefined}>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </Field>
        </form>
      </div>
    </div>
  );
};
export default SendOtp;
