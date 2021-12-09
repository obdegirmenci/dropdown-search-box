function countryDataSelection() {
    var options = document.querySelectorAll(".div-lco");
    var optArr = Array.from(options);

    var collapse = document.getElementById("collapse");
    var searchbox = document.getElementById("search");
    var tempWord = searchbox.value;

    var firstOption = options[0];
    var lastOption = options[options.length - 1];
    var activeElem;

    console.log("//////////YENİ NODE//////////");
    console.log(options);
    console.log("/////////////////////////////");
    
    function getActive(getFocusedElem) {
        activeElem = document.activeElement;
        
        if (getFocusedElem === true) {
            return activeElem;
        } else {
            var focusedCont = activeElem.querySelector("p").textContent;
            var focusedId = activeElem.id;
            //searchbox.value = focusedCont;

            //console.log(activeElem);
            console.log("AKTİF ELEMENT: " + focusedId);
            console.log(focusedCont);
            
            console.log("SONRAKİ ELEMENT: " + activeElem.nextElementSibling.id);
            console.log("ÖNCEKİ ELEMENT: " + activeElem.previousElementSibling.id);
        }
    }

    // Kaç taneyse ona göre şeyap
    for (i = 0; i < options.length; i++) {

        // FARE  YAKALA - ülkeler (focus)
        options[i].onmouseenter = function (e) {
            //console.log(e.target.id);
            this.focus();
            console.log( optArr.findIndex( optArr => optArr.id === e.target.id ) );
        }

        // arızalı yer
        options[i].addEventListener("focus", getActive);
        options[i].addEventListener("click", updateSearchBox);
        options[i].addEventListener("click", optionsClick);

        // FARE YAKALA - ülkeler (click)
        function optionsClick(e) {
            console.log(this);

            // gerek kalmadı diğer yerle tıklayınca kapanıyor
            //collapse.innerHTML = "";
            searchbox.focus();
            makeSearch();
        }

        // KLAVYE YAKALA - ülkeler
        options[i].addEventListener("keydown", function (event) {
            
            //console.log(event.code); 
            
            if (event.code === "ArrowDown") {
                logKey(event.code);
                console.log(event.code);
            } else if (event.code === "ArrowUp") {
                logKey(event.code);
                console.log(event.code);
            } else if (event.code === "Tab") {
                event.preventDefault();
                console.log(event.code + " ENGELLENDİ");
            } else if (event.code === "Enter") {
                activeElem.click();
                makeSearch();
                console.log(event.code + " ONAYLANDI");
            } else if (event.code === "Escape") {
                collapse.innerHTML = "";
                searchbox.focus();
                updateSearchBox(true);
                activeElem = undefined;
                console.log(event.code + "  SEÇİM İPTAL");
            }
            
        });
    }

    // KLAVYE YAKALA - arama kutusu
    searchbox.addEventListener("keydown", function (event) {
        if (event.code === "ArrowDown") {
            firstOption.focus();
            updateSearchBox();
            console.log(event.code);
        } else if (event.code === "ArrowUp") {
            lastOption.focus();
            updateSearchBox();
            console.log(event.code);
        } else if (event.code === "Tab") {
            event.preventDefault();
            console.log(event.code + " ENGELLENDİ");
        } else if (event.code === "Enter") {
            collapse.innerHTML = "";
            makeSearch();
            console.log(event.code + "  ONAYLANDI");
        } else if (event.code === "Escape") {
            collapse.innerHTML = "";
            console.log(event.code + "  SEÇİM İPTAL");
        }

    });
    
    // Liste sonları
    
    // last-focus-block tabindex ayarla
    document.getElementById("last-focus-block").tabIndex = lastOption.tabIndex+1;
    
    // Aşağıya gidersen
    // Liste sonundan liste başına...
    if (optArr.length > 1) {
        document.getElementById("last-focus-block").addEventListener("focus", function () { firstOption.focus(); });
    } else {
        document.getElementById("last-focus-block").addEventListener("focus", function () { searchbox.focus(); });
    }
    
    // Yukarı çıkarsan
    // Arama kutusundan liste sonuna...
    document.getElementById("first-focus-block").addEventListener("focus", function () { lastOption.focus(); });
    
    // Yukarı çıkarsan
    // Liste başından arama kutusuna...
    document.getElementById("middle-focus-block").addEventListener("focus", function () {
        searchbox.focus();
        
        //buradan olmaz focus üstüne yazıyor
        //searchbox.value = "asdasdsasd";

        console.log( searchbox.value );
    });

    // Başka yere tıklarsa
    var clickCheck = function(e) {
        //console.log(e.target.id + " " + e.target.nodeName);

        // Bunlar serbest
        var allowed = ["a1", "a2", "a3", "search"];

        // Her tıkladığın ne?
        if ( allowed.includes(e.target.id) === false ) {
            collapse.innerHTML = "";
            console.log("BU DEĞİL " + e.target.id );
            document.body.removeEventListener("click", clickCheck);
        } else {
            console.log("İŞTE BU " + e.target.id );
        }
    }

    document.body.addEventListener("click", clickCheck );

    // KLAVYEDEN Önce/Sonra Elemente Focus Uygula
    function logKey(key) {
        var focusedElem = getActive(true);
        var nextElem = focusedElem.nextElementSibling;
        var preElem = focusedElem.previousElementSibling;

        if (key === "ArrowDown") {
            nextElem.focus();             
            updateSearchBox();
        } else {
            if(focusedElem == firstOption) {
                preElem.focus();
                updateSearchBox(true);
            } else {
                preElem.focus();
                updateSearchBox();
            }
        }
    }

    // Yazı klavyeden değişsin
    function updateSearchBox(reset){
        if (activeElem !== undefined) {
            if (reset === true) {
                searchbox.value = tempWord;
            } else {
                searchbox.value = activeElem.querySelector("p").textContent;
            }
        } else {
            console.log("ilk sonuç gelmedi");
        }
    }

    // Mesela aratmışım...
    function makeSearch() {
        searchbox.style.animation = "searching 0.4s linear";
            searchbox.addEventListener('animationend', () => {
                searchbox.style.animation = "";
        });
    }
    
}