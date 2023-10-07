//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import { getAuthors, getBooks } from "./helpers.js";

const authors = await getAuthors();
const books = await getBooks();

const getBookById = async (id) => {
  if (!id) {
    throw "please provide id";
  }

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
  if (!genre || typeof genre !== "string" || genre.trim() === "") {
    throw "Invalid genre parameter";
  }

  const normalizedGenre = genre.toLowerCase();

  const result = books.filter((book) =>
    book.genres.map((genre) => genre.toLowerCase()).includes(normalizedGenre)
  );

  if (result.length === 0) {
    throw "No books found for the provided genre";
  }

  return result;
};

const priceRange = async (min, max) => {
  if (!min || !max) {
    throw "input Valid Price Range";
  }

  if (typeof min !== "number" || typeof max !== "number") {
    throw "Both min and max must be numbers.";
  }

  if (min < 0 || max < 0) {
    throw "price can not be less than 0";
  }

  if (min > max) {
    throw "min must be less than or equal to max.";
  }

  const booksInPriceRange = books.filter((book) => {
    return book.price >= min && book.price <= max;
  });

  if (booksInPriceRange.length === 0) {
    throw "No books found within the specified price range.";
  }

  return booksInPriceRange.length;
};

const getAllBooksWithAuthorName = async () => {
  const booksWithAuthorName = [];

  for (const book of books) {
    const author = authors.find((author) => author.id === book.authorId);
    if (author) {
      const bookWithAuthorName = {
        id: book.id,
        title: book.title,
        genres: book.genres,
        publicationDate: book.publicationDate,
        publisher: book.publisher,
        summary: book.summary,
        isbn: book.isbn,
        language: book.language,
        pageCount: book.pageCount,
        price: book.price,
        format: book.format,
        author: `${author.first_name} ${author.last_name}`,
      };

      booksWithAuthorName.push(bookWithAuthorName);
    }
  }

  return booksWithAuthorName;
};

export {
  getBookById,
  getAuthorName,
  sameGenre,
  priceRange,
  getAllBooksWithAuthorName,
};
