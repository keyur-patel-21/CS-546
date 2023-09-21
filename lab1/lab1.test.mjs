import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input


// make 5 calls to questionOne passing in different inputs
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])); // returns and then outputs: [9, false]
console.log(lab1.questionOne(["Hii", "there!!", "this", "is", "Keyur!"]));  // returns and then outputs: [8, true]
console.log(lab1.questionOne(['good', 'happy', 'joyful', 'excellent', 'wonderful'])); // returns and then outputs: [11, false]
console.log(lab1.questionOne(['sunny', 'cloudy', 'rainy', 'windy', 'stormy'])); // returns and then outputs: [7, false]
console.log(lab1.questionOne(['today', 'tomorrow', 'yesterday', 'now', 'sooon'])); // returns and then outputs: [12, false]

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // Returns and then outputs: ["d","e"]
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo({'1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8}));
console.log(lab1.questionTwo({'for': true, x: 5, '6': 'hi'}, {'9': true, g: 5, 'me': "fb", '4': "jsk", '7': 8}));
console.log(lab1.questionTwo({'product': 'Laptop', 'brand': 'Dell', 'price': 800},{'product': 'Smartphone','country': 'iPhone','state': 1000}));

// make 5 calls to questionThree
console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); 
console.log(lab1.questionThree([[3,4,5], [3,7,8], [5,5,7]])); 
console.log(lab1.questionThree([[7,7,10], [3,4,5], [5,5,5]])); 
console.log(lab1.questionThree([[9,10,15], [8,4,12], [48,52,28]]));
console.log(lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]]));   

// make 5 calls to questionFour
console.log(lab1.questionFour('patrick,hill,trees,home'));   
console.log(lab1.questionFour('joseph,ball,square,pencil'));   
console.log(lab1.questionFour('keyur,patel,string,music'));   
console.log(lab1.questionFour('monitor,processor,mouse,keyboard'));   
console.log(lab1.questionFour('eat,move,sleep,breathe'));   
