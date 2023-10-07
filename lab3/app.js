/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.


try{
    const authorData = await authors.getAuthors();
    console.log (authorData);
}catch(e){
    console.log (e);
}
*/
// import * as authors from "./authors.js";
import {
  getAuthorById,
  searchAuthorByName,
  getBookNames,
  youngestOldest,
  sameBirthday,
} from "./authors.js";
import {
  getBookById,
  getAuthorName,
  sameGenre,
  priceRange,
  getAllBooksWithAuthorName,
} from "./books.js";

// For Q1
try {
  const authorData = await getAuthorById(
    "1871e6d7-551f-41cb-9a07-08240b86c95c"
  );
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await getAuthorById(-1); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await getAuthorById(1001); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await getAuthorById(); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Author not found Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}



// // For Q2

try {
  const authorData = await searchAuthorByName("Tom"); 
  // Returns:
  ["Tommi Banasevich","Tommy Klemenz", "Loree Tomasutti", "Rianon Tomkins"]
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await searchAuthorByName("foobar"); // Throws Error since there are no results
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await searchAuthorByName(" "); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await searchAuthorByName(123); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await searchAuthorByName(); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}

try {
  const authorData = await searchAuthorByName(null); // Throws Error
  console.log(authorData);
} catch (e) {
  console.log(e);
}



// // For Q3

try {
  const booksData = await getBookNames("Prisca", "Vakhonin");
  // Returns ["Good Thief, The", "Point, The"]
  console.log(booksData);
} catch (e) {
  console.log(e);
}
try {
  const booksData = await getBookNames(123,123); // Throws Error 
  console.log(booksData);
} catch (e) {
  console.log(e);
}
try {
  const booksData = await getBookNames(" ", " "); // Throws Error
  console.log(booksData);
} catch (e) {
  console.log(e);
}
try {
  const booksData = await getBookNames("Patrick", "Hill"); // Throws Error because there is no author Patrick Hill in authors.json
  console.log(booksData);
} catch (e) {
  console.log(e);
}
try {
  const booksData = await getBookNames("Perrine", "Greenough"); // Throws Error because while the author can be found, they have written no books
  console.log(booksData);
} catch (e) {
  console.log(e);
}
try {
  const booksData = await getBookNames(); // Throws Error
  console.log(booksData);
} catch (e) {
  console.log(e);
}



// For Q4

try {
  const youngOldAuthors = await youngestOldest(); // Throws Error
  console.log(youngOldAuthors);
} catch (e) {
  console.log(e);
}


// For Q5

try {
  const sameDobAuthors = await sameBirthday(10, 12); // Returns: ["Pancho Barradell", "Lauree Henriquet"]
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}

try {
  const sameDobAuthors = await sameBirthday(9, 31); // Throws Error: There are not 31 days in Sept
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}

try {
  const sameDobAuthors = await sameBirthday(13, 25); // Throws Error: Month > 12
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}

try {
  const sameDobAuthors = await sameBirthday(2, 30); // Throws Error: There are not 30 days in Feb
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}

try {
  const sameDobAuthors = await sameBirthday("09", "31"); // Throws Error: There are not 31 days in Sept and the inputs are strings, not numbers
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}

try {
  const sameDobAuthors = await sameBirthday(); // Throws Error:
  console.log(sameDobAuthors);
} catch (e) {
  console.log(e);
}



// For Q6

try {
  const book = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
  console.log(book);
} catch (e) {
  console.log(e);
}

try {
  const book = await getBookById(-1); // Throws Error 
  console.log(book);
} catch (e) {
  console.log(e);
}

try {
  const book = await getBookById(1001); // Throws Error
  console.log(book);
} catch (e) {
  console.log(e);
}

try {
  const book = await getBookById();// Throws Error
  console.log(book);
} catch (e) {
  console.log(e);
}

try {
  const book = await getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws book not found Error
  console.log(book);
} catch (e) {
  console.log(e);
}


// For Q7


try {
  const books_author = await getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
  // Returns: "Brooke Adcock"
  console.log(books_author);
} catch (e) {
  console.log(e);
}

try {
  const books_author = await getAuthorName(-1); // Throws Error
  console.log(books_author);
} catch (e) {
  console.log(e);
}

try {
  const books_author = await getAuthorName(1001); // Throws Error 
  console.log(books_author);
} catch (e) {
  console.log(e);
}

try {
  const books_author = await getAuthorName(); // Throws Error
  console.log(books_author);
} catch (e) {
  console.log(e);
}

try {
  const books_author = await getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Book not found Error
  console.log(books_author);
} catch (e) {
  console.log(e);
}


// For Q8

try {
  const books = await sameGenre("Memoir");
  // Returns Note the first 5 results are shown below and is not the complete results. you MUST return ALL books with a genre that matches the supplied genre.
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await sameGenre(-1); // Throws Error
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await sameGenre(1001); // Throws Error
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await sameGenre();// Throws Error
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await sameGenre(false)// throws error
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await sameGenre('foo bar');// Throws Error
  console.log(books);
} catch (e) {
  console.log(e);
}


// For Q9


try {
  const books = await priceRange(5.99, 30);
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await priceRange("foo", 12); // Throws Error
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await priceRange(5, 3); // Throws Error:
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await priceRange(-5, 3); // Throws Error:
  console.log(books);
} catch (e) {
  console.log(e);
}

try {
  const books = await priceRange(); // Throws Error:
  console.log(books);
} catch (e) {
  console.log(e);
}



// For Q10


try {
  const books = await getAllBooksWithAuthorName();
  console.log(books);
} catch (e) {
  console.log(e);
}


