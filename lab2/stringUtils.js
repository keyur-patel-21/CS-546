/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let emojiCounter = (message) => {
  if (!message || typeof message !== "string" || message.trim() === "") {
    throw "Please provide a non-empty string as the message.";
  }

  let trimmedMessage = message.trim();

  const emojiRegex = /:[^:\s]+:/g;
  const emojis = trimmedMessage.match(emojiRegex);

  return emojis ? emojis.length : 0;
};

let sortStockPrices = (lastStocks, currStocks) => {
  const validateInput = (stocks) => {
    if (!stocks || typeof stocks !== "string" || stocks.trim() === "") {
      throw "Please provide a valid non-empty string for stocks";
    }
  };

  const parseStock = (stock) => {
    if (!stock || typeof stock !== "string" || stock.trim() === "") {
      throw "Invalid format for stock entry.";
    }

    const [symbol, price] = stock.split(",") || [];
    const trimmedSymbol = (symbol && symbol.trim()) || "";
    const trimmedPrice = parseFloat((price && price.trim()) || "");

    if (!/^[a-zA-Z]{1,5}$/.test(trimmedSymbol) || isNaN(trimmedPrice)) {
      throw "Invalid format for stock ticker or price.";
    }

    return { symbol: trimmedSymbol, price: trimmedPrice };
  };

  validateInput(lastStocks);
  validateInput(currStocks);

  const parseStocks = (stocks) => {
    if (!stocks || typeof stocks !== "string" || stocks.trim() === "") {
      throw "Please provide a valid non-empty string for stocks";
    }

    return stocks.split("|").map(parseStock);
  };

  const lastStocksArray = parseStocks(lastStocks);
  const currStocksArray = parseStocks(currStocks);

  const validateStockSymbols = (symbols1, symbols2) => {
    if (!symbols1.every((symbol) => symbols2.includes(symbol))) {
      throw "Both strings must contain the same stocks (case-insensitive).";
    }
  };

  validateStockSymbols(
    lastStocksArray.map((stock) => stock.symbol.toLowerCase()),
    currStocksArray.map((stock) => stock.symbol.toLowerCase())
  );

  const mergedStocks = lastStocksArray.map((lastStock) => {
    const currStock = currStocksArray.find(
      (curr) => curr.symbol.toLowerCase() === lastStock.symbol.toLowerCase()
    );

    if (!currStock) {
      throw "Stock symbol not found in current stocks.";
    }

    const change =
      ((currStock.price - lastStock.price) / lastStock.price) * 100;
    return {
      symbol: lastStock.symbol,
      price: currStock.price,
      change: parseFloat(change.toFixed(1)),
    };
  });

  return mergedStocks.sort((a, b) => b.change - a.change);
};

let mashUp = (string1, string2) => {
  if (
    !string1 ||
    !string2 ||
    typeof string1 !== "string" ||
    typeof string2 !== "string"
  ) {
    throw "Please provide valid strings for string1 and string2.";
  }

  string1 = string1.trim();
  string2 = string2.trim();

  if (string1.length < 4 || string2.length < 4) {
    throw "Both strings should have a length of at least 4 characters.";
  }

  if (string1.trim() === "" || string2.trim() === "") {
    throw "Both strings should not be just strings with empty spaces.";
  }

  const result =
    string2.slice(0, 4) +
    string1.slice(4) +
    " " +
    string1.slice(0, 4) +
    string2.slice(4);
  return result;
};

export { emojiCounter, sortStockPrices, mashUp };
