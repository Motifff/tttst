let songLen=0;//total second!
let lyricLen=0;
let lyricPos=0;
let lyrics=[[],//begin time
            []];//end time
let mouseIsReleased=false;
let T;
let theTable;
let player;
let myTable;

//preload must be at the top of the program
function preload(){
    theTable=loadTable('data/xinhua.csv','csv','header');
    myTable=theTable.getArray();
    player=loadSound("");
    songLen=player.size();
    lyricLen=songLen*100;
}


function mouseReleased(){
    mouseIsReleased=true;
}

function search(a){
    for(let i=0;i<myTable.length;i++){
        if(a===myTable[0][i]){
            let b=myTable[1][i];
            return b;
        }
    }
}

function popUp(){
    this.tmp=[];
    this.tmpTime=[];
    this.tmpSize=[];
    this.tmpColor=[];
    for(let i=0;i<4;i++){
        let r=int(random(4));
        while(lyrics[0][i]===this.tmp[r]){
            r=int(random(4));
        }
        this.tmp[i]=lyrics[0][i];
        this.tmpTime[i]=lyrics[1][i];
        this.tmpColor[i]=0;
    }
    for(let i=0;i<4;i++){
        this.tmpSize[i]=120;
    }
    this.update=function(){
        let nowP=0;
        for(let i=0;i<lyrics[0].length-1;i++){
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
                                myBoard.scores.add(100);
                            }else{
                                myBoard.scores.add(80);
                            }
                            break;
                        }
                    }
                    mouseIsReleased=false;
                }
                this.tmpSize[i]=160;
            }
            if(this.tmpSize[i]>120){
                this.tmpSize[i]*=0.9;
            }
        }

        if(this.tmp[i].pos/100<520){
            this.tmp[i]=lyrics[0][nowP+4];
            this.tmpTime[i]=lyrics[1][nowP+4];
        }
    }
}


let mov=0;
function lyricLine() {
    this.tmp = [];
    this.lyricNum=0;
    this.update = function () {
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
        textSize(this.siz);
        text(this.key,this.pos-mov,270);

    }
}


function countBoard(){
    this.scores=[];
    this.num=0;
    this.update=function(){
        for(let i=0;i<this.scores.length;i++){
            if(this.scores[i].life===false){
                this.scores.slice(i);
            }
            this.scores[i].update();
        }
        beginShape();
        vertex(0,0);
        vertex(400,0);
        vertex(350,50);
        vertex(0,50);
        vertex(0,0);
        endShape();
    }
    this.add=function(score){
        let a=s_score(score);
        this.scores.add(a);
    }
}
function s_score(score){
    this.size=120;
    this.num=score;
    this.life=true;
    this.update=function(){
        if(this.size<180){
            textSize(this.size);
            fill(255,255,0);
            rect(540,400-this.size/5,this.size*1.5,this.size,this.size/100,this.size/100,this.size/100,this.size/100);
            text(this.num,540,400-this.size/5);
            this.size*=1.1;
        }else{
            this.life=false;
        }
    }
}

let myLyric;
let myPop;
let myBoard;
//p5 drawing parts
function setup() {
    createCanvas(1080,720);
    myLyric=lyricLine();
    myPop=popUp();
    myBoard=countBoard();
}

function draw() {
    mov=T*100;
    T=player.currentTime;
    myLyric.update();
    myPop.update();
    myBoard.update();
}
