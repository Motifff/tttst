let myTable;
let myMap;
let myGui;
let guiSystem;

function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}

function mousePressed() {
    for (let i = 0; i < 4; i++) {
        if (mouseX < myGui[i].pos[0] + 50 || mouseX > myGui[i].pos[0] - 50) {
            myGui[i].mode = !myGui[i].mode;
        }
    }
}

function mouseReleased(){
    for(let i=0;i<4;i++){
        myGui.tmper[i].mode=true;
    }
}

function theGui(){
    this.data=[];
    this.len=400
    this.born=function(){
        for(let i=0;i<4;i++){
            myGui[i]=new gui_s(width/2-this.len/2+i*this.len/4,400);
        }
    }
    this.show=function(){
        for(let i=0;i<4;i++){
            myGui[i].show();
        }
    }
}

function gui_s(_x, _y){
    this.pos=[_x,_y];
    this.mode=true;
    this.show=function(){
        switch(this.mode){
            case true:
                fill(200);
            case false:
                fill(100);
        }
        rect(this.pos[0],this.pos[1],100,100);
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
    myMap=new Array();
    myMap=myTable.getArray();
    theGui.
}

function draw() {
    background(200);
    ;

}
