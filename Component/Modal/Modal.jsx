import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const CustomModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    props.createSubscription(name, email, props?.price?.id);
    // props.onHide()
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {/* <>
          <h3>Total Amount:<span style={{fontWeight:"700"}}>
            {props?.price?.unit_amount / 100}
          </span>
          </h3>
          <Form>
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
          </Form>
          <div className="form-group mb-3">
            <label className="mb-3">Enter Your Card Details:</label>
            <CardElement className="cardelement" />
          </div>
        </> */}
        <section class="main">
          <div class="main-card">
            <div class="card-top">
              <h3>Total Amount:<span style={{ fontWeight: "700" }}>
                {props?.price?.unit_amount / 100}
              </span>
              </h3>

            </div>
            <div class="card-bottom">

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
                <CardElement className="cardelement" />
              </div>
              <div class="btn-grp">
                {/* <button>Cancel</button> */}
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
