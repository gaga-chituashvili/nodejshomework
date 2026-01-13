//1
const findlongestword = (str) => {
  let words = str.split(" ");
  let longest = " ";
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
      return longest;
    }
  }
};

//2

const changewords = (str) => {
  let words = str.split(" ");
  return words;
};

//3
const protectMail = (email) => {
  const [name, domain] = email.split("@");
  const [firstName, lastName] = name.split(".");

  if (!lastName) {
    return "ემაილი არასწორია";
  }

  const hidden = ".".repeat(lastName.length);

  return `${firstName}${hidden}@${domain}`;
};
