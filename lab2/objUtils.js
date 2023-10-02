/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import {
  isCardValid,
  getValueRank,
  isStraightFlush,
  isThreeOfAKind,
  isPair,
} from "./helpers.js";

let solvePuzzles = (puzzles, pieces) => {
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    throw "Invalid puzzles array";
  }

  if (
    !puzzles.every(
      (obj) => typeof obj === "object" && Object.keys(obj).length > 0
    )
  ) {
    throw "Invalid puzzle objects";
  }

  if (typeof pieces !== "object" || Object.keys(pieces).length === 0) {
    throw "Invalid pieces object";
  }

  const isValidKey = (key) => ["a", "b", "c", "d", "e"].includes(key);

  for (let puzzle of puzzles) {
    if (!Object.keys(puzzle).every(isValidKey)) {
      throw "Invalid puzzle keys";
    }
  }

  if (!Object.keys(pieces).every(isValidKey)) {
    throw "Invalid pieces keys";
  }

  function entirePuzzle(incomplete, pieces) {
    const sortedKeys = ["a", "b", "c", "d", "e"];

    const completePuzzle = sortedKeys.reduce((acc, key) => {
      if (key in incomplete) {
        acc[key] =
          typeof incomplete[key] === "string"
            ? incomplete[key].trim()
            : incomplete[key];
      } else if (key in pieces) {
        acc[key] =
          typeof pieces[key] === "string" ? pieces[key].trim() : pieces[key];
      }
      return acc;
    }, {});

    return completePuzzle;
  }

  const result = puzzles.map((puzzle) => entirePuzzle(puzzle, pieces));

  return result;
};

let evaluatePokerHand = (hand, communityCards) => {
  if (
    !hand ||
    !Array.isArray(hand) ||
    hand.length !== 2 ||
    !hand.every((card) => isCardValid(card))
  )
    throw "Hand should be an array with exactly two valid cards.";

  if (
    !communityCards ||
    !Array.isArray(communityCards) ||
    communityCards.length < 3 ||
    communityCards.length > 5 ||
    !communityCards.every((card) => isCardValid(card))
  )
    throw "Community cards should be an array with three to five valid cards.";

  const sortedHand = [...hand, ...communityCards].sort(
    (a, b) => getValueRank(b.value) - getValueRank(a.value)
  );

  if (isStraightFlush(sortedHand)) return "Straight Flush";
  if (isThreeOfAKind(sortedHand)) return "Three of a Kind";
  if (isPair(sortedHand)) return "Pair";
  return "High Card";
};

let combineObjects = (arr) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw "Input must be an array with at least two objects";
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "object" || Object.keys(arr[i]).length === 0) {
      throw "Each object in the array must have at least one key/value";
    }
  }

  arr = arr.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );
  });

  const commonKeys = Object.keys(arr[0]).filter((key) =>
    arr.every((obj) => key in obj)
  );

  const result = {};

  commonKeys.forEach((key) => {
    result[key] = arr.map((obj) => obj[key]);
  });

  return result;
};

export { solvePuzzles, evaluatePokerHand, combineObjects };
