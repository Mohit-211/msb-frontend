import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from  "./Forgot.module.scss";
const SendOtp = ({ formData, setFormData,validateEmail }) => {
  const [otp,setOtp] = useState("")
  const [emailValid, setEmailValid] = useState(true);
 
  return (<>
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <Form>
           <Form.Group className={styles.input_field}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                const newEmail = e.target.value;
                setFormData({ ...formData, email: newEmail });
                setEmailValid(validateEmail(newEmail));
              }}
              isInvalid={!emailValid}
              />
            <Form.Control.Feedback type="invalid">
              Invalid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="OTP"
              onChange={(e) => setOtp(e.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              disabled
            />
          </Form.Group>
          <Form.Group className={styles.input_field}>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"
              disabled
            />
          </Form.Group> 
        </Form>
      </div>
    </div>
    </>
  );
};
export default SendOtp;

