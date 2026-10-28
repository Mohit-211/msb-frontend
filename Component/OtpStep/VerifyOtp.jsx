import React from "react";
import styles from "./OtpStep.module.scss";
import OTPInput from "react-otp-input";
import { Field, Input } from "@/Component/ui/field/Field";
const VerifyOtp = ({ formData, setFormData }) => {

  return (
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <Field label="Email">
            <Input type="email" value={formData.email} disabled readOnly />
          </Field>
          <Field id="verify-otp" label="OTP">
            <OTPInput
              value={formData.otp}
              onChange={(otpValue) => {
                setFormData({ ...formData, otp: otpValue });
              }}
              numInputs={4}
              containerStyle={styles.otpInputs}
              // The library's inline width (1em) is dropped so .otpInput sizes the boxes.
              renderInput={({ style, ...props }, index) => (
                <input
                  {...props}
                  id={index === 0 ? "verify-otp" : undefined}
                  className={styles.otpInput}
                />
              )}
            />
          </Field>
        </form>
      </div>
    </div>
  );
};
export default VerifyOtp;
