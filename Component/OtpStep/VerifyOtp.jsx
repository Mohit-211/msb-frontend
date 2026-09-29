import React, { useState } from "react";
import { useEffect } from "react";
// import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./OtpStep.module.scss";
import OTPInput from "react-otp-input";
const VerifyOtp = ({ formData, setFormData }) => {

  return (
    <div className="forgot_form">
      <div className="forgot_form_container">
        <Form style={{textAlign:"left"}}>
          <Form.Group className="input_field">
            <Form.Label >Email</Form.Label>
            <Form.Control
              type="text"
              placeholder={formData.email}
              disabled
            />
          </Form.Group>
          <Form.Group className="input_field">
            <Form.Label className="mt-3">OTP</Form.Label>
            {/* <Form.Control
              type="number"
              placeholder="OTP"
              value={formData.otp}
              onChange={(e) => {
                setFormData({ ...formData, otp: e.target.value });
              }}
            /> */}
          </Form.Group>
          <OTPInput 
          
            // value={otp}
            value={formData.otp}
            // onChange={setOtp}
            //  onChange={() => {
            //     setFormData({ ...formData, otp});
            //   }}
            onChange={(otpValue) => {
              setFormData({ ...formData, otp: otpValue });
            }}
            numInputs={4}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => (
              <input
                {...props}
                className={styles.otpInput}
                style={{
                  width: "90px", // Adjust the width according to your preference
                  height: "40px", // Adjust the height according to your preference
                  fontSize: "18px",
                  margin:"auto",
                  textAlign: "center",
                  color: "#FFDE05",
                  background: "#10313B",
                  border: "2px solid #FFDE05",
                }}
              />
            )}
          />
        </Form>
      </div>
    </div>
  );
};
export default VerifyOtp;
