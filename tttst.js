let myTable;
let myMap;
let guiSystem;

function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}

function theGui(){
    this.data=[];
    this.len=400;
    this.tmper=[];
    this.born=function(){
        for(let i=0;i<4;i++){
            this.tmper[i]=new gui_s(width/2-(i-2)*this.len/4,400);
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
            fill(0);
        } else{
            fill(255);
        }
        rect(this.pos[0], this.pos[1], 100, 100);

    }
}

function search(a){
    for(let i=0;i<myMap.length;i++){
        if (a==myMap[i][0]){
            return(myMap[i][1]);
        }
    }
    return("NA");
}


function setup() {
    createCanvas(windowWidth,windowHeight);
    fill(123, 0 , 0);
    textFont('Arial');
    rectMode(CENTER);
    ellipseMode(CENTER);
    myMap=new Array();
    myMap=myTable.getArray();
    guiSystem=new theGui();
    guiSystem.born();

}

function draw() {
    background(200);
    stroke(255);
    if (mouseIsPressed){
        for(let i=0;i<4;i++){
            if(mouseX < guiSystem.tmper[i].pos[0] + 50 && mouseX > guiSystem.tmper[i].pos[0] - 50 && abs(mouseY-400)<100){
                guiSystem.tmper[i].mode=false;
                ellipse(guiSystem.tmper[i].pos[0],100,100,100);
            }
        }
    } else{
        for(let i=0;i<4;i++){
            guiSystem.tmper[i].mode=true;
        }
    }
    print(guiSystem.tmper[1]);
    guiSystem.show();

}
