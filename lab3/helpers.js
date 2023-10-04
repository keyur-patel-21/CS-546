//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
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

export { getAuthors, getBooks };