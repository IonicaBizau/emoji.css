// Dependencies
const emojiCss = require("../lib")
    , Path = require("path")
    , IterateObject = require("iterate-object")
    , Absurd = require("absurd")
    , Logger = require("bug-killer")
    , escapeRegex = require("regex-escape")
    ;

// Constants
const DIST_PATH = Path.normalize(__dirname + "/../dist/emoji.min.css")
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
          , "link[rel='stylesheet' href='dist/emoji.min.css']": null
          , "link[rel='stylesheet' href='example/style.css']": null
          , "script[src='example/main.js']": ""
        }
      , "body.list-view": {
            "div.hide.emoji-chars": Object.keys(emojiCss).map(x => emojiCss[x].className).join(",")
          , header: {
                ".wrapper": {
                    "a[href='https://ionicabizau.github.io/emoji.css/']": "emoji.css"
                  , "input.search-input[placeholder='Search...' autofocus='autofocus']": null
                  , "a.right[href=https://github.com/IonicaBizau/emoji.css]": "See on GitHub"
                }
            }
          , "section.featured.hide-single-view": {
                ".wrapper": {
                    "span.featured-icon.ec.ec-rocket": ""
                  , "span.featured-icon.ec.ec-sparkling-heart": ""
                  , "span.featured-icon.ec.ec-tada": ""
                }
            }
          , "section.title.hide-single-view": {
                ".wrapper": {
                    "p.description": "Your website. Emojified."
                  , "a.button.download[href=https://github.com/IonicaBizau/emoji.css']": "Download emoji.css"
                  , "pre": ("<!-- Or use the CDN -->\n" +
                            "<link rel='stylesheet' href='https://unpkg.com/emoji.css/dist/emoji.min.css'>\n" +
                            "...\n" +
                            "<span class='ec ec-sparkling-heart'></span>").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>")
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
    ".ec": {
        "font-family": "monospace",
        "color": "#000"
    }
});

// Build the CSS file
IterateObject(emojiCss, (cIcon, name) => {
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
    let content = fs.readFileSync(HTML_DIST_PATH, "utf-8")
    content = content.replace("stylesheet '", "stylesheet'");
    content = content.replace(/.css\n +'/, ".css'");
    content = content.replace("heart '", "heart'");
    fs.writeFileSync(HTML_DIST_PATH, content);
});
