import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.scss";
const CustomModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    props.createSubscription(name, email, props?.price?.id);
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <section className={styles.main}>
          <div className={styles.mainCard}>
            <div className={styles.cardTop}>
              <h3>Total Amount:<span className={styles.amount}>
                {props?.price?.unit_amount / 100}
              </span>
              </h3>

            </div>
            <div className={styles.cardBottom}>

              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter Your Name"
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  placeholder="Enter Your Email"
                  type="text"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <div className="form-group mb-3">
                <label className="mb-3">Enter Your Card Details:</label>
                <CardElement className={styles.cardField} />
              </div>
              <div className={styles.btnGroup}>
                <button onClick={handleSubmit} disabled={!props.stripe}>{props.loading ? "Loading" : "Subscribe"}</button>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>

    </Modal>

  );
};
export default CustomModal;
