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
  
  const commonElements = [...new Set(flattenedArrays[0])].filter((element) =>
    flattenedArrays.every((arr) => arr.includes(element))
  );

  // Sort the common elements numerically first, then alphabetically for strings
  // commonElements.sort((a, b) => {
  //   if (typeof a === "number" && typeof b === "number") {
  //     return a - b; // Sort numbers in ascending order
  //   } else if (typeof a === "string" && typeof b === "string") {
  //     return a.localeCompare(b); // Sort strings in ascending order
  //   } else {
  //     return 0; // Other types are not compared
  //   }
  // });
   

  return commonElements;
};

let findTriangles = (arr) => {};

let stringMetrics = (arr) => {};

export { mergeCommonElements, findTriangles, stringMetrics };
