// Functions

// checks to make sure password length input is correctly formatted and a length of 8 or higher
function checkLength(length) {
  if (isNaN(length)) {
    window.alert("Error: Please type in a number as a numeral, not spelled out.")
    var goodLength = false;
  } else if (length < 8 || length >128) {
    window.alert("Error: Password must have between 8 and 128 characters.")
    var goodLength = false;
  } else {
    var goodLength = true;
  }
  return goodLength;
}

// filters out password characters based on user preferences
function filterChars(specs, pool) {

  var ent = Object.entries(specs)
  var filt = ent.filter(([key, value]) => value == false)
  falseSpecs = Object.fromEntries(filt);
  falseKeys = Object.keys(falseSpecs);

  for (i = 0; i < falseKeys.length; i++) {
    delete (pool[falseKeys[i]]);
  }
  return pool
}

function generateChar(pool, remove) {
  var poolSize = pool.length;
  var ind = Math.floor(Math.random() * poolSize);
  var randChar = pool[ind];
  if (remove) {
    pool.splice(ind, 1);
    out = {
      myChar: randChar,
      remainingPool: pool
    }
    return out
  } else {
    return randChar
  }
}

// remove keys that are false
function makePasswordPool(passCharSpecs, charPool) {
  var ent = Object.entries(passCharSpecs)
  var filt = ent.filter(([key, value]) => value == false)
  falseSpecs = Object.fromEntries(filt);
  falseKeys = Object.keys(falseSpecs);
  
  for (i = 0; i < falseKeys.length; i++) {
    delete (charPool[falseKeys[i]]);
  }
  
  var passPool = filterChars(passCharSpecs, charPool);
  return passPool
  }

function getPassword(passPool, length) {
  var keys = Object.keys(passPool);
  var i = 0;
  var passCharacters;

  for (i = 0; i < keys.length; i++) {
    var key = keys[i];
    chars = passPool[key];

    // adding at least one element from each character pool type
    randId = Math.floor(Math.random() * chars.length)

    if (i == 0) {
      potentialCharacters = chars;
      passCharacters = [chars[randId]]
    } else {
      // adds potential characters to draw from from all user-designated character types
      potentialCharacters = potentialCharacters.concat(chars);
      passCharacters.push(chars[randId])
    }
  }
  console.log("character pool for password:" + potentialCharacters)

  // randomly select remaining characters
  var remainChar = length - passCharacters.length;

  for (i = 0; i < remainChar; i++) {
    passCharacters.push(generateChar(potentialCharacters, false))
  }

  // scramble order of password characters
  var passArray = [];
  const passLen = passCharacters.length;
  var passCharactersLeft = passCharacters;
  for (i = 0; i < passLen; i++) {
    passObj = generateChar(passCharactersLeft, true);
    passArray.push(passObj.myChar);
    passCharactersLeft = passObj.remainingPool;
  }

  myPass = passArray.join('');
  return myPass
}

function writePassword(passPool, length) {
  var password = getPassword(passPool, length);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  return password
}

function generatePassword() {
// ensures password length is good before moving on
do {
  var responseLength = Number(window.prompt("How long would you like your password to be? (At least 8 characters). Enter desired length in digit form (ex: 10)"));
  console.log("length = " + responseLength)
  goodLength = checkLength(responseLength)
  console.log(goodLength)
} while (goodLength == false);

console.log("password length looks good - length = " + responseLength);

passwordCharSpecs = {
  uppercase: window.confirm("Would you like uppercase letters?/Press 'OK' for yes or 'Cancel' for no"),
  lowercase: window.confirm("Would you like lowercase letters?/Press 'OK' for yes or 'Cancel' for no"),
  specialCharacters: window.confirm("Would you like special characters?/Press 'OK' for yes or 'Cancel' for no"),
  numbers: window.confirm("Would you like numbers?/Press 'OK' for yes or 'Cancel' for no"),
}

// add an error code and restart script if all answers are false
console.log("password character types: " + passwordCharSpecs)

characterPool = {
  uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  lowercase: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  specialCharacters: ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
}

passwordPool = makePasswordPool(passwordCharSpecs, characterPool)

// arranges and writes password to webpage
var yourPassword = writePassword(passwordPool, responseLength);
console.log("This is your password: " + yourPassword)
}



// Get references to the #generate element
// var generateBtn = document.querySelector("#generate");
// console.log(generateBtn)

// selecting password specs
// inputs: password length (at least 8), lowercase, uppercase, numeric, special characters






// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
