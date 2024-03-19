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

function within(index) {
    return index >= 0 && index < col;
}

function changecolor(row, col, color) {
    
    arr[col][row] = 1;
    ctx.fillStyle = color;
    ctx.fillRect(row * boxSize + 1, col * boxSize + 1, boxSize - 2, boxSize - 2);
    
}


    
let isMouseDown = false;

canvas.addEventListener("mousedown", function(e) {
    isMouseDown = true;
    getClickPosition(e);
});

canvas.addEventListener("mousemove", function(e) {
    if (isMouseDown) {
        getClickPosition(e);
    }
});

canvas.addEventListener("mouseup", function() {
    isMouseDown = false;
});

function getClickPosition(e){
    var xPosition = e.clientX; // Calculate the x position relative to the canvas
    var yPosition = e.clientY; // Calculate the y position relative to the canvas
    console.log(xPosition,yPosition); // Debug
    // Call the function to change the color of the clicked
    changecolor(Math.floor(xPosition/boxSize), Math.floor(yPosition/boxSize), "#000000");
}


function fall() {
    let nextarr = Make2Darray(row, col);
  
    // Check every cell
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col ; j++) {
            // What is the state?
            let state = arr[i][j];
            
            // If it's a piece of sand!
            if (state > 0) {
                // What is below?
                let below = (i + 1 < row) ? arr[i + 1][j] : -1;
                
                // Randomly fall left or right
                let dir = 1;
                if (Math.random() < 0.5) {
                    dir *= -1;
                }
                
                // Check below left or right
                let belowA = within(j + dir) ? (i + 1 < row ? arr[i + 1][j + dir] : -1) : -1;
                
                // Can it fall below or left or right?
                if (below === 0) {
                    nextarr[i + 1][j] = state; // Fall straight down
                } else if (belowA === 0) {
                    nextarr[i + 1][j + dir] = state; // Fall diagonally left or right
                } else {
                    nextarr[i][j] = state; // Stay put
                }
            }
        }
    }
    arr = nextarr;
    draw();
}


setInterval(fall, 50);


