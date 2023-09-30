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

  for (const arr of args){
    for (const item of arr){
      if (typeof item !== "string" || typeof item !== "number" || !Array.isArray(item)){
        throw "Array Element Should be String, Number or Array";
      }
    }
  }

  const flattenedArrays = args.map((arr) => arr.flat(Infinity));
  
  const commonElements = [...new Set(flattenedArrays[0])].filter((element) =>
    flattenedArrays.every((arr) => arr.includes(element))
  );
  
  function customSorting(arr) {
    const numbers = [];
    const strings = [];
  
    for (const element of arr) {
      if (typeof element === "number") {
        numbers.push(element);
      } else if (typeof element === "string") {
        strings.push(element);
      }
    }
  
    numbers.sort((a, b) => a - b);
    strings.sort((a, b) => a.localeCompare(b));
    const result = [...numbers, ...strings];
  
    return result;
  }

  let result = customSorting(commonElements);

  if(result.length<1){
    throw "No common elements found."
  }

  return result;
};

let findTriangles = (arr) => {};

let stringMetrics = (arr) => {};

export { mergeCommonElements, findTriangles, stringMetrics };
