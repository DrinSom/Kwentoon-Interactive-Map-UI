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

/* DRAG STATE */
let isDragging = false;
let startX = 0;
let startY = 0;

/* =========================
   PC CLICK + DRAG
========================= */
container.addEventListener("mousedown", (e) => {
    if (e.target.closest(".hotspot")) return;

    isDragging = true;
    container.style.cursor = "grabbing";

    startX = e.clientX - posX;
    startY = e.clientY - posY;

    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
});

document.addEventListener("mouseup", stopDrag);

/* =========================
   MOBILE TOUCH DRAG
========================= */
container.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") return;
    if (e.target.closest(".hotspot")) return;

    isDragging = true;
    container.setPointerCapture(e.pointerId);

    startX = e.clientX - posX;
    startY = e.clientY - posY;
});

container.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    if (e.pointerType === "mouse") return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();
});

container.addEventListener("pointerup", stopDrag);
container.addEventListener("pointercancel", stopDrag);

/* STOP */
function stopDrag() {
    isDragging = false;
    container.style.cursor = "grab";
}

/* PANELS */
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

/* FOR VARYING DEVICES */
function loadCSS() {
    const css = document.getElementById("device-css");

    if (window.innerWidth <= 768) {
        css.href = "WaterCycle_Mobile_May2026.css";
    } else {
        css.href = "WaterCycle_Desktop_May2026.css";
    }
}

loadCSS();

window.addEventListener("resize", loadCSS);
