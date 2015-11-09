// Dependencies
const EmojiLib = require("emojilib")
  , IterateObject = require("iterate-object")
  ;

const CLASS_PREFIX = "ec";

// Add the css codes
delete EmojiLib.keys;
IterateObject(EmojiLib, (v, k) => {
    if (!v.char) {
        delete EmojiLib[k];
        return;
    }

    v.name = k;
    v.name = v.name
                .replace(/\+/g, "plus")
                .replace(/\_/g, "-")
                ;

    v.className = CLASS_PREFIX + "-" + v.name;
    v.className = v.className

    v.prefix = CLASS_PREFIX;
    v.code = Number(v.char.charCodeAt()).toString(16);
    v.css = "\\" + v.code;
});

module.exports = EmojiLib;
