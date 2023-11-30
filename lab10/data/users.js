// import mongo collections, bcrypt, and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from 'bcrypt';

const validateEmail = (email) => {
  // Regular expression for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Placeholder for MongoDB function to check duplicate email
const checkDuplicateEmail = async (email) => {
  const existingUser = await users.findOne({ email });
  return !!existingUser;
};

// Placeholder for MongoDB function to insert user
const insertUser = async (firstName, lastName, email, hashedPassword, role) => {
  try {
    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    return result.insertedId ? true : false;
  } catch (error) {
    console.error('Error inserting user:', error);
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
  if (
    !firstName ||
    !lastName ||
    !emailAddress ||
    !password ||
    !role ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof emailAddress !== 'string' ||
    typeof password !== 'string' ||
    typeof role !== 'string'
  ) {
    throw 'All fields must be supplied.';
  }

  if (!/^[a-zA-Z]{2,25}$/.test(firstName)) {
    throw 'Invalid first name.';
  }

  if (!/^[a-zA-Z]{2,25}$/.test(lastName)) {
    throw 'Invalid last name.';
  }

  if (!validateEmail(emailAddress)) {
    throw 'Invalid email address format.';
  }

  const lowerCaseEmail = emailAddress.toLowerCase();

  // Check for duplicate email address in the database
  const isDuplicateEmail = await checkDuplicateEmail(lowerCaseEmail);
  if (isDuplicateEmail) {
    throw 'Email address already exists.';
  }

  // Validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw 'Invalid password.';
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Validate role
  const lowerCaseRole = role.toLowerCase();
  if (lowerCaseRole !== 'admin' && lowerCaseRole !== 'user') {
    throw 'Invalid role.';
  }

  // Insert user into the database
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
    throw 'Error inserting user into the database.';
  }
};

export const loginUser = async (emailAddress, password) => {
  if (!emailAddress || !password || typeof emailAddress !== 'string' || typeof password !== 'string') {
    throw 'Both emailAddress and password must be supplied.';
  }

  if (!validateEmail(emailAddress)) {
    throw 'Invalid email address format.';
  }

  const lowerCaseEmail = emailAddress.toLowerCase();

  // Query the database for the user with the given email address
  const user = await users.findOne({ email: lowerCaseEmail });

  if (!user) {
    throw 'Either the email address or password is invalid.';
  }

  // Compare the hashed password in the database with the input password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Return user information without the password
    const { firstName, lastName, email, role } = user;
    return { firstName, lastName, email, role };
  } else {
    throw 'Either the email address or password is invalid.';
  }
};
