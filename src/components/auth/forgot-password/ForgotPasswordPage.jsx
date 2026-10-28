"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequestCodeStep from "./RequestCodeStep";
import ResetPasswordStep from "./ResetPasswordStep";
import { ForgetSendOTPAPI, ForgotPassword, errorMessage } from "@/lib/api";
import { meetsPasswordPolicy } from "@/lib/password";
import styles from "./ForgotPasswordPage.module.scss";
import { Button } from "@/components/ui/button/Button";
import { toast } from "@/components/ui/toast/toast";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Two steps: email a reset code, then set a new password with that code.
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [codeSent, setCodeSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // The API allows 5 wrong guesses per code, so only send a complete code and a valid password.
  const readyToReset =
    formData.otp.length === 6 &&
    meetsPasswordPolicy(formData.password) &&
    formData.password === formData.confirmPassword;

  const handleChangePassword = () => {
    // The code goes as typed: a string keeps leading zeros.
    ForgotPassword(formData.email, formData.otp, formData.password, formData.confirmPassword)
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          router.replace("/signin");
        }, 2000);
      })
      .catch((error) => {
        toast.warning(errorMessage(error, "Couldn’t reset your password. Try again."));
      });
  };

  const handleSendOTP = () => {
    if (formData.email.trim() === '') {
      toast.warning("Email is required to send OTP.");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.warning("Invalid email format. Please enter a valid email address.");
      return;
    }

    ForgetSendOTPAPI(formData.email)
      .then((res) => {
        if (res.status === 200) {
          toast.info("We have sent an OTP to your email.");
        }
        setCodeSent(true);
      })
      .catch((error) => {
        toast.warning(errorMessage(error, "Couldn't send the code. Try again."));
      });
  };

  return (
    <div className={styles.forgotCard}>
      {codeSent ? (
        <ResetPasswordStep formData={formData} setFormData={setFormData} />
      ) : (
        <RequestCodeStep formData={formData} setFormData={setFormData} validateEmail={validateEmail} />
      )}
      <div className={styles.actions}>
        {codeSent ? (
          <Button onClick={handleChangePassword} disabled={!readyToReset}>
            Reset Password
          </Button>
        ) : (
          <Button onClick={handleSendOTP}>Send OTP</Button>
        )}
      </div>
    </div>
  );
}
