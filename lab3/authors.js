//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from "axios";

async function getAuthors() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
  );
  return data; // this will be the array of author objects
}

async function getBooks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
  );
  return data; // this will be the array of author objects
}

const authors = await getAuthors();
const books = await getBooks();

const getAuthorById = async (id) => {
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
  if (typeof searchTerm !== 'string') {
    throw 'searchTerm must be a string';
  }

  searchTerm = searchTerm.trim().toLowerCase();

  if (searchTerm.length === 0) {
    throw 'searchTerm cannot be empty';
  }

  const authorsResult = authors.filter((author) => {
    const fullName = `${author.first_name} ${author.last_name}`;
    const fullNameLower = fullName.toLowerCase();
    return fullNameLower.includes(searchTerm);
  });

  if (authorsResult.length === 0) {
    throw 'No authors found for the provided searchTerm';
  }

  authorsResult.sort((a, b) => a.last_name.localeCompare(b.last_name));

  const result = authorsResult.map((author) => `${author.first_name} ${author.last_name}`);

  return result;
};

const getBookNames = async (firstName, lastName) => {};

const youngestOldest = async () => {};

const sameBirthday = async (month, day) => {};

export {
  getAuthorById,
  searchAuthorByName,
  getBookNames,
  youngestOldest,
  sameBirthday,
};
