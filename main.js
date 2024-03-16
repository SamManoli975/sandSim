const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener("click", getClickPosition, false)


const h =500;
const w =500;

const boxSize = 25; // Adjust the size of each box as needed
canvas.width = w;
canvas.height = h;

// Calculate the number of row and columns
const row = Math.ceil(h / boxSize);
const col = Math.ceil(w / boxSize);
arr = Make2Darray(row,col);
console.log(w,h,row,col)

function Make2Darray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      // Fill the array with 0s
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background color
    ctx.fillStyle = "#DCDCDC"; // light gray
    ctx.fillRect(0, 0, w, h);

    // Draw the boxes
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 1) {
                ctx.fillStyle = "#000000"; // black
            } else {
                ctx.fillStyle = "#FFFFFF"; // white
            }
            ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize);
            ctx.strokeStyle = "black";
            ctx.strokeRect(j * boxSize, i * boxSize, boxSize, boxSize);
        }
    }
}

function changecolor(row, col, color) {
    
    arr[col][row] = 1;
    ctx.fillStyle = color;
    ctx.fillRect(row * boxSize + 1, col * boxSize + 1, boxSize - 2, boxSize - 2);
    
}


    
//get the position of the click in the canvas
function getClickPosition(e){

    var xPosition = e.clientX // Calculate the x position relative to the canvas
    var yPosition = e.clientY// Calculate the y position relative to the canvas
    console.log(xPosition,yPosition);//debug
    //call the function to change the color of the clicked
    changecolor(Math.floor(xPosition/boxSize),Math.floor(yPosition/boxSize),"#000000");
    console.log(Math.floor(xPosition/boxSize),Math.floor(yPosition/boxSize));
}


function fall() {
    let nextGrid = Make2Darray(row, col);
    
    // Check every cell
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col ; j++) {
            // What is the state?
            let state = arr[i][j];
            console.log(state);
            // If it's a piece of sand!
            if (state === 1) {
                // What is below?
                let belowRow = i + 1;
                if (belowRow < row && arr[belowRow][j] === 0) {
                    nextGrid[belowRow][j] = 1;
                // Stay put!
                } else {
                    nextGrid[i][j] = 1;
                }
            }
        }
    }
    arr = nextGrid;
    draw();
}
// fall();
setInterval(fall,100);
