const {
  des,
  tripleDes,
  aes,
  rc4,
  blowfish,
  idea,
  rsa,
  ecc,
} = require("./algos/des");

const { key, plainData } = require("./utils/key");

const app = require("express")();

app.get("/", (req, res) => {
  res.json("hi");
});

des.name = "des";
tripleDes.name = "tripleDes";
aes.name = "aes";
rc4.name = "rc4";
blowfish.name = "blowfish";
idea.name = "idea";
rsa.name = "rsa";

const algosArray = [des, tripleDes, aes, rc4, blowfish, idea, rsa];
const encTimeData = {
  des: [],
  tripleDes: [],
  aes: [],
  rc4: [],
  blowfish: [],
  idea: [],
  rsa: [],
};
const decTimeData = {
  des: [],
  tripleDes: [],
  aes: [],
  rc4: [],
  blowfish: [],
  idea: [],
  rsa: [],
};
const totalTimeData = {
  des: [],
  tripleDes: [],
  aes: [],
  rc4: [],
  blowfish: [],
  idea: [],
  rsa: [],
};

// totalTimeData["des"].push(1);
// console.error(totalTimeData.des);

// !DES
// let data = des.encrypt("VIKAS", 0);
// console.log(data);
// data = des.decrypt(data, 0);
// console.log(data);

// !3DES
// let data = tripleDes.encrypt("VIKAS");
// console.log(data, "Encrypted");
// data = tripleDes.decrypt(data);
// console.log("PLAINTEXT", data);

// !AES
// let data = aes.encrypt("YADAV");
// console.log(data, "Encrypted");
// data = aes.decrypt(data);
// console.log("PLAINTEXT", data);

// !RC4
// let data = rc4.encrypt("SUMAN");
// console.log(data, "Encrypted");
// data = rc4.decrypt(data);
// console.log("PLAINTEXT", data);

// !Blowfish
// let data = blowfish.encrypt("YADAV");
// console.log(data, "Encrypted");
// data = blowfish.decrypt(data);
// console.log("PLAINTEXT", data);

// !IDEA
// let data = idea.encrypt("YADAV");
// console.log(data, "Encrypted");
// data = idea.decrypt(data);
// console.log("PLAINTEXT", data);

// !RSA
// let data = rsa.encrypt("YADAV");
// console.log(data, "Encrypted");
// data = rsa.decrypt(data);
// console.log("PLAINTEXT", data);

// const calculatePerformance = async (algo) => {

//   let encTime, decTime, totalTime

//   console.time(algo.name + " Total Time");
//   console.time(algo.name + " Encrypt Time");
//   let data = algo.encrypt(plainData);
//   console.timeEnd(algo.name + " Encrypt Time");
//   // console.log(data, "Encrypted");
//   console.time(algo.name + " Decrypt Time");
//   data = algo.decrypt(data);
//   console.timeEnd(algo.name + " Decrypt Time");

//   // console.log("PLAINTEXT", data);
//   console.timeEnd(algo.name + " Total Time");
// };

const calculatePerformance = async (algo) => {
  let encTime, startTime, totalTime, baseTime, endTime;

  // Encryption
  startTime = Date.now();
  baseTime = Date.now();
  let data = algo.encrypt(plainData);
  endTime = Date.now();
  encTime = endTime - baseTime;
  encTimeData[algo.name].push(encTime / 1000);

  // Decryption
  baseTime = Date.now();
  data = algo.decrypt(data);
  endTime = Date.now();
  decTimeData[algo.name].push((endTime - baseTime) / 1000);
  totalTime = Date.now();
  totalTimeData[algo.name].push((totalTime - startTime) / 1000);
  return;
};

const calculateAverage = (performanceArray) => {
  for (let key in performanceArray) {
    let element = performanceArray[key];
    performanceArray[key] = element.reduce((a, b) => a + b / element.length);
  }
};

// console.log(des);
for (let i = 0; i <= 10; i++) {
  algosArray.forEach((fn) => {
    calculatePerformance(fn);
  });
}

console.log("\u001b[" + 32 + "m" + "Encryption Time" + "\u001b[0m");
console.table(encTimeData);

console.log("\u001b[" + 32 + "m" + "Decryption Time" + "\u001b[0m");
console.table(decTimeData);

console.log("\u001b[" + 32 + "m" + "Total Time" + "\u001b[0m");
console.table(totalTimeData);

calculateAverage(totalTimeData);
calculateAverage(encTimeData);
calculateAverage(decTimeData);

console.log("\u001b[" + 32 + "m" + "Average Encryption Time" + "\u001b[0m");
console.table(encTimeData);

console.log("\u001b[" + 32 + "m" + "Average Decryption Time" + "\u001b[0m");
console.table(decTimeData);

console.log("\u001b[" + 32 + "m" + "Average Total Time" + "\u001b[0m");
console.table(totalTimeData);

// !ECC
let data = ecc.encryptAndDecrypt("YADUVEERA");
// console.log(data, "Encrypted");
// data = ecc.decrypt(data);
// console.log("PLAINTEXT", data);

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
