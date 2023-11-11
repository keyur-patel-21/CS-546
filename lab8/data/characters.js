//import axios, md5
import axios from "axios";
import md5 from "blueimp-md5";

const publickey = "de50737045167c3c8b808fdaa8017e7e";
const privatekey = "c278aaec5844f37c12b2b804072914e0782961af";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param

  if (!name) throw "You must provide a name to search";
  if (typeof name !== "string" || name.trim().length === 0)
    throw "Please provide a valid name to search";

  const baseUrl = "https://gateway.marvel.com:443/v1/public/characters?";
  const url =
    baseUrl +
    "nameStartsWith=" +
    name +
    "&ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash;
  const { data } = await axios.get(url);
  let characterData = data;
  return characterData;
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  if (!id) throw "You must provide id to search";
  if (typeof id !== "string" || id.trim().length === 0)
    throw "Please provide a valid id to search";

  const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
  const url =
    baseUrl +
    id +
    "?ts=" +
    ts +
    "&apikey=" +
    publickey +
    "&hash=" +
    hash;

  const { data } = await axios.get(url);
  let characterData = data;
  return characterData;
};
