import { ISignupState } from "../data/interface";

export const validateEmail = (email: string) => {
  // eslint-disable-next-line
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};

export const validatePassword: (x: string) => [boolean, string] = (
  password: string
) => {
  const n = password.length;

  if (n < 8) return [false, "Password is too short."];

  let upperCase = 0,
    lowerCase = 0,
    digit = 0,
    special = 0;

  for (const ch of password) {
    if (ch >= "a" && ch <= "z") lowerCase++;

    if (ch >= "A" && ch <= "Z") upperCase++;

    if (ch >= "0" && ch <= "9") digit++;

    if (ch === " ") return [false, "Password cannot contain empty spaces!"];

    special++;
  }

  switch (0) {
    case upperCase:
      return [false, "Password must contain at least one uppercase alphabet."];
    case lowerCase:
      return [false, "Password must contain at least one lowercase alphabet."];
    case digit:
      return [false, "Password must contain at least one digit."];
    case special:
      return [false, "Password must contain at least one special character."];
  }

  return [true, ""];
};

const validateName = (name: string) => {
  for (const ch of name) {
    if (!(ch >= "a" && ch <= "z") && !(ch >= "A" && ch <= "Z")) return false;
  }

  return true;
};

// function that returns a tuple of [boolean,message]
export const validateForm: (x: ISignupState) => [boolean, string] = (
  info: ISignupState
) => {
  const { email, password, first_name, last_name } = info;

  let msg: string;

  if (!validateEmail(email)) return [false, "Invalid email!"];

  if (!validatePassword(password)[0]) {
    msg = validatePassword(password)[1];

    return [false, msg];
  }

  if (!validateName(first_name)) return [false, "Invalid first name."];

  if (!validateName(last_name)) return [false, "Invalid last name."];

  return [true, ""];
};
