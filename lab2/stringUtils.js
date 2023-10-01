/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let emojiCounter = (message) => {
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw 'Please provide a non-empty string as the message.';
  }

  let trimmedMessage = message.trim();

  const emojiRegex = /:[^:\s]+:/g;
  const emojis = trimmedMessage.match(emojiRegex);

  return emojis ? emojis.length : 0;
};

let sortStockPrices = (lastStocks, currStocks) => {
  // Check if both arguments exist and are strings
  if (!lastStocks || !currStocks || typeof lastStocks !== 'string' || typeof currStocks !== 'string') {
    throw new Error('Invalid input: Please provide valid strings for lastStocks and currStocks.');
  }

  // Trim input strings
  lastStocks = lastStocks.trim();
  currStocks = currStocks.trim();

  // Convert strings to arrays of stock objects
  const lastStocksArray = lastStocks.split('|').map(stock => {
    const [symbol, price] = stock.split(',');
    const trimmedSymbol = symbol.trim();
    const trimmedPrice = parseFloat(price.trim());
    
    // Validate the format of stock ticker and price
    if (!/^[a-zA-Z]{1,5}$/.test(trimmedSymbol) || isNaN(trimmedPrice)) {
      throw new Error('Invalid input: Invalid format for stock ticker or price.');
    }

    return { symbol: trimmedSymbol, price: trimmedPrice };
  });

  const currStocksArray = currStocks.split('|').map(stock => {
    const [symbol, price] = stock.split(',');
    const trimmedSymbol = symbol.trim();
    const trimmedPrice = parseFloat(price.trim());
    
    // Validate the format of stock ticker and price
    if (!/^[a-zA-Z]{1,5}$/.test(trimmedSymbol) || isNaN(trimmedPrice)) {
      throw new Error('Invalid input: Invalid format for stock ticker or price.');
    }

    return { symbol: trimmedSymbol, price: trimmedPrice };
  });

  // Check if both arrays contain the same stocks
  const lastStockSymbols = lastStocksArray.map(stock => stock.symbol.toLowerCase());
  const currStockSymbols = currStocksArray.map(stock => stock.symbol.toLowerCase());

  if (!lastStockSymbols.every(symbol => currStockSymbols.includes(symbol))) {
    throw 'Invalid input: Both strings must contain the same stocks (case-insensitive).';
  }

  // Merge the arrays and calculate the percentage change
  const mergedStocks = lastStocksArray.map(lastStock => {
    const currStock = currStocksArray.find(curr => curr.symbol.toLowerCase() === lastStock.symbol.toLowerCase());

    if (!currStock) {
      throw 'Invalid input: Stock symbol not found in current stocks.';
    }

    const change = ((currStock.price - lastStock.price) / lastStock.price) * 100;
    return { symbol: lastStock.symbol, price: currStock.price, change: parseFloat(change.toFixed(1)) };
  });

  // Sort the array by percentage change
  const sortedStocks = mergedStocks.sort((a, b) => b.change - a.change);

  return sortedStocks;
};

let mashUp = (string1, string2) => {
  // Check if both arguments exist and are strings
  if (!string1 || !string2 || typeof string1 !== 'string' || typeof string2 !== 'string') {
    throw 'Invalid input: Please provide valid strings for string1 and string2.';
  }

  // Trim input strings
  string1 = string1.trim();
  string2 = string2.trim();

  // Check if the length of each string is at least 4 characters
  if (string1.length < 4 || string2.length < 4) {
    throw 'Invalid input: Both strings should have a length of at least 4 characters.';
  }

  // Check if both strings are not just strings with empty spaces
  if (string1.trim() === '' || string2.trim() === '') {
    throw 'Invalid input: Both strings should not be just strings with empty spaces.';
  }

  // Concatenate the strings, swapping the first 4 characters of each
  const result = string2.slice(0, 4) + string1.slice(4) + ' ' + string1.slice(0, 4) + string2.slice(4);
  return result;
};

export { emojiCounter, sortStockPrices, mashUp };
