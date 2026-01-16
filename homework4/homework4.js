//2

const fs = require("fs");

const readText = fs.createReadStream("input.txt", "utf-8");
const writeText = fs.createWriteStream("output.txt", "utf-8");

readText.on("data", (chunk) => {
  console.log("recive chunk", chunk.length, "bytes");
  writeText.write(`modified-data--->>>${chunk}`);
});

readText.on("end", () => {
  console.log("data read has been finished");
});

readText.on("error", (err) => {
  throw new Error("An error occured during file open", err);
});
