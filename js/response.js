var divIndex = 0;

var addCountry = () => {
    clean();
    createResponse();
    countryDataSelection();
}

var replaceCountry = () => {
    clean(true);
    createResponse();
    countryDataSelection();
}

var destroyCountry = () => {
    clean();
    document.getElementById("search").value = "";
    divIndex = 0;
}

// Butonlara basarsan üretecek
document.getElementById("a1").addEventListener("click", addCountry);
document.getElementById("a2").addEventListener("click", replaceCountry);
document.getElementById("a3").addEventListener("click", destroyCountry);

// Yazdıkça üretecek
document.getElementById("search").addEventListener("input", addCountry);
// İçinde yazı varken tıklarsan üretecek
document.getElementById("search").addEventListener("click", function(e) { if(e.target.value) { addCountry() } } );

function createResponse() { 
    var block1 = ( `
        <div id="middle-focus-block" tabindex="3"></div>
    ` );
    var block2 = ( `
        <div id="last-focus-block" tabindex="4"></div> 
    ` );
    document.getElementById("collapse").insertAdjacentHTML("afterbegin", block1 );
    document.getElementById("collapse").insertAdjacentHTML("beforeend", block2 );
    
    for (i = 0; i < /*1*/ randomInt(1,6) ; i++) {
        divIndex = divIndex+1;
        var response = ( `
        <div id="cfield${divIndex}" class="div-lco" tabindex="${divIndex+3}">
            <img id="cflag${divIndex}" class="img-cf" src="flags/Germany.png" width="32" height="32" alt="" longdesc="Germany" />
            <p id="ctext${divIndex}" class="p-ct">Country ${divIndex}</p>
            </div>
            ` );
            document.getElementById("last-focus-block").insertAdjacentHTML("beforebegin", response );
        }
    }

// Eski düğümleri siler ya da düğümleri günceller
function clean(replace) {
    var list = document.getElementById("collapse");
    //var newlist = list.innerHTML;

    var arr = Array.from(list.children);

    // container yerine collapse divine geçildi ilk 2 elementi (block, input) devre dışı bırakmaya gerek kalmadı o problem çözüldü
    //var newlist = arr.slice(2,arr.length-1);
    var newlist = arr.slice(1,arr.length-1);

    console.log("//////////ESKİ NODE//////////");
    console.log(newlist);
    console.log("/////////////////////////////");

    if (list.childElementCount > 2) {
        /*var options = document.querySelectorAll(".div-lco");*/
        //var options = arr;
        
        /*
        for (i = 0; i < options.length; i++) {
            list.removeChild(options[i]);
        }
        */
       
        list.innerHTML = "";
        
        // Yeniler üzerine eklenmeden önce eskileri tekrar yapıştır
        if (replace === true) {
            
            newlist.forEach(e => list.appendChild(e) );
            list.innerHTML = list.innerHTML;
            
        } else {
            console.log("ESKİ NODE GETTÜÜÜÜ") ;
        }
                
    } else {
        //alert("yetersiz");
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}