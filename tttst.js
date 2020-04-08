let myTable;
let myMap;

function preload(){
     myTable=loadTable('data/xinhua.csv','csv','header');
}

function setup() { 
    createCanvas(480, 480);
    fill(123, 0 , 0);
    textFont('Arial');
    myMap=new Array();
    myMap=myTable.getArray();
}
function draw() {
    background(200);
    textSize(42);  
    text("Hello", 25, 60);
    textSize(26);  
    //text("World", 27, 90);
    let key= "信";
    print(myMap.length);
    for(var i=0;i<myMap.length;i++){
        if(key==myMap[i][0]) {
            text(myMap[i][1], 100, 300);
            print('ok');
            print(i);
        }

    }
    text("中文",300,100);
    text(myMap.length,100,100);
    text(myMap[100][0].toString(),200,100);
}
