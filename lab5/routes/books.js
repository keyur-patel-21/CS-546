//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file that you used for lab 3 to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.

import express from "express";  
const router = express.Router();
import { books, getBookById } from "../data/data.js";

// Implement GET Request Method and send a JSON response  See lecture code!
router.route("/").get(async (req, res) => {
  try {
    const bookList = await books;
    return res.json(bookList);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// Implement GET Request Method and send a JSON response See lecture code!
router.route("/:id").get(async (req, res) => {
  try {
    const post = await getBookById(req.params.id);
    return res.json(post);
  } catch (e) {
    return res.status(404).json(e);
  }
});

export default router;
