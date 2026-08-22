// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.section');

    let isScrolling = false;

    // Función para manejar el snap scroll
    container.addEventListener('scroll', () => {
        if (isScrolling) return;

        isScrolling = true;

        // Pequeño delay para detectar cuándo para el scroll del usuario
        setTimeout(() => {
            let closestSection = sections[0];
            let minDistance = Math.abs(container.scrollTop - sections[0].offsetTop);

            // Busca la sección más cercana al top del contenedor
            sections.forEach(section => {
                const distance = Math.abs(container.scrollTop - section.offsetTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section;
                }
            });

            // Hace scroll suave a la sección más cercana
            closestSection.scrollIntoView({ behavior: 'smooth' });
            
            isScrolling = false;
        }, 100); // Ajusta este tiempo si sientes el snap muy rápido o lento
    });
});
