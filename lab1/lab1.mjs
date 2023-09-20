export const questionOne = (arr) => {
  // Implement question 1 here
  let total_vowels = 0;
  for (const word of arr) {
    for (const letter of word) {
      if ("AEIOUaeiou".includes(letter)) {
        total_vowels++;
      }
    }
  }

  const is_even = total_vowels % 2 === 0;

  return [total_vowels, is_even]; //return result
};

export const questionTwo = (obj1, obj2) => {
  // Implement question 2 here
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const uniqueKeys1 = keys1.filter((key) => !keys2.includes(key));
  const uniqueKeys2 = keys2.filter((key) => !keys1.includes(key));
  const uniqueKeys = uniqueKeys1.concat(uniqueKeys2);

  uniqueKeys.sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    return String(a).localeCompare(String(b));
  });

  return uniqueKeys;
};

export const questionThree = (arr) => {
  // Implement question 3 here
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    const [a, b, c] = arr[i];

    const perimeter = a + b + c;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const roundedArea = Math.round(area * 100) / 100;
    result[i] = [roundedArea, perimeter];
  }

  return result;
};

export const questionFour = (string) => {
  // Implement question 4 here
  let word_arr = string.split(",");
  let anagram = [];
  for (const word of word_arr) {
    const middleIndex = word.length / 2;
    const firstPart = word.substring(0, middleIndex);
    const secondPart = word.substring(middleIndex);
    anagram.push(secondPart + firstPart);
  }

  return anagram; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: "Keyur",
  lastName: "Patel",
  studentId: "20010939",
};
