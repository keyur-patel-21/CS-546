//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isValidDate(dateString) {
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(dateString)) return false;

  const [month, day, year] = dateString.split('/').map(Number);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight

  if (year < currentDate.getFullYear()) return false;
  if (year === currentDate.getFullYear() && month - 1 < currentDate.getMonth()) return false;
  if (year === currentDate.getFullYear() && month - 1 === currentDate.getMonth() && day < currentDate.getDate()) return false;

  // Check for valid days in each month (e.g., no 31st of February)
  const lastDayInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayInMonth) return false;

  return true;
}

function isValidTime(timeString) {
  const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9][APap][mM]$/;
  return timePattern.test(timeString);
}

function isValidState(state) {
  // An array of valid state abbreviations
  const validStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  // Check if the provided state is in the array of valid states
  return validStates.includes(state);
}

function isValidZip(zip) {
  // Use a regular expression to check if the ZIP code is a 5-digit number
  const zipPattern = /^\d{5}$/;
  return zipPattern.test(zip);
}




export { isValidEmail, isValidDate, isValidTime, isValidState, isValidZip };
