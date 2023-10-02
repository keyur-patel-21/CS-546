/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
  mergeCommonElements,
  findTriangles,
  stringMetrics,
} from "./arrayUtils.js";
import { emojiCounter, sortStockPrices, mashUp } from "./stringUtils.js";
import { solvePuzzles, evaluatePokerHand, combineObjects } from "./objUtils.js";

// For Q1
try {
  console.log(
    mergeCommonElements(
      [35, "hello", 24, ["abc", 7], 3, -4],
      [3, ["62", 4], 1, 24, -4, "abc"]
    )
  ); //returns [-4, 3, 24, "abc"]
} catch (e) {
  console.log(e);
}
try {
  console.log(mergeCommonElements([1, 2, 3], "string", [4, 5, 6])); // throws an error
} catch (e) {
  console.log(e);
}

// For Q2
try {
  console.log(
    findTriangles([
      [3, 3, 3],
      [3, 3, 4],
      [5, 4, 2],
    ])
  ); // returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
} catch (e) {
  console.log(e);
}

try {
  console.log(findTriangles([5, 5, 5])); // throws an error
} catch (e) {
  console.log(e);
}

// For Q3
try {
  console.log(
    stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"])
  ); //returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5}
} catch (e) {
  console.log(e);
}

try {
  console.log(stringMetrics(["apple"])); // throws an error
} catch (e) {
  console.log(e);
}

// For Q4

try {
  console.log(emojiCounter(":fire::pregnant_man::fire:")); // Should return 3
} catch (e) {
  console.log(e);
}

try {
  console.log(emojiCounter("             ")); // Throws error
} catch (e) {
  console.log(e);
}

// For Q5

try {
  let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
  let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
  console.log(sortStockPrices(lastStocks, currStocks)); // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}]
} catch (e) {
  console.log(e);
}

try {
  let lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
  let currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
  sortStockPrices(lastStocks, currStocks); // throws an error
} catch (e) {
  console.log(e);
}

// ForQ6 Mashup

try {
  console.log(mashUp("helloooo", "world!")); //Returns "worloooo helld!"
} catch (e) {
  console.log(e);
}

try {
  console.log(mashUp("Patrick", "")); //Throws error
} catch (e) {
  console.log(e);
}

// For Q7 solvePuzzles

try {
  console.log(
    solvePuzzles(
      [
        { a: 23, b: 17, d: 2 },
        { b: 17, d: 3, e: "hello" },
      ],
      { a: 45, b: 60, c: -3, d: 88, e: 12 }
    )
  ); //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ]
} catch (e) {
  console.log(e);
}

try {
  console.log(
    solvePuzzles([{ b: "tree", d: "patrick" }], {
      a: "house",
      b: "apple",
      c: 50,
      d: 100,
      f: 200,
    })
  ); //returns error
} catch (e) {
  console.log(e);
}

// For Q8 PokerHand

try {
  let hand = [
    { suit: "hearts", value: "2" },
    { suit: "hearts", value: "3" },
  ];
  let communityCards = [
    { suit: "hearts", value: "4" },
    { suit: "hearts", value: "5" },
    { suit: "hearts", value: "6" },
  ];
  console.log(evaluatePokerHand(hand, communityCards)); // Returns "Straight Flush"
} catch (e) {
  console.log(e);
}
try {
  let hand = [
    { suit: "hearts", value: "2" },
    { suit: "hearts", value: "3" },
    { suit: "hearts", value: "4" },
  ];
  let communityCards = [
    { suit: "hearts", value: "5" },
    { suit: "hearts", value: "6" },
    { suit: "hearts", value: "7" },
    { suit: "hearts", value: "8" },
    { suit: "hearts", value: "9" },
  ];
  console.log(evaluatePokerHand(hand, communityCards)); // Should throw an error because the hand has more than two cards
} catch (e) {
  console.log(e);
}

// For Q9 Combine Objects
try {
  console.log(
    combineObjects([
      { a: 3, b: 7, c: 5, d: 7 },
      { d: 4, e: 9, a: "apple" },
      { a: 8, d: 2 },
    ])
  );

  // Returns:{ a: [3, "apple", 8]  d: [7,4,2]}
} catch (e) {
  console.log(e);
}

try {
  console.log(
    combineObjects([
      { a: 1, b: 2 },
      { c: 3, d: 4 },
      "not_an_object", // Adding a non-object element
    ])
  );
} catch (e) {
  console.log(e);
}
