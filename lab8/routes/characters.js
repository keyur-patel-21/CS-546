//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { Router } from "express";
const router = Router();
import {
  searchCharacterByName,
  searchCharacterById,
} from "../data/characters.js";
import helper from "../helpers.js";

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render("home");
});

router.route("/searchmarvelcharacters").post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try {
    req.params.name = helper.checkString(req.params.name, "name");
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  try {
    const characterList = await searchCharacterByName(req.params.name);
    res.render("characterSearchResults", { characters: characterList });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.route("/marvelcharacter/:id").get(async (req, res) => {
  //code here for GET a single character
  try {
    req.params.id = helper.checkString(req.params.id, "id");
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  try {
    const character = await searchCharacterById(req.params.id);
    res.render("characterById", { character: character });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

//export router
export default router;
