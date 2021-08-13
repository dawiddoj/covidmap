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

function onLoad(){
    drawBackground();
    drawBackgroundG();
}

//Map background drawing
function drawBackground(){
    ctx = document.getElementById("area").getContext("2d");
    var map = document.getElementById("map");
    ctx.drawImage(map, 0, 0);
}

//Graph background drawing
function drawBackgroundG(){
    ctxG = document.getElementById("graph").getContext("2d");
    var graph = document.getElementById("graphy");
    ctxG.drawImage(graph, 0, 0);
}

//Function clearing data from array, map and graph
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

//Function that saves data to array
function saveData(){
        document.getElementById("DrawData").disabled = false; 

    var selectorProvince = document.getElementById("provinces").value;
    var tempDataTrans = parseInt(document.getElementById("inputTrans").value, 10);
    var tempDataDeath = parseInt(document.getElementById("inputDeath").value, 10);
    var tempDataRecovered = parseInt(document.getElementById("inputRecovered").value, 10);
    //Max value
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

//Draw button affects map and graph
function draw(){
    drawData();
    drawGraphData();
}

//Map draw function
function drawData(){
    ctx = document.getElementById("area").getContext("2d");
    ctx.clearRect(0, 0, area.width, area.height);
    drawBackground();
    for(var i=0; i < coordinates.length; i++){
        //Obtaining data to temp variables
        tempTrans = data[i][0];
        tempDeath = data[i][1];
        tempRecovered = data[i][2];
        tempCordX = coordinates[i][0];
        tempCordY = coordinates[i][1];
        //Calculating colour
        var transcolor = Math.round(100*(tempTrans/195));
        if(transcolor>255){
            transcolor = 255;
            }
        transcolor = 255 - transcolor;
        ctx.fillStyle = "rgb(255,"+ transcolor +",0";
        //Calculating radius
        var tempRadius = 30*(tempTrans/300);
        if(tempRadius > 40){
            tempRadius = 40;
        }
        //beginPath() hotfix that stops drawing lines between circles
        ctx.beginPath();
            //+100, because map graphic changed
            ctx.arc(tempCordX, tempCordY+100, tempRadius, 0, 2*Math.PI);
        ctx.closePath()
        ctx.fill();
        //Drawing number on top of the circle
        if(tempTrans>0){
            ctx.fillStyle = "black";
            ctx.font = "30px Amiri";
            ctx.textAlign = "center";
            ctx.fillText(tempTrans, tempCordX, (tempCordY+100)-tempRadius-3);
        }
    }
}

//Graph draw function
function drawGraphData(){
    ctxG = document.getElementById("graph").getContext("2d");
    ctxG.clearRect(0, 0, graph.width, graph.height);
    drawBackgroundG();
    for(var i = 0; i < coordinates.length; i++){
        //Obtaining data to temp variables
        var tempTrans = data[i][0];
        var tempDeath = data[i][1];
        var tempRecovered = data[i][2];
        //Calculating length
        //50px = 100
        tempTrans = 50*(tempTrans/100);
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
        //Calculating coordinates
        var tempCordTransY = 51+(i*43)-10;
        var tempCordDeathY = 51+(i*43);
        var tempCordRecoveredY = 51+(i*43)+10;
        //Drawing bars
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

//Buttons activation
function activationButton(){
    if(document.getElementById("inputTrans").value != "" && document.getElementById("inputDeath").value != "" && document.getElementById("inputRecovered").value != "" ){
        document.getElementById("SaveData").disabled = false; 
    }
}

//Input windows activation
function hiddenof(){
    document.getElementById("inp").style.visibility="visible";
    document.getElementById("inp2").style.visibility="visible";
    document.getElementById("inp3").style.visibility="visible";
}