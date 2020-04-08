let myTable;
let myMap;

function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}

function setup() { 
    createCanvas(480, 130);
    textFont("Arial"); 
    fill(123, 0 , 0);
    myMap=myTable.getArray();
}
function draw() {
    background(255);  
    textSize(42);  
    text("Hello", 25, 60);
    textSize(26);  
    //text("World", 27, 90);
    let key= "信";
    for(var i=0;i<myMap.length;i++){
        if(key==myMap[i][0]){
            text(myMap[i][1],100,100);
        }
        print(map[i][1]);

    }
    print(key);
}
