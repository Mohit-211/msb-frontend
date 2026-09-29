import React, { useState } from "react";
import styles from "./signin.module.scss";
import Link from "next/link";
import { UserLoginAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getClinetProfile } from "@/redux/getClientProfileSlice";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import ImagesCom from "@/Component/images";
import { message } from "antd";

const Signin = () => {
  const router = useRouter();
  const navigate = router.replace;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    setLoading(true);

    UserLoginAPI(email, password)
      .then((res) => {
        setLoading(false);
        if (res.data === 200 || res.data.status === 200) {
          message.success("Congratulations! You have successfully logged in.");
          setTimeout(() => {
            dispatch(getClinetProfile());
            const token = res.data.data.tokens.access.token;
            localStorage.removeItem("UserLoginToken");
            localStorage.setItem("UserLoginToken", token);
            navigate("/story/all");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        setLoading(false);
        message.error(error?.response?.data?.message);
        console.log(error, "error");
      });
  };

  const handleShowPass = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.signinPage}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left Side - Image Gallery */}
          <div className={styles.leftSide}>
            <ImagesCom />
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
                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={keyPressHandler}
                    className={`${styles.input} ${
                      emailError ? styles.inputError : ""
                    }`}
                  />
                  {emailError && (
                    <p className={styles.errorMessage}>{emailError}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={keyPressHandler}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={handleShowPass}
                      className={styles.passwordToggle}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className={styles.forgotPassword}>
                  <button
                    type="button"
                    onClick={() => router.push("/forgotpassword")}
                    className={styles.forgotLink}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading || !email || !password || emailError}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className={styles.spinner} />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Subscribe Link */}
              <div className={styles.subscribeSection}>
                <p className={styles.subscribeText}>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "https://transactions.sendowl.com/products/78271145/4A5919F0/view"
                      )
                    }
                    className={styles.subscribeLink}
                  >
                    Subscribe to create an account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
