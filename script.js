const faces = document.querySelectorAll('.face');
let current = 0;

function showFace(index) {
    faces.forEach(face => {
        face.classList.remove('active');
    });

    faces[index].classList.add('active');
}

document.addEventListener('keydown', (e) => {

    if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown'
    ) {
        if (current < faces.length - 1) {
            current++;
            showFace(current);
        }
    }

    if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp'
    ) {
        if (current > 0) {
            current--;
            showFace(current);
        }
    }
});