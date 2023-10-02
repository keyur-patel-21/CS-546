/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
function isCardValid(card) {
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

  if (
    card &&
    typeof card === "object" &&
    "suit" in card &&
    "value" in card &&
    typeof card.suit === "string" &&
    typeof card.value === "string" &&
    validSuits.includes(card.suit.trim()) &&
    validValues.includes(card.value.trim())
  ) {
    return true;
  } else {
    return false;
  }
}

function getValueRank(value) {
  const valueOrder = [
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
  return valueOrder.indexOf(value);
}

function isStraightFlush(hand) {
  const sortedValues = hand
    .map((card) => getValueRank(card.value))
    .sort((a, b) => a - b);

  for (let i = 1; i < sortedValues.length; i++) {
    if (sortedValues[i] - sortedValues[i - 1] !== 1) {
      return false;
    }
  }

  const suitCounts = {};
  for (const card of hand) {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    if (suitCounts[card.suit] === 5) {
      return true;
    }
  }

  return false;
}

function isThreeOfAKind(hand) {
  return hasNOfAKind(hand, 3);
}

function isPair(hand) {
  return hasNOfAKind(hand, 2);
}

function hasNOfAKind(hand, n) {
  const valueCounts = {};
  for (const card of hand) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    if (valueCounts[card.value] === n) {
      return true;
    }
  }

  return false;
}

export { isCardValid, getValueRank, isStraightFlush, isThreeOfAKind, isPair };
