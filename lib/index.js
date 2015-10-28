// Dependencies
var EmojiLib = require("emojilib")
  , IterateObject = require("iterate-object")
  ;

// Add the css codes
delete EmojiLib.keys;
IterateObject(EmojiLib, function (v, k) {
    v.code = Number(v.char.charCodeAt()).toString(16);
    v.css = "\\" + v.code;
});

module.exports = EmojiLib;
