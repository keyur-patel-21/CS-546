//Here is where you will do all of the logic and processing for the palindrome and prime checking.

document.getElementById('palindromeForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Reset error message
  document.querySelector('.error').style.display = 'none';

  // Get input value and preprocess
  const inputValue = document.getElementById('palindrome_input').value.toLowerCase().replace(/[^a-z0-9,]/g, '');
  const words = inputValue.split(',');

  if (inputValue.trim() === '' || words.every(word => word.trim() === '')) {
      // Display error if input is empty or contains only spaces
      document.querySelector('.error').style.display = 'block';
      return;
  }

  const palindromeResults = [];
  words.forEach(word => {
      const strippedWord = word.replace(/[^a-z0-9]/g, '');
      const isPalindrome = strippedWord === strippedWord.split('').reverse().join('');
      palindromeResults.push(isPalindrome);
  });

  const isPrime = isPrimeNumber(palindromeResults.length);

  const resultList = document.getElementById('palindromes');
  const listItem = document.createElement('li');
  listItem.textContent = JSON.stringify(palindromeResults);
  listItem.className = isPrime ? 'prime' : 'not-prime';
  resultList.appendChild(listItem);
});

function isPrimeNumber(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
  }
  return true;
}
