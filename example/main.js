window.addEventListener("load", function () {

    var $$ = document.querySelectorAll.bind(document)
      , $ = document.querySelector.bind(document)
      , singleItem = $(".single-item")
      , emojiChars = $(".emoji-chars").innerHTML.split(",")
      ;

    var featured = $$(".wrapper .featured-icon")
      , featuredIconClick = function () {
            var self = this;
            self.classList.add("fadeOut");
            setTimeout(function() {
                self.setAttribute("class", "featured-icon ec " + emojiChars[Math.floor(Math.random() * emojiChars.length)]);
            }, 500);
        }
      ;

    featured[0].addEventListener("click", featuredIconClick);
    featured[1].addEventListener("click", featuredIconClick);
    featured[2].addEventListener("click", featuredIconClick);

    function checkHash() {
        if (location.hash) {
            var iconName = location.hash.substring(6)
              , elms = $$(".icon-list .ec.ec-" + iconName)
              , iconElm = elms[0]
              ;

            if (!iconElm) {
                return;
            }

            singleItem.querySelector(".title").innerHTML = ".ec-" + iconName;
            singleItem.querySelector(".icon").setAttribute("class", "icon ec ec-" + iconName);
            singleItem.querySelector("pre").innerHTML = "&lt;span class=\"ec ec-" + iconName + "\"&gt;&lt;/span&gt;";
            document.body.setAttribute("class", "single-view");
            return;
        }
        document.body.setAttribute("class", "list-view");
    }

    var itemElms = $$("[data-icon-name]")
      , iconsCache = {}
      ;

    for (var i = 0; i < itemElms.length; ++i) {
        var c = itemElms[i]
          , iconName = c.dataset.iconName.trim()
          , iconKeywords = c.dataset.keywords.split(",")
          ;

        iconKeywords.push(iconName);

        iconsCache[iconName] = { $: c, k: iconKeywords };
    }


    var $featuredWrapper = $("section.featured");
    var $titleWrapper = $("section.title");
    $(".search-input").addEventListener("input", function () {

        var search = this.value.trim()
          , names = Object.keys(iconsCache)
          ;

        if (search) {
            $featuredWrapper.classList.add("closed");
            $titleWrapper.classList.add("closed");
        } else {
            $featuredWrapper.classList.remove("closed");
            $titleWrapper.classList.remove("closed");
        }

        function check(cIcon, s) {
            var re = new RegExp(s);
            for (var i = 0; i < cIcon.k.length; ++i) {
                if (re.test(cIcon.k[i])) {
                    return true;
                }
            }
        }

        for (var i =0; i < names.length; ++i ) {
            var cName = names[i]
              , cIcon = iconsCache[cName]
              ;

            if (check(cIcon, search)) {
                cIcon.$.style.display = "inline-block";
            } else {
                cIcon.$.style.display = "none";
            }
        }
    });

    checkHash();
    window.addEventListener("hashchange", checkHash);
});
