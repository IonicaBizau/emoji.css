window.addEventListener("load", function () {

    var singleItem = document.querySelector(".single-item");

    function checkHash() {
        if (location.hash) {
            var iconName = location.hash.substring(6)
              , elms = document.querySelectorAll(".icon-list .ec.ec-" + iconName)
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

    checkHash();
    window.addEventListener("hashchange", checkHash);
});
