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

const getAuthorName = async (bookId) => {
  if (typeof bookId !== "string" || bookId.trim() === "") {
    throw "The 'id' parameter is either absent or not a valid string.";
  }

  bookId = bookId.trim();

  const book = books.find((a) => a.id === bookId);

  if (!book) {
    throw "Book not found";
  }
  const author = authors.find((a) => a.id === book.authorId);

  if (!author) {
    throw "author not found";
  }

  const result = `${author.first_name} ${author.last_name}`;

  return result;
};

const sameGenre = async (genre) => {
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    throw 'Invalid genre parameter';
  }

  const normalizedGenre = genre.toLowerCase();

  const result = books.filter(book =>
    book.genres.map(genre => genre.toLowerCase()).includes(normalizedGenre)
  );
  

  if (result.length === 0) {
    throw 'No books found for the provided genre';
  }

  return result;
};

const priceRange = async (min, max) => {};

const getAllBooksWithAuthorName = async () => {};

export {
  getBookById,
  getAuthorName,
  sameGenre,
  priceRange,
  getAllBooksWithAuthorName,
};
