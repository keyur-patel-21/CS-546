/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let emojiCounter = (message) => {
  // Check if message exists and is a string
  if (!message || typeof message !== 'string') {
    throw 'Invalid input: Please provide a non-empty string as the message.';
  }

  // Check if the message is not just an empty string with spaces
  if (message.trim() === '') {
    throw 'Invalid input: Message should not be an empty string with only spaces.';
  }

  // Regular expression to match valid emojis
  const emojiRegex = /:[^:\s]+:/g;

  // Extract emojis from the message
  const emojis = message.match(emojiRegex);

  // Return the count of valid emojis
  return emojis ? emojis.length : 0;
};

let sortStockPrices = (lastStocks, currStocks) => {};

let mashUp = (string1, string2) => {};

export { emojiCounter, sortStockPrices, mashUp };
