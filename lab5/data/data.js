/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/

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
  if (!id) {
    throw "Provide id.";
  }

  if (typeof id !== "string" || id.trim() === "") {
    throw "The 'id' parameter is either absent or not a valid string.";
  }

  id = id.trim();

  const author = authors.find((a) => a.id === id);

  if (!author) {
    throw "Author not found!!";
  }

  return author;
};

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
    throw "Book not found!!";
  }

  return boook;
};

export { authors, books, getAuthorById, getBookById };
