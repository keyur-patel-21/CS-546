//Here is where you will do all of the logic and processing for the palindrome and prime checking.

document
  .getElementById("palindromeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelector(".error").style.display = "none";

    const input = document
      .getElementById("palindrome_input")
      .value.toLowerCase()
      .replace(/[^a-z0-9,]/g, "");
    const words = input.split(",");

    if (input.trim() === "" || words.every((word) => word.trim() === "")) {
      document.querySelector(".error").style.display = "block";
      return;
    }

    const results = [];
    words.forEach((word) => {
      const strippedWord = word.replace(/[^a-z0-9]/g, "");
      const isPalindrome =
        strippedWord === strippedWord.split("").reverse().join("");
      results.push(isPalindrome);
    });

    const isPrime = isPrimeNumber(results.length);

    const result = document.getElementById("palindromes");
    const listItem = document.createElement("li");
    listItem.textContent = JSON.stringify(results);
    listItem.className = isPrime ? "prime" : "not-prime";
    result.appendChild(listItem);
  });

function isPrimeNumber(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
