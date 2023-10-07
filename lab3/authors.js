//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import { getAuthors, getBooks } from "./helpers.js";

const authors = await getAuthors();
const books = await getBooks();

const getAuthorById = async (id) => {
  if (!id) {
    throw "Provide id.";
  }

  if (typeof id !== "string" || id.trim() === "") {
    throw "The 'id' parameter is either absent or not a valid string.";
  }

  id = id.trim();

  const author = authors.find((a) => a.id === id);

  if (!author) {
    throw "Author not found";
  }

  return author;
};

const searchAuthorByName = async (searchTerm) => {
  if (!searchTerm) {
    throw "Provide searchTerm.";
  }

  if (typeof searchTerm !== "string") {
    throw "searchTerm must be a string";
  }

  searchTerm = searchTerm.trim().toLowerCase();

  if (searchTerm.length === 0) {
    throw "searchTerm cannot be empty";
  }

  const authorsResult = authors.filter((author) => {
    const fullName = `${author.first_name} ${author.last_name}`;
    const fullNameLower = fullName.toLowerCase();
    return fullNameLower.includes(searchTerm);
  });

  if (authorsResult.length === 0) {
    throw "No authors found for the provided searchTerm";
  }

  authorsResult.sort((a, b) => a.last_name.localeCompare(b.last_name));

  const result = authorsResult.map(
    (author) => `${author.first_name} ${author.last_name}`
  );

  return result;
};

const getBookNames = async (firstName, lastName) => {
  if (!firstName || !lastName) {
    throw "Provide First and Last Name.";
  }

  if (typeof firstName !== "string" || typeof lastName !== "string") {
    throw "firstName and lastName must be strings";
  }

  firstName = firstName.trim().toLowerCase();
  lastName = lastName.trim().toLowerCase();

  if (firstName.length === 0 || lastName.length === 0) {
    throw "firstName and lastName cannot be empty";
  }

  const author = authors.find(
    (author) =>
      author.first_name.toLowerCase() === firstName &&
      author.last_name.toLowerCase() === lastName
  );

  if (!author) {
    throw `No author found with the name ${firstName} ${lastName}`;
  }

  if (!author.books || author.books.length === 0) {
    throw `Author ${firstName} ${lastName} has not written any books`;
  }

  const bookTitles = author.books
    .map((bookId) => books.find((book) => book.id === bookId)?.title)
    .filter((title) => title !== undefined)
    .sort();

  return bookTitles;
};

const youngestOldest = async () => {
  const authors = await getAuthors();

  if (authors.length === 0) {
    // Handle the case when there are no authors in the data.
    return { youngest: null, oldest: null };
  }

  // Sort authors by date_of_birth in ascending order.
  authors.sort((a, b) => {
    const dateA = new Date(a.date_of_birth);
    const dateB = new Date(b.date_of_birth);
    return dateA - dateB;
  });

  const youngestAuthor = authors[0];
  const oldestAuthor = authors[authors.length - 1];

  // Check for ties in the youngest and oldest authors.
  const youngestAuthors = [youngestAuthor];
  const oldestAuthors = [oldestAuthor];

  for (let i = 1; i < authors.length; i++) {
    const author = authors[i];
    const youngestDiff =
      new Date(author.date_of_birth) - new Date(youngestAuthor.date_of_birth);
    const oldestDiff =
      new Date(author.date_of_birth) - new Date(oldestAuthor.date_of_birth);

    if (youngestDiff === 0) {
      youngestAuthors.push(author);
    }

    if (oldestDiff === 0) {
      oldestAuthors.push(author);
    }
  }

  // Sort tied authors by last name.
  youngestAuthors.sort((a, b) => a.last_name.localeCompare(b.last_name));
  oldestAuthors.sort((a, b) => a.last_name.localeCompare(b.last_name));

  const youngestAuthorNames = youngestAuthors.map(
    (author) => `${author.first_name} ${author.last_name}`
  );
  const oldestAuthorNames = oldestAuthors.map(
    (author) => `${author.first_name} ${author.last_name}`
  );

  const result = {
    youngest:
      youngestAuthorNames.length === 1
        ? youngestAuthorNames[0]
        : youngestAuthorNames,
    oldest:
      oldestAuthorNames.length === 1 ? oldestAuthorNames[0] : oldestAuthorNames,
  };

  return result;
};

const sameBirthday = async (month, day) => {
  if (!month || !month) {
    throw "Provide month and day.";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (typeof month !== "number" || typeof day !== "number") {
    throw "Month and day must be numbers";
  }

  if (month < 1 || month > 12) {
    throw "Month must be between 1 and 12";
  }

  const daysInMonth = new Date(2023, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    throw `There are not ${day} days in ${monthNames[month - 1]}`;
  }

  const matchingAuthors = authors
    .filter((author) => {
      const [authorMonth, authorDay] = author.date_of_birth
        .split("/")
        .map(Number);
      return authorMonth === month && authorDay === day;
    })
    .map((author) => `${author.first_name} ${author.last_name}`);

  if (matchingAuthors.length < 2) {
    throw "There are no two authors with the same birthday";
  }

  matchingAuthors.sort((a, b) => {
    const lastNameA = a.split(" ")[1];
    const lastNameB = b.split(" ")[1];
    return lastNameA.localeCompare(lastNameB);
  });

  return matchingAuthors;
};

export {
  getAuthorById,
  searchAuthorByName,
  getBookNames,
  youngestOldest,
  sameBirthday,
};
