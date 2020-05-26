let songLen=0;//total second!
let lyricLen=0;
let allLyrics=[];
let allLyricsInLine="";
let lyricPos=0;
let lyricsTime=[[],//begin time
                []];//end time
let mouseIsReleased=false;

//preload must be at the top of the program
function preload(){

    songLen=player.size();
    lyricLen=songLen*100;
}


function mouseReleased(){
    mouseIsReleased=true;
}

function popUp(){
    this.tmp=[];
    this.tmpSize=[];
    for(let i=0;i<4;i++){
        this.tmp[i]="NA";
    }
    for(let i=0;i<4;i++){
        this.tmpSize[i]=120;
    }
    this.update(T)=function{
        for(let i=0;i<4;i++){
            if(mouseY>400 && mouseY<560 && mouseX>220+160*i && mouseX<220+160*(i+1)) {
                if (mouseIsReleased) {
                    this.tmp[i]="NA"
                }
                if()
            }
        while(this.tmp.indexOf("NA")!==-1){
            this.tmp[this.tmp.indexOf("NA")]=allLyricsInLine[lyricPos];
            lyricPos+=1;
        }

    }
}


let mov=0;
function lyricLine() {
    this.tmp = new Array();
    this.lyricNum=0;
    this.update = function (T) {
        for (let i = 0; i < this.tmp.length; i++) {
            this.tmp[i].up();
            if (this.tmp[i].life === false) {
                this.tmp.slice(i);
            }
        }

        mov=T*100;
    }
}

function s_lyric(){
    this.trig=false;
    this.px=0;
    this.key="";
    this.siz=80;
    this.pos=0;
    this.life=true;
    this.fade=false;
    this.alpha=255;
    this.po=false;
    this.born=function(pos,key){
        this.pos=pos;
        this.key=key;
    }
    this.up=function(){
        if((this.pos-mov)>540-30 && (this.pos-mov)<540+30){
            this.siz=120;
            if(this.trig===true || this.po===true){
                this.size-=50;
                if(this.siz<0){
                    this.life=false
                }
            }
        }else if(this.siz>80 && this.po===false){
            this.siz=this.siz*0.9;
        }
        if((this.pos-mov)<540){
            this.fade=true;
            if((this.pos-mov)<100){
                this.life=false;
            }
            this.alpha-=5;
        }
        fill(0,0,0,this.alpha);
        rect(this.pos-mov,270,this.siz,this.siz,5,5,5,5);
        textSize(this.size);
        text(this.key,this.pos-mov,270);

    }
}

function countBoard(){
    this.score=0;
    this.update=function(){


    }
}

let myLyric;
//p5 drawing parts
function setup() {
    createCanvas(1080,720);
    myLyric=lyricLine();

}

function draw() {

}
