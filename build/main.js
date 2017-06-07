// Dependencies
const emoji = require("../lib")
    , Path = require("path")
    , IterateObject = require("iterate-object")
    , Absurd = require("absurd")
    , Logger = require("bug-killer")
    , escapeRegex = require("regex-escape")
    ;

// Constants
const DIST_PATH = Path.normalize(__dirname + "/../dist/emocss.min.css")
    , HTML_DIST_PATH = Path.normalize(__dirname + "/../index.html")
    ;

// Create the absurd instances
var cssDist = Absurd()
  , htmlDist = Absurd().morph("html")
  , items = []
  , htmlData = {
        head: {
            title: "emoji.css"
          , "meta[charset='UTF-8']": null
          , "link[rel='stylesheet' href='dist/emocss.min.css']": null
          , "link[rel='stylesheet' href='example/style.css']": null
          // TODO Make it mobile friendly one day
          //, "meta[name='viewport' content='width=device-width,initial-scale=1.0']": null
          , "script[src='example/main.js']": ""
        }
      , "body.list-view": {
            "div.hide.emoji-chars": Object.keys(emoji).map(x => emoji[x].className).join(",")
          , header: {
                ".wrapper": {
                    "a[href=/]": "emoji.css"
                  , "input.search-input[placeholder='Search icons' autofocus='autofocus']": null
                  , "a.right[href=https://github.com/IonicaBizau/emoji.css]": "See on GitHub"
                }
            }
          , "section.featured.hide-single-view": {
                ".wrapper": {
                    "span.featured-icon.ec.ec-rocket": ""
                  , "span.featured-icon.ec.ec-floppy-disk": ""
                  , "span.featured-icon.ec.ec-bell": ""
                }
            }
          , "section.title.hide-single-view": {
                ".wrapper": {
                    "p.description": "Your project. Emoji icons."
                  , "a.button.download[href=https://github.com/IonicaBizau/emoji.css']": "Download emoji.css"
                }
            }
          , "section.hide-single-view": {
                ".wrapper": {
                    "ul[class='icon-list']": items
                }
            }
          , "section.single-item.hide-list-view": {
                ".wrapper": {
                    "div.left-column": {
                        "p.icon": ""
                    }
                  , "div.right-column": {
                        "p.title": ".ec.ec-smile"
                      , "pre.html-example": ""
                      , "a.back[href='#'].button": {
                            "span.ec.ec-arrow-left": ""
                          , "span": " Back"
                        }
                    }
                }
            }
        }
    }
  ;

// Add general styles
cssDist.add({
    body: {
        marginTop: "20px",
        p: {
            color: "#000"
        }
    }
});

// Build the CSS file
IterateObject(emoji, (cIcon, name) => {
    var className = cIcon.className
      , cssIcon = {
            ["." + className + ":before"]: {
                content: "\"" + cIcon.char + "\"" // "\"" + cIcon.css + "\""
            }
        }
      , cItem = {
            ["li.item[data-keywords='" + cIcon.keywords.filter(x => !/:/g.test(x)).join(",") + "' data-icon-name='" + cIcon.name + "']"]: {
                ["a." + cIcon.prefix + "." + className
               + "[data-name='" + cIcon.name + "' href='#icon-" + cIcon.name + "']"
                ]: ""
            }
        }
      ;

    items.push(cItem);
    cssDist.add(cssIcon);
});

// Compile CSS
cssDist.compileFile(DIST_PATH, (err, css) => {
    if (err) {
        return Logger.log(err, "error");
    }
    Logger.log("Generated the css file.");
}, {
    //minify: true
});

// Compile HTML
htmlDist.add({
    html: htmlData
}).compileFile(HTML_DIST_PATH, function (err, c) {
    if (err) {
        return Logger.log(err, "error");
    }
    Logger.log("Generated the HTML file.");
});
