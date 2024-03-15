const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const w = 500;
const h = 500;
const boxSize = 20; // Adjust the size of each box as needed

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
draw();