let myTable;
let myMap;
let guiSystem;
let wordMap;

function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}
//gui System below
function theGui(){
    this.data=[];
    this.len=400;
    this.tmper=[];
    this.born=function(){
        for(let i=0;i<4;i++){
            this.tmper[i]=new gui_s(width/2-200+i*100,600);
        }
    }
    this.show=function(){
        for(let i=0;i<4;i++){
            this.tmper[i].show();
        }
    }
}

function gui_s(_x, _y){
    this.pos=[_x,_y];
    this.mode=true;
    this.show=function(){
        if (this.mode==true) {
            fill(168,216,185);
        } else{
            fill(255);
        }
        rect(this.pos[0], this.pos[1], 100, 100);

    }
}

//character match and generate
function words() {
    this.len=8;
    this.maps=[];
    this.times=0;
    this.gen=function(){
        for(let i=0;i<2;i++){
            this.maps[i]=new Array();
            for(let j=0;j<4;j++) {
                let a = int(random(myMap.length));
                while (this.maps.indexOf(a) != -1) {
                    a = int(random(myMap.length));
                }
                this.maps[i][j]=a;
            }
        }
    }
    this.work=function(_b){
        if(this.maps[1][_b]=="NA") {
            let a = int(random(myMap.length));
            while (this.maps.indexOf(a) != -1) {
                a = int(random(myMap.length));
            }
            this.maps[0][_b] = a;
            let b = int(random(myMap.length));
            while (this.maps.indexOf(b) != -1) {
                b = int(random(myMap.length));
            }
            this.maps[1][_b] = b;
        }else{
            this.maps[0][_b]=this.maps[1][_b];
            this.maps[1][_b]="NA";
        }
        this.times+=1;
    }

    this.show=function(){
        for(let j=0;j<4;j++){
            textSize(50);
            fill(168,216,185);
            text(myMap[this.maps[0][j]][1],guiSystem.tmper[j].pos[0],guiSystem.tmper[j].pos[1])
        }
    }
}


function search(_a){
    for(let i=0;i<myMap.length;i++){
        if (_a==myMap[i][0]){
            return(myMap[i][1]);
        }
    }
    return("NA");
}

//mouse Actions
/*
function mouseAction(){
    if (mouseIsPressed){
        for(let i=0;i<4;i++){
            if(mouseX < guiSystem.tmper[i].pos[0] + 50 && mouseX > guiSystem.tmper[i].pos[0] - 50 && abs(mouseY-400)<100){
                guiSystem.tmper[i].mode=false;
                if(wordMap.times==0) {
                    wordMap.work(i);
                }
            }
        }
    } else{
        for(let i=0;i<4;i++){
            guiSystem.tmper[i].mode=true;
        }
        wordMap.times=0;
        return("no");
    }
}
*/

function mousePressed(){
    for(let i=0;i<4;i++){
        if(mouseX < guiSystem.tmper[i].pos[0] + 50 && mouseX > guiSystem.tmper[i].pos[0] - 50 && abs(mouseY-600)<100){
            guiSystem.tmper[i].mode=false;
            if(wordMap.times==0) {
                wordMap.work(i);
            }
        }
    }
}

function mouseReset(){
    for(let i=0;i<4;i++){
        guiSystem.tmper[i].mode=true;
    }
    wordMap.times=0;
    return("no");
}

//p5 drawing parts
function setup() {
    createCanvas(1080,720);
    fill(123, 0 , 0);
    textFont('Arial');
    rectMode(CENTER);
    myMap=new Array();
    myMap=myTable.getArray();
    guiSystem=new theGui();
    guiSystem.born();
    wordMap=new words();
    wordMap.gen();

}

function draw() {
    background(237,120,74);
    stroke(255);
    //mouseAction();
    guiSystem.show();
    wordMap.show();
    mouseReset();
}
