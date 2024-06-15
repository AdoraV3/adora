export const REQUIRED_EMAIL = "Email is required";
export const REQUIRED_FIELD = "This field is required";
export const REQUIRED_NUMBER = "Please input a number";
export const INVALID_EMAIL = "Please enter a valid email";
export const INVALID_PHONE = "Please enter your phone number";
export const INVALID_FULL_NAME = "Please enter your name";
export const INVALID_FIRST_NAME = "Please enter your first name";
export const INVALID_LAST_NAME = "Please enter your last name";
export const MAXIMUM_ALLOWED_FILE_UPLOAD = 1;

export const REQUIRED_MIN_CHARACTER = "Number must be greater than or equal to";

export const MIN_PHONE_NUMBER_LENGTH =
  "Your phone number should be at least 9 digits";
export const MAX_PHONE_NUMBER_LENGTH =
  "Your phone number should be at most 9 digits";

export const phoneRegExp =
  // eslint-disable-next-line security/detect-unsafe-regex
  /^(?:\+?\d{1,3}(?:(?:\d{3})+)?(?:[-\s]\d+)?|\(\d+\)(?:[-\s]\d+)?)$/;

export const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
