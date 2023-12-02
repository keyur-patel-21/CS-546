import { users } from "../config/mongoCollections.js";
import bcrypt from "bcryptjs";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return emailRegex.test(email);
};

const checkDuplicateEmail = async (email) => {
  const userCollection = await users();
  const existingUser = await userCollection.findOne({ email });
  return !!existingUser;
};

const insertUser = async (firstName, lastName, email, hashedPassword, role) => {
  const userCollection = await users();
  try {
    const result = await userCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    return result.insertedId ? true : false;
  } catch (error) {
    console.error("Error inserting user:", error);
    return false;
  }
};

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim();
  password = password.trim();
  role = role.trim();

  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw "All fields must be supplied.";
  }

  if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
    throw "Invalid first name.";
  }

  if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
    throw "Invalid last name.";
  }

  if (!validateEmail(emailAddress)) {
    throw "Invalid email address format.";
  }

  const lowerCaseEmail = emailAddress.toLowerCase();

  const isDuplicateEmail = await checkDuplicateEmail(lowerCaseEmail);
  if (isDuplicateEmail) {
    throw "Email address already exists.";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw "Invalid password.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const lowerCaseRole = role.toLowerCase();
  if (lowerCaseRole !== "admin" && lowerCaseRole !== "user") {
    throw "Invalid role.";
  }

  const insertSuccess = await insertUser(
    firstName,
    lastName,
    lowerCaseEmail,
    hashedPassword,
    lowerCaseRole
  );

  if (insertSuccess) {
    return { insertedUser: true };
  } else {
    throw "Error inserting user into the database.";
  }
};

export const loginUser = async (emailAddress, password) => {
  emailAddress = emailAddress.trim();
  password = password.trim();

  if (
    !emailAddress ||
    !password ||
    typeof emailAddress !== "string" ||
    typeof password !== "string"
  ) {
    throw "Both emailAddress and password must be supplied.";
  }

  const lowerCaseEmail = emailAddress.toLowerCase();

  if (!validateEmail(lowerCaseEmail)) {
    throw "Invalid email address format.";
  }

  const userCollection = await users();
  const user = await userCollection.findOne({ email: lowerCaseEmail });

  if (!user) {
    throw "Either the email address or password is invalid.";
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const { firstName, lastName, email, role } = user;
    return { firstName, lastName, email, role };
  } else {
    throw "Either the email address or password is invalid.";
  }
};
