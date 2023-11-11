//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
});

//export router
