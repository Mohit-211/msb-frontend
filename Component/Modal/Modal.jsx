import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import styles from "./Modal.module.scss";
import { Button } from "@/Component/ui/button/Button";
import { Dialog, DialogContent } from "@/Component/ui/dialog/Dialog";
import { Field, Input } from "@/Component/ui/field/Field";
const CustomModal = ({ show, onHide, price, loading, stripe, createSubscription }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    createSubscription(name, email, price?.id);
  }
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) onHide();
      }}
    >
      <DialogContent title="Subscribe">
        <p className={styles.amount}>
          Total amount: <strong>{price?.unit_amount / 100}</strong>
        </p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Field label="Name">
            <Input
              placeholder="Enter Your Name"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Email address">
            <Input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field id="card-details" label="Card details">
            <CardElement id="card-details" className={styles.cardField} />
          </Field>
          <Button type="submit" variant="secondary" size="lg" block loading={loading} disabled={!stripe}>
            Subscribe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CustomModal;
