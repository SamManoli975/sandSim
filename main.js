const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener("click", getClickPosition, false)


const h = window.innerHeight;
const w = window.innerWidth;

const boxSize = 40; // Adjust the size of each box as needed
canvas.width = w;
canvas.height = h;

// Calculate the number of rows and columns
const row = Math.floor(h / boxSize);
const col = Math.floor(w / boxSize);

const arr = [];

for(let i=0;i<row;i++){
    arr[i] = [];
        for(let j=0;j<col;j++){
            arr[i][j] = 0;
            // arr[i][j] = "#E63E1A";


    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background color
    ctx.fillStyle = "#DCDCDC"; // light gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw the boxes
    for(let i=0;i<row;i++){
        for(let j=0;j<col;j++){
            ctx.strokeStyle = "black";
            ctx.strokeRect(j * boxSize, i * boxSize, boxSize, boxSize);
        }
    }
}
function changecolor(row,col,color){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(row*40+1,col*40+1,boxSize-2,boxSize-2);
}
//get the position of the click in the canvas
function getClickPosition(e){
    var rect = canvas.getBoundingClientRect(); // Get the position of the canvas relative to the window
    var xPosition = e.clientX - rect.left; // Calculate the x position relative to the canvas
    var yPosition = e.clientY - rect.top; // Calculate the y position relative to the canvas
    console.log(xPosition,yPosition);//debug
    //call the function to change the color of the clicked
    changecolor(Math.floor(xPosition/40),Math.floor(yPosition/40),"#000000");
    console.log(Math.floor(xPosition/40),Math.floor(yPosition/40));
}
draw();
changecolor();