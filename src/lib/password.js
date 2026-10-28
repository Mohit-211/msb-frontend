// The API's password policy (msb-backend src/utils/validatePassword.js), checked here first so
// the form can say what's wrong before sending.
export const PASSWORD_RULE = "Use at least 8 characters, including 2 digits, with no spaces.";

export function meetsPasswordPolicy(password) {
  return (
    password.length >= 8 &&
    password.length <= 100 &&
    (password.match(/\d/g) ?? []).length >= 2 &&
    !/\s/.test(password) &&
    !["Passw0rd", "Password123"].includes(password)
  );
}
