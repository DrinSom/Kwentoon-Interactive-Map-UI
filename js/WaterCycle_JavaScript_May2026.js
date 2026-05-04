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
    container.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
}

/* DRAG */
let isDragging = false;
let startX = 0;
let startY = 0;

container.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".hotspot")) return;

    isDragging = true;
    container.setPointerCapture(e.pointerId);
    container.style.cursor = "grabbing";

    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

container.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
});

container.addEventListener("pointerup", stopDrag);
container.addEventListener("pointercancel", stopDrag);

function stopDrag() {
    isDragging = false;
    container.style.cursor = "grab";
}

/* PANELS */
function openPanel(id) {
    document.getElementById("overlay").classList.add("active");
    const panel = document.getElementById(id);
    panel.classList.add("active");
    applyUIScale();
}

function closePanel() {
    document.getElementById("overlay").classList.remove("active");

    document.querySelectorAll(".panel").forEach(panel => {
        panel.classList.remove("active");
    });
}

/* PAGES */
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

/* PANEL SCALE (FIXED FOR PC + MOBILE + PORTRAIT) */
function getPanelScale() {
    const baseWidth = 1920;
    const baseHeight = 1080;

    const scaleW = window.innerWidth / baseWidth;
    const scaleH = window.innerHeight / baseHeight;

    const scale = Math.min(scaleW, scaleH);

    if (window.innerWidth <= 768) {
        return 1.2;
    }

    return Math.max(0.9, Math.min(scale, 1));
}

function applyUIScale() {
    const s = getPanelScale();

    document.querySelectorAll(".panel").forEach(panel => {
        if (panel.classList.contains("active")) {
            panel.style.transform = `translate(-50%, -50%) scale(${s})`;
        } else {
            panel.style.transform = `translate(-50%, -50%) scale(0.9)`;
        }
    });
}

window.addEventListener("resize", applyUIScale);
window.addEventListener("load", applyUIScale);
applyUIScale();
