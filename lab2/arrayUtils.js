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

  const results = {};

  for (let i = 0; i < arr.length; i++) {
    const triangle = arr[i];

    // Check if each element in the subarray is a number
    if (
      !Array.isArray(triangle) ||
      triangle.length !== 3 ||
      triangle.some((side) => typeof side !== "number")
    ) {
      throw `Invalid input at index ${i}`;
    }

    // Check if it's a valid triangle (sum of any two sides must be greater than the third)
    const [a, b, c] = triangle;
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw `Invalid triangle at index ${i}`;
    }

    // Calculate area, perimeter, and triangle type
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

    // Store the results in the object
    results[i] = [parseFloat(area), parseInt(perimeter), triangleType];
  }

  return results;
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
  const vowels = validStrings.join("").match(/[aeiouAEIOU]/g).length;
  const consonants = validStrings
    .join("")
    .match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g).length;
  const sortedLengths = lengths.slice().sort((a, b) => a - b);
  const medianIndex = Math.floor(sortedLengths.length / 2);
  let mode = null;

  if (sortedLengths.length % 2 === 0) {
    mode = [sortedLengths[medianIndex - 1], sortedLengths[medianIndex]];
  } else {
    mode = [sortedLengths[medianIndex]];
  }

  // Convert mode to a single number if there's only one mode
  if (mode.length === 1) {
    mode = mode[0];
  }

  const mean = parseFloat(
    (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(2)
  );

  const shortest = validStrings.filter(
    (str) => str.length === sortedLengths[0]
  );
  const longest = validStrings.filter(
    (str) => str.length === sortedLengths[sortedLengths.length - 1]
  );

  const result = {
    vowels,
    consonants,
    longest: longest.length === 1 ? longest[0] : longest,
    shortest: shortest.length === 1 ? shortest[0] : shortest,
    mean,
    median:
      medianIndex % 1 === 0
        ? (sortedLengths[medianIndex - 1] + sortedLengths[medianIndex]) / 2
        : sortedLengths[medianIndex],
    mode,
  };

  return result;
};

export { mergeCommonElements, findTriangles, stringMetrics };
