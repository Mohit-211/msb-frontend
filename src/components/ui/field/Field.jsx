"use client";

import { createContext, useContext, useId, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import styles from "./Field.module.scss";

// <Field> labels one control and shows its hint or error. Inputs inside it pick up
// the id, aria-describedby and invalid state from context. For a third-party input,
// pass the same `id` to <Field> and to the input.
const FieldContext = createContext(null);

export function Field({ id, label, hint, error, className, children }) {
  const generatedId = useId();
  const controlId = id || generatedId;
  const message = error || hint;
  const messageId = message ? `${controlId}-message` : undefined;

  return (
    <FieldContext value={{ controlId, messageId, invalid: Boolean(error) }}>
      <div className={clsx(styles.field, className)}>
        {label && (
          <label htmlFor={controlId} className={styles.label}>
            {label}
          </label>
        )}
        {children}
        {message && (
          <p id={messageId} className={error ? styles.error : styles.hint} role={error ? "alert" : undefined}>
            {message}
          </p>
        )}
      </div>
    </FieldContext>
  );
}

export function useFieldControl({ id, invalid, "aria-describedby": describedBy }) {
  const field = useContext(FieldContext);
  const isInvalid = invalid ?? field?.invalid ?? false;
  return {
    id: id ?? field?.controlId,
    "aria-describedby": describedBy ?? field?.messageId,
    "aria-invalid": isInvalid || undefined,
    isInvalid,
  };
}

export function Input({ className, invalid, ...props }) {
  const { isInvalid, ...fieldProps } = useFieldControl({ invalid, ...props });
  return (
    <input
      className={clsx(styles.input, isInvalid && styles.invalid, className)}
      {...props}
      {...fieldProps}
    />
  );
}

export function Textarea({ className, invalid, ...props }) {
  const { isInvalid, ...fieldProps } = useFieldControl({ invalid, ...props });
  return (
    <textarea
      className={clsx(styles.input, styles.textarea, isInvalid && styles.invalid, className)}
      {...props}
      {...fieldProps}
    />
  );
}

export function PasswordInput({ className, ...props }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.passwordWrapper}>
      <Input
        type={visible ? "text" : "password"}
        className={clsx(styles.passwordInput, className)}
        {...props}
      />
      <button
        type="button"
        className={styles.passwordToggle}
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
      >
        {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
      </button>
    </div>
  );
}
