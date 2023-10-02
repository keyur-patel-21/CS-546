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

const authors = await getAuthors();

const getAuthorById = async (id) => {
  if (typeof id !== "string" || id.trim() === "") {
    throw "The 'id' parameter is either absent or not a valid string."
  }

  id = id.trim();

  const author = authors.find((a) => a.id === id);

  if (!author) {
    throw "Author not found";
  }

  return author;
};

const searchAuthorByName = async (searchTerm) => {};

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
