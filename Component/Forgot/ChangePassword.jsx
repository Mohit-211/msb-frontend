import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Form } from "react-bootstrap";
import styles from  "./Forgot.module.scss";
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
        <Form>
        
           <Form.Group className={styles.input_field}>
          <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={formData.email}
              disabled
              />
          </Form.Group>
            
          <Form.Group className={styles.input_field}>
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setFormData({ ...formData, otp: e.target.value });  // Update formData with OTP
              }}
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) =>handlePasswordChange(e.target.value)}
              isInvalid={passwordError}
            />
             {passwordError && (
              <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one special character, and one number.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className={styles.input_field}>
          <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleConfirmPassChange}
              isInvalid={passwordMatchError}
            />
             {passwordMatchError && (
              <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                Passwords do not match
              </Form.Control.Feedback>
            )}
          </Form.Group> 
        
        </Form>
      </div>
    </div>
  );
};
export default ChangePassword;
