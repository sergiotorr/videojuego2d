const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let score = 0;
const scoreDisplay = document.getElementById("score"); // Referencia al contenedor de puntuación

// Elementos del juego
const elements = [];
const elementImage = new Image();
elementImage.src = "assets/element.png";

// Crear elementos aleatorios
function createElement() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;

    elements.push({ x, y, speedX, speedY });
}

// Actualizar la posición y dibujar los elementos
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((element, index) => {
        element.x += element.speedX;
        element.y += element.speedY;

        // Rebotar en los bordes
        if (element.x < 0 || element.x > canvas.width) element.speedX *= -1;
        if (element.y < 0 || element.y > canvas.height) element.speedY *= -1;

        ctx.drawImage(elementImage, element.x, element.y, 50, 50);
    });

    requestAnimationFrame(updateGame);
}

// Manejar clic en los elementos
canvas.addEventListener("click", (e) => {
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;

    elements.forEach((element, index) => {
        if (
            mouseX > element.x &&
            mouseX < element.x + 50 &&
            mouseY > element.y &&
            mouseY < element.y + 50
        ) {
            elements.splice(index, 1); // Elimina el elemento
            score++;
            scoreDisplay.textContent = `Puntuación: ${score}`; // Actualiza el contador
        }
    });
});

// Iniciar el juego
elementImage.onload = () => {
    for (let i = 0; i < 20; i++) createElement(); // Crear 5 elementos inicialmente
    updateGame();
};
