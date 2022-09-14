var crypto = require("crypto");
var CryptoJS = require("crypto-js");
const Blowfish = require("egoroof-blowfish");
const IDEA = require("idea-cipher");
const NodeRSA = require("node-rsa");
const eccrypto = require("@toruslabs/eccrypto");

const { masterKey } = require("../utils/key");

exports.des = {
  algorithm: { ecb: "des-ecb", cbc: "des-cbc" },
  encrypt: function (plaintext) {
    const data = CryptoJS.DES.encrypt(plaintext, masterKey).toString();
    return data;
    // console.log("worked");
    // var key = new Buffer(masterKey);
    // var iv = new Buffer(iv ? iv : 0);
    // var cipher = crypto.createCipheriv(this.algorithm.ecb, key, iv);
    // cipher.setAutoPadding(true); //default true
    // var ciph = cipher.update(plaintext, "utf8", "base64");
    // ciph += cipher.final("base64");
    // return ciph;
  },
  decrypt: function (ciphertext) {
    // var key = new Buffer(masterKey);
    // var iv = new Buffer(iv ? iv : 0);
    // var decipher = crypto.createDecipheriv(this.algorithm.ecb, key, iv);
    // decipher.setAutoPadding(true);
    // var txt = decipher.update(encrypt_text, "base64", "utf8");
    // txt += decipher.final("utf8");
    // return txt;
    const data = CryptoJS.DES.decrypt(ciphertext, masterKey);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.tripleDes = {
  encrypt: function (plaintext) {
    const data = CryptoJS.TripleDES.encrypt(plaintext, masterKey).toString();
    return data;
  },
  decrypt: function (ciphertext) {
    const data = CryptoJS.TripleDES.decrypt(ciphertext, masterKey);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.aes = {
  encrypt: function (plaintext) {
    const data = CryptoJS.AES.encrypt(plaintext, masterKey).toString();
    return data;
  },
  decrypt: function (ciphertext) {
    const data = CryptoJS.AES.decrypt(ciphertext, masterKey);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.rc4 = {
  encrypt: function (plaintext) {
    const data = CryptoJS.RC4.encrypt(plaintext, masterKey).toString();
    return data;
  },
  decrypt: function (ciphertext) {
    const data = CryptoJS.RC4.decrypt(ciphertext, masterKey);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.blowfish = {
  encrypt: function (plaintext) {
    const bf = new Blowfish(
      masterKey,
      Blowfish.MODE.CBC,
      Blowfish.PADDING.NULL
    );
    bf.setIv("abcdefgh");
    const data = bf.encode(plaintext);
    return data;
  },
  decrypt: function (ciphertext) {
    const bf = new Blowfish(
      masterKey,
      Blowfish.MODE.CBC,
      Blowfish.PADDING.NULL
    );
    bf.setIv("abcdefgh");
    const data = bf.decode(ciphertext, Blowfish.TYPE.STRING);
    return data;
  },
};

exports.idea = {
  encrypt: function (plaintext) {
    let cipher = new IDEA(masterKey);
    const data = cipher.encrypt(plaintext);
    return data;
  },
  decrypt: function (ciphertext) {
    let cipher = new IDEA(masterKey);
    const data = cipher.decrypt(ciphertext);
    return data.toString(CryptoJS.enc.Utf8);
  },
};

exports.rsa = {
  key: new NodeRSA({ b: 512 }),
  encrypt: function (plaintext) {
    const data = this.key.encrypt(plaintext, "base64");
    return data;
  },
  decrypt: function (ciphertext) {
    const data = this.key.decrypt(ciphertext, "utf8");
    return data;
  },
};

exports.ecc = {
  encryptAndDecrypt: function (plaintext) {
    let startDate = Date.now();
    let encryptTime, decryptTime, totalTime;
    var privateKeyB = eccrypto.generatePrivate();
    var publicKeyB = eccrypto.getPublic(privateKeyB);

    // Encrypting the message for B.
    eccrypto
      .encrypt(publicKeyB, Buffer.from(plaintext))
      .then(function (encrypted) {
        encryptTime = (Date.now() - startDate) / 1000;
        console.log("ENCRYPTTIME", encryptTime);
        let decryptStartDate = Date.now();
        eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
          // console.log("Message to part B:", plaintext.toString());
          decryptTime = (Date.now() - decryptStartDate) / 1000;
          console.log("DECRYPTTIME", decryptTime);
          totalTime = (Date.now() - startDate) / 1000;
          console.log("TOTAL TIME", totalTime);
        });
      });

    return {
      encryptTime,
      decryptTime,
      totalTime,
    };
  },
};
