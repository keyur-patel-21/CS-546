/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let mergeCommonElements = (...args) => {
  if (args.length < 2) {
    throw "You must Supply two arrays as input";
  }

  for (const arr of args) {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw "Each input must be an array that is not empty.";
    }
  }

  const flattenedArrays = args.map((arr) => arr.flat(Infinity));

  for (const array of flattenedArrays) {
    for (const element of array) {
      if (
        typeof element !== "string" &&
        typeof element !== "number" &&
        !Array.isArray(element)
      ) {
        throw "Elements should not be other than String, number, or array";
      }
    }
  }

  const commonElements = [...new Set(flattenedArrays[0])].filter((element) =>
    flattenedArrays.every((arr) => arr.includes(element))
  );

  function customSorting(arr) {
    let numbers = [];
    let strings = [];

    for (const element of arr) {
      if (typeof element === "number") {
        numbers.push(element);
      } else if (typeof element === "string") {
        strings.push(element);
      } else {
        throw "Elements should not be other than String, number or array";
      }
    }

    numbers.sort((a, b) => a - b);
    strings = strings.sort();
    const result = [...numbers, ...strings];

    return result;
  }

  let result = customSorting(commonElements);

  if (result.length < 1) {
    throw "No common elements found.";
  }

  return result;
};

let findTriangles = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw "Input must be a non-empty array of arrays";
  }

  const triDetails = {};

  for (let i = 0; i < arr.length; i++) {
    const triangle = arr[i];

    if (
      !Array.isArray(triangle) ||
      triangle.length !== 3 ||
      triangle.some((side) => typeof side !== "number")
    ) {
      throw "You should input 3 sides of triangles in numbers only";
    }

    const [a, b, c] = triangle;
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw "please input valid triangles";
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
    const perimeter = (a + b + c).toFixed(0);

    let triangleType = "";
    if (a === b && b === c) {
      triangleType = "equilateral";
    } else if (a === b || b === c || a === c) {
      triangleType = "isosceles";
    } else {
      triangleType = "scalene";
    }

    triDetails[i] = [parseFloat(area), parseInt(perimeter), triangleType];
  }

  return triDetails;
};

let stringMetrics = (arr) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw "Input must be an array with at least two strings.";
  }

  const validStrings = arr.filter(
    (str) => typeof str === "string" && str.trim() !== ""
  );

  if (validStrings.length !== arr.length) {
    throw "Array must contain only non-empty strings.";
  }

  const lengths = validStrings.map((str) => str.length);
  const joinedString = validStrings.join("");
  const vowels = (joinedString.match(/[aeiouAEIOU]/g) || []).length;
  const consonants = (
    joinedString.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []
  ).length;
  const sortedLengths = [...lengths].sort((a, b) => a - b);
  const medianIndex = Math.floor(sortedLengths.length / 2);
  const modeOccurrences = {};

  sortedLengths.forEach((length) => {
    modeOccurrences[length] = (modeOccurrences[length] || 0) + 1;
  });

  const modes = Object.entries(modeOccurrences)
    .filter(
      ([_, count]) => count === Math.max(...Object.values(modeOccurrences))
    )
    .map(([length]) => parseInt(length))
    .sort((a, b) => a - b);

  const mean = parseFloat(
    (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(2)
  );

  const findWordsByLength = (length) =>
    validStrings.filter((str) => str.length === length);
  const shortestLength = sortedLengths[0];
  const longestLength = sortedLengths[sortedLengths.length - 1];
  const shortest = findWordsByLength(shortestLength);
  const longest = findWordsByLength(longestLength);

  return {
    vowels,
    consonants,
    longest: longest.length === 1 ? longest[0] : longest,
    shortest: shortest.length === 1 ? shortest[0] : shortest,
    mean,
    median:
      medianIndex % 1 === 0
        ? (sortedLengths[medianIndex - 1] + sortedLengths[medianIndex]) / 2
        : sortedLengths[medianIndex],
    mode: modes.length === 0 ? null : modes.length === 1 ? modes[0] : modes,
  };
};

export { mergeCommonElements, findTriangles, stringMetrics };
