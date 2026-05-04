let scale = 1;
let posX = 0;
let posY = 0;

const container = document.getElementById("zoomContainer");

/* ZOOM */
function zoomIn() {
    scale = Math.min(2.5, scale + 0.2);
    updateTransform();
}

function zoomOut() {
    scale = Math.max(1, scale - 0.2);

    if (scale === 1) {
        posX = 0;
        posY = 0;
    }

    updateTransform();
}

function updateTransform() {
    container.style.transform = `
        translate(${posX}px, ${posY}px)
        scale(${scale})
    `;
}



let isDragging = false;
let startX, startY;

container.addEventListener("mousedown", (e) => {
    if (e.target.closest(".hotspot")) return;

    isDragging = true;
    container.style.cursor = "grabbing";

    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    applyBounds();
    updateTransform();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    container.style.cursor = "grab";
});

container.addEventListener("mouseleave", () => {
    isDragging = false;
    container.style.cursor = "grab";
});



function applyBounds() {
    const rect = container.getBoundingClientRect();

    const maxX = (rect.width * scale - rect.width) / 2;
    const maxY = (rect.height * scale - rect.height) / 2;

    posX = Math.min(maxX, Math.max(-maxX, posX));
    posY = Math.min(maxY, Math.max(-maxY, posY));
}


function openPanel(id) {
    document.getElementById("overlay").classList.add("active");
    document.getElementById(id).classList.add("active");
}

function closePanel() {
    document.getElementById("overlay").classList.remove("active");

    document.querySelectorAll(".panel").forEach(panel => {
        panel.classList.remove("active");
    });
}


function nextPage(btn) {
    const panel = btn.closest(".panel");
    const pages = panel.querySelectorAll(".page");

    let index = [...pages].findIndex(p => p.classList.contains("active"));
    pages[index].classList.remove("active");

    index = (index + 1) % pages.length;
    pages[index].classList.add("active");
}

function prevPage(btn) {
    const panel = btn.closest(".panel");
    const pages = panel.querySelectorAll(".page");

    let index = [...pages].findIndex(p => p.classList.contains("active"));
    pages[index].classList.remove("active");

    index = (index - 1 + pages.length) % pages.length;
    pages[index].classList.add("active");
}
