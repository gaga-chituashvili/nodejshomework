1; //
const fizbuzz = (num) => {
  if (num % 3 === 0) {
    return "fizz";
  } else if (num % 5 === 0) {
    return "buzz";
  } else if (num % 3 === 0 && num % 5 === 0) {
    return "fizzbuzz";
  }
};

//2

const factorialCalculator = (num) => {
  let factorial = 1;
  for (let i = 1; i <= num; i++) {
    factorial *= i;
  }
  return factorial;
};

//3

const uppercaseconverter = (str) => {
  return str.toUpperCase();
};

//4

const emptystring = (str) => {
  if (str.length === 0) {
    return "this string is not blank";
  } else {
    return "this string is blank";
  }
};

//5

let names = ["John", "Nick", "Bob", "Mary", "Bob", "Sue", "Ann", "Bob", "Bob"];

const removeBob = () => {
  let result = [];

  for (let name of names) {
    if (name !== "Bob") {
      result.push(name);
    }
  }

  return result;
};

