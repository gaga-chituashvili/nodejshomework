//1
const years = parseInt(process.argv[2]);

if ((years % 4 === 0 && years % 100 !== 0) || years % 400 === 0) {
  console.log("მოცემული წელი ნაკიანია");
} else {
  console.log("მოცემული წელი არ არის ნაკიანი");
}

console.log(years);

//2

const firstnumber = parseInt(process.argv[2]);
const secondnumber = parseInt(process.argv[3]);
const operation = process.argv[4];

if (operation === "+") {
  console.log(firstnumber + secondnumber);
} else if (operation === "-") {
  console.log(firstnumber - secondnumber);
} else if (operation === "*") {
  console.log(firstnumber * secondnumber);
} else if (operation === "/") {
  console.log(firstnumber / secondnumber);
}

//3

const password = process.argv[2];
const checkpassword = /^\d+$/.test(password);

if (password.length < 3) {
  console.log("პაროლი უვარგისია");
} else if (password.length >= 3 && password.length < 6) {
  console.log("პაროლი სუსტია");
} else if (password.length >= 6 && password.length < 8) {
  console.log("პაროლი მისაღებია");
} else if (password.length >= 8 && password.length <= 16) {
  console.log("პაროლი ძლიერი");
} else {
  console.log("პაროლი ძალიან გრძელია");
}

//4

const words = process.argv[2];

const wordList = words.split(",");
let longest = "";

for (let word of wordList) {
  if (word.length > longest.length) {
    longest = word;
  }
}

console.log("Longest word:", longest);
