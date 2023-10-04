//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import { getAuthors, getBooks } from "./helpers.js";

const authors = await getAuthors();
const books = await getBooks();

const getBookById = async (id) => {
  if (typeof id !== "string" || id.trim() === "") {
    throw "The 'id' parameter is either absent or not a valid string.";
  }

  id = id.trim();

  const boook = books.find((a) => a.id === id);

  if (!boook) {
    throw "Book not found";
  }

  return boook;
};

const getAuthorName = async (bookId) => {};

const sameGenre = async (genre) => {};

const priceRange = async (min, max) => {};

const getAllBooksWithAuthorName = async () => {};

export {
  getBookById,
  getAuthorName,
  sameGenre,
  priceRange,
  getAllBooksWithAuthorName,
};
