import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./OtpStep.module.scss";

const SendOtp = ({ formData, setFormData, emailError,validateEmail }) => {

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setFormData({ ...formData, email: inputEmail });
    validateEmail(inputEmail);
  };

  return (
    <>
      <div className={styles.forgot_form}>
        <div className={styles.forgot_form_container}>
          <Form style={{ textAlign: "left" }}>
            <Form.Group className={styles.input_field}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  handleEmailChange(e);
                }}
              />
              {emailError && (
                <p className={styles.error_message}>{emailError}</p>
              )}
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
export default SendOtp;
