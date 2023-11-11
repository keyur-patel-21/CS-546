//import axios, md5
import axios from "axios";
import md5 from 'blueimp-md5'

const publickey = 'de50737045167c3c8b808fdaa8017e7e';
const privatekey = 'c278aaec5844f37c12b2b804072914e0782961af';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;



export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  const { data } = await axios.get(url);
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
};
