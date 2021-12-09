function countryDataSelection() {
    var options = document.querySelectorAll(".div-lco");
    var optArr = Array.from(options);

    var firstOption = options[0];
    var lastOption = options[options.length - 1];

    console.log("//////////YENİ NODE//////////");
    console.log(options);
    console.log("/////////////////////////////");
    
    function getActive(getFocusedElem) {
        var activeElem = document.activeElement;

        if (getFocusedElem === true) {
            return activeElem;
        } else {
            var focusedId = activeElem.id;
            var focusedCont = activeElem.querySelector("p").textContent;

            document.getElementById("search").value = focusedCont;

            //console.log(activeElem);
            console.log("AKTİF ELEMENT: " + focusedId);
            console.log(focusedCont);
            
            console.log("SONRAKİ ELEMENT: " + activeElem.nextElementSibling.id);
            console.log("ÖNCEKİ ELEMENT: " + activeElem.previousElementSibling.id);
        }
    }

    // Kaç taneyse ona göre şeyap
    for (i = 0; i < options.length; i++) {

        // FAREDEN YAKALA
        options[i].onmouseenter = function (e) {
            //console.log(e.target.id);
            this.focus();

            
            // Ne geliyor?

            //object
            //console.log( "fareden gelen tip: " + typeof( e.target ) );

            //object
            //console.log( "querySelector tipi: " + typeof( options) );

            //object
            //console.log( "querySelector item tipi: " + typeof( options[1] ) );
            //console.log( options[0].id );

            //object
            //console.log( "array tipi: " + typeof( optArr ) );

            //object
            //console.log( "array item tipi: " + typeof( optArr[1] ) );
            //console.log( optArr[0].id );
            
            /*

            Direkt OBJECT karşılaştıramıyor. ID veya başka belirleyici anahtar kullanmamız lazım. Onu da sadece ARRAY ile yapıyor.

            */

            // Bu zıkkım böyle olmuyor.
            //console.log( options.findIndex( options => options.id === e.target.id ) );

            console.log( optArr.findIndex( optArr => optArr.id === e.target.id ) );
        }

        // arızalı yer
        options[i].addEventListener("focus", getActive);

        // KLAVYE YAKALA - ülkeler
        options[i].addEventListener("keydown", function (event) {
            //console.log(event.code); 
            if (event.code === "ArrowDown") {
                logKey("down");
                console.log(event.code);
            } else if (event.code === "ArrowUp") {
                logKey("up");
                console.log(event.code);
            } else if (event.code === "Tab") {
                console.log(event.code + " ENGELLENDİ");
                event.preventDefault();
            }
        });
    }

    // KLAVYE YAKALA - arama
    document.getElementById("search").addEventListener("keydown", function (event) {
        if (event.code === "ArrowDown") {
            firstOption.focus();
            console.log(event.code);
        } else if (event.code === "ArrowUp") {
            lastOption.focus();
            console.log(event.code);
        } else if (event.code === "Tab") {
            console.log(event.code + " ENGELLENDİ");
            event.preventDefault();
        }
    });

    // Liste sonları
    // Aşağıya gidersen
    // Liste sonundan liste başına...
    document.getElementById("last-focus-block").addEventListener("focus", function () { firstOption.focus(); });
    // Yukarı çıkarsan
    // Arama kutusundan liste sonuna...
    document.getElementById("first-focus-block").addEventListener("focus", function () { lastOption.focus(); });

    // KlAVYEDEN Uygula
    function logKey(event) {
        var focusedElem = getActive(true);
        var nextElem = focusedElem.nextElementSibling;
        var preElem = focusedElem.previousElementSibling;

        event === "down" ? nextElem.focus() : preElem.focus();
    }
    
}