let myTable;
let myMap;
let guiSystem;
let wordMap;
let songData;
let score=0;
let scene=0;

//preload must be at the top of the program
function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}

function dataManagement(){
    songData='老八秘制小汉堡是是是是是';
    //generate a long string list name as this.tmp
}

//gui System below
let guiY=600;
function theGui(){
    this.data=[];
    this.len=400;
    this.tmper=[];
    this.born=function(){
        for(let i=0;i<4;i++){
            this.tmper[i]=new gui_s(width/2-200+i*100,guiY);
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
    this.mappos=[];
    this.times=0;
    this.pointer=0;
    this.boxtmp=[];//we tmp a list of positions of boxes in order to make a fade FX
                   //the array should be like [][][][]>>>the single word's head
                                            //[][][][]>>>key
    this.tailLen=8;
    this.gen=function(){
        for(let i=0;i<2;i++){
            this.maps[i]=new Array();
            for(let j=0;j<4;j++) {
                //we tmp the numbers of the key instead of utf8 char in the xinhua.csv
                //[][][][]>>the position in the box means drop position
                let a=songData[i*4+j]
                this.maps[i][j]=a;
                let pos=int(random(4));
                if (i!=0 && j!=0){
                    while(this.mappos[0].indexOf(pos)!=-1){
                        pos=int(random(4));
                    }
                }else{
                    
                }
                if (i==0){
                    this.mappos.append(pos);
                }
            }
        }
        this.pointer+=8;
    }
    this.work=function(_b){
        if (abs(mouseY-guiY)<25){
            score[scene]+=5;
        }else{
            score[scene]+=2;
        }
        if (this.maps[1][_b]=="NA"){
            this.maps[1][_b]=songData[this.pointer+_b-1];
        }

        this.times+=1;//in order to manage one single touch not long press

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

function mouseReleased(){
    for(let i=0;i<4;i++){
        guiSystem.tmper[i].mode=true;
    }
    wordMap.times=0;
    return("no");
}

//p5 drawing parts
function setup() {
    createCanvas(windowWidth,windleHeight);
    fill(123, 0 , 0);
    textFont('Arial');
    frameRate(60);
    rectMode(CENTER);
    dataManagement();
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
    if (frameCount%2==0) {//limit updating to a specific time
        wordMap.update();//not defined yet
    }
    wordMap.show();
}
