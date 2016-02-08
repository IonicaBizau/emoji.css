// Dependencies
const EmojiLib = require("emojilib")
    , IterateObject = require("iterate-object")
    , stringLength = require("string-length")
    ;

const CLASS_PREFIX = "ec";

// Add the css codes
IterateObject(EmojiLib.lib, (v, k) => {
    if (!v.char || stringLength(v.char) !== 1) {
        delete EmojiLib.lib[k];
        return;
    }

    v.name = k;
    v.name = v.name
                .replace(/\+/g, "plus")
                .replace(/\_/g, "-")
                .trim()
                ;

    v.className = CLASS_PREFIX + "-" + v.name;
    v.className = v.className

    v.prefix = CLASS_PREFIX;
    v.code = Number(v.char.charCodeAt()).toString(16);
    v.css = "\\" + v.code;
});

module.exports = EmojiLib.lib
