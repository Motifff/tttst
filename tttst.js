let table;
let map;

function preload(){
     table=loadTable('data/xinhua.csv','csv','header');
}

function setup() { 
    createCanvas(480, 130);
    textFont("Arial"); 
    fill(123, 0 , 0);
    for(let i=0;i<table.getRowCount();i++){
        let a=table[i].getString("word");
        let b=table[i].getString('part');
        map.push(a,b);
    }

}
function draw() {
    background(255);  
    textSize(42);  
    text("Hello", 25, 60);
    textSize(26);  
    text("World", 27, 90)

}
