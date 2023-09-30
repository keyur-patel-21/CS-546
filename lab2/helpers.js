/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
// Helper function to check if a card is valid
const isCardValid = (card) => {
  const validSuits = ["hearts", "clubs", "diamonds", "spades"];
  const validValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  return (
    card &&
    typeof card === "object" &&
    "suit" in card &&
    "value" in card &&
    typeof card.suit === "string" &&
    typeof card.value === "string" &&
    validSuits.includes(card.suit) &&
    validValues.includes(card.value)
  );
};

// Helper function to get the rank of a card value
const getValueRank = (value) => {
  const valueRanks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  return valueRanks.indexOf(value);
};

// Helper function to check if the hand has a straight flush
const isStraightFlush = (hand) => {
  const sortedValues = hand
    .map((card) => getValueRank(card.value))
    .sort((a, b) => a - b);

  // Check for straight
  for (let i = 1; i < sortedValues.length; i++) {
    if (sortedValues[i] - sortedValues[i - 1] !== 1) {
      return false;
    }
  }

  // Check for flush
  const suitCounts = {};
  for (const card of hand) {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    if (suitCounts[card.suit] === 5) {
      return true;
    }
  }

  return false;
};

// Helper function to check if the hand has three of a kind
const isThreeOfAKind = (hand) => {
  const valueCounts = {};
  for (const card of hand) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    if (valueCounts[card.value] === 3) {
      return true;
    }
  }

  return false;
};

// Helper function to check if the hand has a pair
const isPair = (hand) => {
  const valueCounts = {};
  for (const card of hand) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    if (valueCounts[card.value] === 2) {
      return true;
    }
  }

  return false;
};

export { isCardValid, getValueRank, isStraightFlush, isThreeOfAKind, isPair };
