window.addEventListener("load", function () {

    var $$ = document.querySelectorAll.bind(document)
      , $ = document.querySelector.bind(document)
      , singleItem = $(".single-item")
      ;

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

    $(".search-input").addEventListener("input", function () {
        var search = this.value
          , names = Object.keys(iconsCache)
          ;

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
