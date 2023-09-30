/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import { mergeCommonElements, findTriangles, stringMetrics } from "./arrayUtils.js";


// For Q1
try{
  console.log(mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3])); //returns [1, 3]
}
catch(e){
  console.log(e)
}

try{
  console.log(mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"])); //returns [-4, 3, 24, "abc"]
}
catch(e){
  console.log(e)
}

try{
  console.log(mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0])); // returns [5, "banana"]
}
catch(e){
  console.log(e)
}

try{
  console.log(mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"])); // returns ["apple"]
}
catch(e){
  console.log(e)
}

try{
  console.log(mergeCommonElements([1, 2, 3], "string", [4, 5, 6])); // throws an error
}
catch(e){
  console.log(e)
}

try{
  console.log(mergeCommonElements([1, 2, 3], [], [4, 5, 6])); // throws an error
}
catch(e){
  console.log(e)
}



