function csengetes(){
    let kezdora = parseInt(document.getElementById("kezdora").value);
    let kezdperc = parseInt(document.getElementById("kezdperc").value);
    let orahossz = parseInt(document.getElementById("orahossz").value);
    let atlagszunet = parseInt(document.getElementById("atlagszunet").value);
    let nagyszunet = parseInt(document.getElementById("nagyszunet").value);
    let nagyido = parseInt(document.getElementById("nagyido").value);

    if (isNaN(kezdora) || isNaN(kezdperc) || isNaN(orahossz) || isNaN(atlagszunet) || isNaN(nagyszunet) || isNaN(nagyido)) {
        alert("Kérlek töltsd ki az összes mezőt!");
        return;
    }
    if (kezdora > 24|| kezdperc > 60 || orahossz > 60|| atlagszunet > 60|| nagyszunet > 60){
        alert("Valós értékeket adj meg!")
        return;
    }
    function idoFormat(ora, perc) {
        return (ora < 10 ? "0" + ora : ora) + ":" + (perc < 10 ? "0" + perc : perc);
    }

    function hozzaadPercet(ora, perc, mennyi) {
        perc += mennyi;
        while (perc >= 60) {
            perc -= 60;
            ora++;
        }
        ora = ora % 24;
        return [ora, perc];
    }


    let sorok = document.querySelectorAll("table tr");
    for (let i = 1; i < sorok.length; i++) {
        sorok[i].children[0].innerText = "";
        sorok[i].children[1].innerText = "";
        sorok[i].children[2].innerText = "";
    }

    let aktualisOra = kezdora;
    let aktualisPerc = kezdperc;

    for (let i = 1; i <= 8; i++) {
        let oraKezdete = idoFormat(aktualisOra, aktualisPerc);
        [aktualisOra, aktualisPerc] = hozzaadPercet(aktualisOra, aktualisPerc, orahossz);
        let oraVege = idoFormat(aktualisOra, aktualisPerc);

        sorok[i].children[0].innerText = i + ". óra";
        sorok[i].children[1].innerText = oraKezdete + " - " + oraVege;
        sorok[i].children[2].innerText = orahossz + " perc";

        if (i === nagyido) {
            [aktualisOra, aktualisPerc] = hozzaadPercet(aktualisOra, aktualisPerc, nagyszunet);
        } else if (i < 8) {
            [aktualisOra, aktualisPerc] = hozzaadPercet(aktualisOra, aktualisPerc, atlagszunet);
        }
    }
}