// Seleccionar los elementos que se van a animar
const elementsToReveal = document.querySelectorAll('.reveal');

// Función para verificar si un elemento está en la vista
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para añadir la clase de animación
function revealElements() {
    elementsToReveal.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Detectar el scroll y llamar a la función
window.addEventListener('scroll', revealElements);


// Selección de elementos
const circles = document.querySelectorAll('.circle');
const infoContents = document.querySelectorAll('.info-content');

// Función para manejar clics en los círculos
circles.forEach(circle => {
    circle.addEventListener('click', () => {
        // Ocultar todos los apartados de información
        infoContents.forEach(content => {
            content.classList.add('hidden');
            content.style.display = 'none'; // Asegura que queden ocultos
        });

        // Mostrar el apartado correspondiente al círculo
        const infoId = circle.getAttribute('data-info');
        const targetContent = document.getElementById(infoId);
        if (targetContent) {
            targetContent.classList.remove('hidden');
            targetContent.style.display = 'block'; // Asegura que aparezca
        }
    });
});



