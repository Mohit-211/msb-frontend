"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SignInPage.module.scss";
import { UserLoginAPI, errorMessage } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import { setToken } from "@/lib/session";
import BrandCollage from "./BrandCollage";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@/components/ui/button/Button";
import { Field, Input, PasswordInput } from "@/components/ui/field/Field";
import { SUBSCRIBE_URL } from "@/lib/config";


const SignInPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        if (res.data.status === 200) {
          toast.success("Congratulations! You have successfully logged in.");
          setToken(res.data.data.tokens.access.token);
          // On /signin, go to the stories. Anywhere else this form stood in for a page that
          // needs a signed-in reader, and that page now shows in its place.
          if (pathname === "/signin") router.replace("/story/all");
        }
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
        toast.error(errorMessage(error, "Couldn't sign in. Check your connection and try again."));
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
