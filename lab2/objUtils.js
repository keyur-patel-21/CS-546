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
  // Record the start time
  const startTime = new Date();

  // Check if puzzles exist and are of valid type (array)
  if (!puzzles || !Array.isArray(puzzles)) {
    throw new Error("Invalid input: Puzzles must be an array.");
  }

  // Check if puzzles is not an empty array
  if (puzzles.length === 0) {
    throw new Error("Invalid input: Puzzles array should not be empty.");
  }

  // Check if puzzles contains only objects, with at least one key/value in each object supplied
  if (
    !puzzles.every(
      (obj) => typeof obj === "object" && Object.keys(obj).length > 0
    )
  ) {
    throw new Error(
      "Invalid input: Puzzles array should only contain non-empty objects."
    );
  }

  // Check if each puzzle object in the puzzles array contains only the keys a-e
  if (
    !puzzles.every((obj) =>
      Object.keys(obj).every((key) => /^[a-e]$/.test(key))
    )
  ) {
    throw new Error(
      "Invalid input: Each puzzle object should contain only keys a-e."
    );
  }

  // Check if pieces is an object that has at least one key/value
  if (
    !pieces ||
    typeof pieces !== "object" ||
    Object.keys(pieces).length === 0
  ) {
    throw new Error(
      "Invalid input: Pieces should be an object with at least one key/value."
    );
  }

  // Check if each pieces object contains only the keys a-e
  if (!Object.keys(pieces).every((key) => /^[a-e]$/.test(key))) {
    throw new Error(
      "Invalid input: Pieces object should contain only keys a-e."
    );
  }

  // Solve the puzzles by adding missing pieces
  const solvedPuzzles = puzzles.map((puzzle) => {
    const completedPuzzle = { ...puzzle };

    Object.keys(pieces).forEach((key) => {
      if (!(key in completedPuzzle)) {
        completedPuzzle[key] = pieces[key];
      }
    });

    return completedPuzzle;
  });

  // Record the end time
  const endTime = new Date();
  const executionTime = endTime - startTime;

  console.log(`Execution time: ${executionTime} milliseconds`);

  return solvedPuzzles;
};

let evaluatePokerHand = (hand, communityCards) => {
  // Check if hand exists and has exactly two cards
  if (
    !hand ||
    !Array.isArray(hand) ||
    hand.length !== 2 ||
    !hand.every((card) => isCardValid(card))
  ) {
    throw new Error(
      "Invalid input: Hand should be an array with exactly two valid cards."
    );
  }

  // Check if communityCards exists and has three to five cards
  if (
    !communityCards ||
    !Array.isArray(communityCards) ||
    communityCards.length < 3 ||
    communityCards.length > 5 ||
    !communityCards.every((card) => isCardValid(card))
  ) {
    throw new Error(
      "Invalid input: Community cards should be an array with three to five valid cards."
    );
  }

  // Combine hand and communityCards to form the player's full hand
  const fullHand = [...hand, ...communityCards];

  // Sort the cards by their values
  const sortedHand = fullHand.sort(
    (a, b) => getValueRank(b.value) - getValueRank(a.value)
  );

  // Check for the different poker hands
  if (isStraightFlush(sortedHand)) {
    return "Straight Flush";
  } else if (isThreeOfAKind(sortedHand)) {
    return "Three of a Kind";
  } else if (isPair(sortedHand)) {
    return "Pair";
  } else {
    return "High Card";
  }
};

let combineObjects = (arr) => {
  // Check if the argument is an array
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }

  // Check if the array contains at least two objects
  if (arr.length < 2) {
    throw new Error("Array must contain at least two objects");
  }

  // Check if each object has at least 1 key/value
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "object" || Object.keys(arr[i]).length === 0) {
      throw new Error("Each object must have at least 1 key/value");
    }
  }

  // Trim all string inputs
  arr = arr.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );
  });

  // Find common keys
  const commonKeys = Object.keys(arr[0]).filter((key) =>
    arr.every((obj) => key in obj)
  );

  // Create the result object
  const result = {};

  // Populate the result object with values
  commonKeys.forEach((key) => {
    result[key] = arr.map((obj) => obj[key]);
  });

  return result;
};

export { solvePuzzles, evaluatePokerHand, combineObjects };
