"use client";

import clsx from "clsx";
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp";
import { useFieldControl } from "../field/Field";
import styles from "./OtpInput.module.scss";

// One real input drawn as a box per digit, so paste, one-time-code autofill and screen
// readers all treat the code as a single field. The API's reset codes are 6 digits.
export function OtpInput({ length = 6, className, invalid, disabled, ...props }) {
  const { isInvalid, ...fieldProps } = useFieldControl({ invalid, ...props });
  return (
    <OTPInput
      maxLength={length}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      autoComplete="one-time-code"
      disabled={disabled}
      containerClassName={clsx(styles.otpInput, disabled && styles.disabled, className)}
      render={({ slots }) =>
        slots.map((slot, index) => (
          <div key={index} className={clsx(styles.slot, slot.isActive && styles.active, isInvalid && styles.invalid)}>
            {slot.char}
            {slot.hasFakeCaret && <span className={styles.caret} aria-hidden="true" />}
          </div>
        ))
      }
      {...props}
      {...fieldProps}
    />
  );
}
