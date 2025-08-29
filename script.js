const canvas = document.getElementById('coordinateCanvas');
const ctx = canvas.getContext('2d');
const questionDiv = document.getElementById('question');
const resultDiv = document.getElementById('result');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const nextBtn = document.getElementById('nextBtn');

let offset, equationText, pointX, pointY;

function generateSlope() {
    offset = Math.floor(Math.random() * 11) - 5; // i in [-5,5]
    equationText = `y = x ${offset >= 0 ? '+ ' + offset : '- ' + Math.abs(offset)}`;
}

function generatePoint() {
    // 50% chance to generate a point on the slope
    if (Math.random() < 0.5) {
        pointX = Math.floor(Math.random() * 11) - 5; // x in [-5,5]
        pointY = pointX + offset;
    } else {
        pointX = Math.floor(Math.random() * 11) - 5; // x in [-5,5]
        // Ensure pointY is NOT on the slope
        let y;
        do {
            y = Math.floor(Math.random() * 11) - 5;
        } while (y === pointX + offset);
        pointY = y;
    }
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(250, 500);
    ctx.moveTo(0, 250);
    ctx.lineTo(500, 250);
    ctx.stroke();

    // Draw slope line y = x + offset in coordinate space
    ctx.strokeStyle = '#0077ff';
    ctx.beginPath();
    for (let x = -5; x <= 5; x += 0.1) {
        let y = x + offset;
        let graphX = 250 + x * 20;
        let graphY = 250 - y * 20;
        if (x === -5) {
            ctx.moveTo(graphX, graphY);
        } else {
            ctx.lineTo(graphX, graphY);
        }
    }
    ctx.stroke();

    // Draw random point
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(250 + pointX * 20, 250 - pointY * 20, 6, 0, 2 * Math.PI);
    ctx.fill();
}

function showQuestion() {
    questionDiv.innerHTML = `
        <p><strong>Equation:</strong> ${equationText}</p>
        <p><strong>Point:</strong> (${pointX}, ${pointY})</p>
        <p>Is this point on the graph?</p>
    `;
    resultDiv.innerHTML = '';
    yesBtn.style.display = '';
    noBtn.style.display = '';
    nextBtn.style.display = 'none';
}

function checkAnswer(userSaysYes) {
    // Ensure integer comparison
    let isOnSlope = (Number(pointY) === Number(pointX) + Number(offset));
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    nextBtn.style.display = '';
    if (userSaysYes === isOnSlope) {
        resultDiv.innerHTML = `<span style="color:green;">Correct!</span>`;
    } else {
        resultDiv.innerHTML = `<span style="color:red;">Incorrect.</span>`;
    }
    // Debug info
    resultDiv.innerHTML += `<br><small>Debug: pointX=${pointX}, pointY=${pointY}, offset=${offset}, isOnSlope=${isOnSlope}</small>`;
}

function nextQuestion() {
    generateSlope();
    generatePoint();
    drawGraph();
    showQuestion();
}

yesBtn.onclick = () => checkAnswer(true);
noBtn.onclick = () => checkAnswer(false);
nextBtn.onclick = nextQuestion;

// Initial setup
nextQuestion();
// Initial setup
nextQuestion();
