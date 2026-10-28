"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequestCodeStep from "./RequestCodeStep";
import ResetPasswordStep from "./ResetPasswordStep";
import { ForgetSendOTPAPI, ForgotPassword } from "@/lib/api";
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

  const handleChangePassword = () => {
    ForgotPassword(
      formData.email,
      parseInt(formData.otp),
      formData.password,
      formData.confirmPassword
    )
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          router.replace("/signin");
        }, 2000);
      })
      .catch((error) => {
        toast.warning(
          error?.response?.data?.message ||
            "Password and Confirm Password must be equal",
        );
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
        const data = error?.response?.data;
        const show = data?.code === 404 ? toast.warning : toast.info;
        show(data?.message || "Couldn't send the code. Try again.");
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
          <Button onClick={handleChangePassword}>Reset Password</Button>
        ) : (
          <Button onClick={handleSendOTP}>Send OTP</Button>
        )}
      </div>
    </div>
  );
}
