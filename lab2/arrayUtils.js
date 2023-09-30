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

let findTriangles = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw 'Input must be a non-empty array of arrays';
  }

  const results = {};

  for (let i = 0; i < arr.length; i++) {
    const triangle = arr[i];

    // Check if each element in the subarray is a number
    if (
      !Array.isArray(triangle) ||
      triangle.length !== 3 ||
      triangle.some((side) => typeof side !== 'number')
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

    let triangleType = '';
    if (a === b && b === c) {
      triangleType = 'equilateral';
    } else if (a === b || b === c || a === c) {
      triangleType = 'isosceles';
    } else {
      triangleType = 'scalene';
    }

    // Store the results in the object
    results[i] = [parseFloat(area), parseInt(perimeter), triangleType];
  }

  return results;
};

let stringMetrics = (arr) => {};

export { mergeCommonElements, findTriangles, stringMetrics };
