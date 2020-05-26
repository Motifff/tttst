let songLen=0;//total second!
let lyricLen=0;
let lyricPos=0;
let lyrics=[[],//begin time
            []];//end time
let mouseIsReleased=false;
let T;

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
        let nowP=0;
        for(let i=0;i<lyrics[0].length;i++){
            if(T>lyrics[1][i] && T<lyrics[1][i+1]){
                nowP=i;
                break;
            }
        }
        for(let i=0;i<4;i++){
            if(mouseX>220+i*160 && mouseX<380+i*160){
                if(mouseIsReleased){
                    for(let j=0;j<myLyric.tmp.length;j++){
                        if(abs(myLyric.tmp[j].pos/100-T)<10){
                            myLyric.tmp[j].trig=true;
                            if(abs(myLyric.tmp[j].pos/100-T)<8){

                            }
                        }
                    }
                    mouseIsReleased=false;
                }
            }
        }
        //auto fill


    }
}


let mov=0;
function lyricLine() {
    this.tmp = [];
    this.lyricNum=0;
    this.update = function (T) {
        for (let i = 0; i < this.tmp.length; i++) {
            this.tmp[i].up();
            if (this.tmp[i].life === false) {
                this.tmp.slice(i);
            }
        }
        while(this.tmp.length<=10){
            let a=s_lyric(lyrics[0][lyricPos],lyrics[1][lyricPos]);
            this.tmp.push(a);
        }

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
        this.pos=pos*100;
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
        fill(126,126,126,this.alpha);
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
    myPop=popUp();
    0
}

function draw() {
    mov=T*100;
}
