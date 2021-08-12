/*
lista wojewodztw z odpowiadajacymi im miejscami w array coordinates i data:
0 - dolnoslaskie            4 - lodzkie         8 - podkarpackie        12 - swietokrzyskie
1 - kujawsko-pomorskie      5 - malopolskie     9 - podlaskie           13 - warminsko - mazurskie
2 - lubelskie               6 - mazowieckie     10 - pomorskie          14 - wielkopolskie
3 - lubuskie                7 - opolskie        11 - slaskie            15 - zachodnio - pomorskie
coordinates[i][0] = X
coordinates[i][1] = Y
data[i][0] = Transmissions
data[i][1] = Deaths
data[i][2] = Recovered
*/

var coordinates = [[169, 440], [317, 210], [640, 422], [85, 310], 
                   [390, 390], [450, 600], [515, 300], [270, 497], 
                   [590, 590], [620, 190], [290, 82], [355, 525], 
                   [490, 485], [480, 125], [220, 305], [110, 150]];

var data = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
            [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
            [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
            [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];


var ctx, ctxG;
var allowedDraw=false;

//funkcje odpowiedzialne za rysowanie tla
//zbite w jedna bo gdy dwie wpisane sa
//w onclick="" to nie dzialaja
function onLoad(){
    drawBackground();
    drawBackgroundG();
}

//funkcja odpowiedzialna za rysowanie tla dla plotna mapy
function drawBackground(){
    ctx = document.getElementById("area").getContext("2d");
    var map = document.getElementById("map");
    ctx.drawImage(map, 0, 0);
}

//funkcja odpowiedzialna za 
//rysowanie tla dla plotna wykresu
function drawBackgroundG(){
    ctxG = document.getElementById("graph").getContext("2d");
    var graph = document.getElementById("graphy");
    ctxG.drawImage(graph, 0, 0);
}

//funkcja odpowiedzialna za czyszczenie 
//mapy, wykresu i array "data"
//bez refreshowania strony
function clearData(){
    if (confirm("Na pewno chcesz usunąć dane?")){
        for(var i = 0; i < data.length; i++){
            data[i][0] = 0;
            data[i][1] = 0;
            data[i][2] = 0;
        }
        ctx.clearRect(0, 0, area.width, area.height);
        ctxG.clearRect(0, 0, graph.width, graph.height);
        onLoad();
        alert("Dane usunięte pomyślnie.");
    }
    else{
        alert("Anuluowano.");
    }
}

//funkcja odpowiedzialna za zapis danych do array "data"
function saveData(){
        //uaktywnia przycisk "rysuj"
        document.getElementById("DrawData").disabled = false; 

    var selectorProvince = document.getElementById("provinces").value;
    //leading zeros
    var tempDataTrans = parseInt(document.getElementById("inputTrans").value, 10);
    var tempDataDeath = parseInt(document.getElementById("inputDeath").value, 10);
    var tempDataRecovered = parseInt(document.getElementById("inputRecovered").value, 10);
    //max value
    if(tempDataTrans>25000 || tempDataDeath>25000 || tempDataRecovered>25000){
        alert("Maksymalne obsługiwane wartości to 25000.");
        document.getElementById("inputTrans").value = "";
        document.getElementById("inputDeath").value = "";
        document.getElementById("inputRecovered").value = "";
    }
    else{
        data[selectorProvince][0] = tempDataTrans;
        data[selectorProvince][1] = tempDataDeath;
        data[selectorProvince][2] = tempDataRecovered;
        document.getElementById("inputTrans").value = "";
        document.getElementById("inputDeath").value = "";
        document.getElementById("inputRecovered").value = "";
    }
}

//funkcje odpowiedzialne za rysowanie danych 
//na plotnach zbite w jedna
function draw(){
    drawData();
    drawGraphData();
}

//funkcja odpowiedzialna za rysowanie danych na mapie
function drawData(){
    ctx = document.getElementById("area").getContext("2d");
    //nadpisywanie danych
    ctx.clearRect(0, 0, area.width, area.height);
    drawBackground();
    for(var i=0; i < coordinates.length; i++){
        //pozyskiwanie danych z array "data"
        tempTrans = data[i][0];
        tempDeath = data[i][1];
        tempRecovered = data[i][2];
        //pozyskiwanie x,y z array "coordinates"
        tempCordX = coordinates[i][0];
        tempCordY = coordinates[i][1];
        //kalkulowanie koloru dla okregu
        var transcolor = Math.round(100*(tempTrans/195));
        if(transcolor>255){
            transcolor = 255;
            }
        transcolor = 255 - transcolor;
        ctx.fillStyle = "rgb(255,"+ transcolor +",0";
        //kalkulowanie promienia okregow
        var tempRadius = 30*(tempTrans/300);
        if(tempRadius > 40){
            tempRadius = 40;
        }
        //beginPath() zapobiega tworzeniu sie linii pomiedzy kolami
        ctx.beginPath();
            //+100 do Y wyniklo z przesuniecia calej mapy na potrzeby napisu
            ctx.arc(tempCordX, tempCordY+100, tempRadius, 0, 2*Math.PI);
        ctx.closePath()
        ctx.fill();
        //rysowanie ilosci zakazen
        if(tempTrans>0){
            ctx.fillStyle = "black";
            ctx.font = "30px Amiri";
            ctx.textAlign = "center";
            ctx.fillText(tempTrans, tempCordX, (tempCordY+100)-tempRadius-3);
        }
    }
}

//funkcja odpowiedzialna za rysowanie danych na wykresie
function drawGraphData(){
    ctxG = document.getElementById("graph").getContext("2d");
    //poprawne nadpisywanie danych
    ctxG.clearRect(0, 0, graph.width, graph.height);
    drawBackgroundG();
    for(var i = 0; i < coordinates.length; i++){
        //pozyskiwanie danych z array "data"
        var tempTrans = data[i][0];
        var tempDeath = data[i][1];
        var tempRecovered = data[i][2];
        //kalkulowanie dlugosci slupkow
        //50px = 100 w skali
        tempTrans = 50*(tempTrans/100);
        //ograniczamy wystawanie slupka poza skale
        if(tempTrans > 1000){
            tempTrans = 1015;
        }
        tempDeath = 50*(tempDeath/100);
        if(tempDeath > 1000){
            tempDeath = 1015;
        }
        tempRecovered = 50*(tempRecovered/100);
        if(tempRecovered > 1000){
            tempRecovered = 1015;
        }
        var tempCordX = 216;
        //kazde wojewodztwo na wykresie jest w rownej odleglosci od siebie
        //dodajac odpowiednia ilosc px kalkulujemy potrzebne Y
        var tempCordTransY = 51+(i*43)-10;
        var tempCordDeathY = 51+(i*43);
        var tempCordRecoveredY = 51+(i*43)+10;
        ctxG.beginPath();
            ctxG.fillStyle = "#FF1919";
            ctxG.fillRect(tempCordX, tempCordTransY, tempTrans, 7);
        ctxG.stroke();
        ctxG.beginPath();
            ctxG.fillStyle = "#191919";
            ctxG.fillRect(tempCordX, tempCordDeathY, tempDeath, 7);
        ctxG.stroke();
        ctxG.beginPath();
            ctxG.fillStyle = "#1919FF";
            ctxG.fillRect(tempCordX, tempCordRecoveredY, tempRecovered, 7);
        ctxG.stroke();
    }
}

//funkcja odpowiedzialna za aktywacje 
//przyciskow po wpisaniu danych
function activationButton(){
    if(document.getElementById("inputTrans").value != "" && document.getElementById("inputDeath").value != "" && document.getElementById("inputRecovered").value != "" ){
        document.getElementById("SaveData").disabled = false; 
    }
}

//funkcja odpowiedzialna za ujawnianie pol tekstowych
//po wybraniu wojewodztwa
function hiddenof(){
    document.getElementById("inp").style.visibility="visible";
    document.getElementById("inp2").style.visibility="visible";
    document.getElementById("inp3").style.visibility="visible";
}