"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SignInPage.module.scss";
import { UserLoginAPI } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchProfile } from "@/store/slices/profileSlice";
import BrandCollage from "./BrandCollage";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@/components/ui/button/Button";
import { Field, Input, PasswordInput } from "@/components/ui/field/Field";

// Accounts are created by an admin once someone has paid here, off the platform.
const SUBSCRIBE_URL = "https://transactions.sendowl.com/products/78271145/4A5919F0/view";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    UserLoginAPI(email, password)
      .then((res) => {
        setLoading(false);
        if (res.data === 200 || res.data.status === 200) {
          toast.success("Congratulations! You have successfully logged in.");
          setTimeout(() => {
            const token = res.data.data.tokens.access.token;
            localStorage.removeItem("UserLoginToken");
            localStorage.setItem("UserLoginToken", token);
            dispatch(fetchProfile(token));
            router.replace("/story/all");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
        toast.error(
          error?.response?.data?.message ||
            "Couldn't sign in. Check your connection and try again.",
        );
      });
  };

  return (
    <div className={styles.signinPage}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Side - Image Gallery */}
          <div className={styles.leftSide}>
            <BrandCollage />
          </div>

          {/* Right Side - Sign In Form */}
          <div className={styles.rightSide}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h1 className={styles.title}>Sign In</h1>
                <p className={styles.subtitle}>
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <Field id="email" label="Email" error={emailError || undefined}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Field>

                <Field id="password" label="Password">
                  <PasswordInput
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                <div className={styles.forgotPassword}>
                  <Link href="/forgotpassword" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  block
                  loading={loading}
                  disabled={!email || !password || Boolean(emailError)}
                  className={styles.submitButton}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className={styles.subscribeSection}>
                <p className={styles.subscribeText}>
                  Don’t have an account?{" "}
                  <a href={SUBSCRIBE_URL} className={styles.subscribeLink}>
                    Subscribe to create an account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
