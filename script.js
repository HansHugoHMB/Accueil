document.addEventListener('DOMContentLoaded', function() {
    const sliderHandle = document.querySelector('.slider-handle');
    const sliderTrack = document.querySelector('.slider-track');
    const validationMessage = document.querySelector('.validation-message');
    const messageElement = document.querySelector('.message');

    let isDragging = false;
    let startX;
    let handleOffsetLeft;
    const trackWidth = sliderTrack.offsetWidth - sliderHandle.offsetWidth; // Largeur disponible pour le mouvement
    const successThreshold = trackWidth * 0.8; // Seuil pour considérer comme validé (80% de la piste)

    sliderHandle.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        handleOffsetLeft = sliderHandle.offsetLeft;
        sliderHandle.style.transition = 'none'; // Désactive les transitions pendant le drag
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const mouseX = e.clientX;
        const movedX = mouseX - startX;
        let newHandlePosition = handleOffsetLeft + movedX;

        // Limiter la position du handle dans la piste
        if (newHandlePosition < 0) {
            newHandlePosition = 0;
        } else if (newHandlePosition > trackWidth) {
            newHandlePosition = trackWidth;
        }

        sliderHandle.style.left = newHandlePosition + 'px';
        sliderTrack.style.setProperty('--slider-value', (newHandlePosition / trackWidth) * 100 + '%'); // Mettre à jour la largeur de la partie remplie
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        sliderHandle.style.transition = 'left 0.3s ease'; // Réactive la transition pour le retour en position initiale

        if (sliderHandle.offsetLeft >= successThreshold) {
            // Captcha validé
            sliderHandle.style.left = trackWidth + 'px'; // Position finale exacte
            sliderTrack.style.setProperty('--slider-value', '100%'); // Remplir complètement la barre
            validationMessage.style.display = 'block';
            messageElement.style.display = 'none'; // Cacher le message initial
            sliderHandle.style.backgroundColor = 'green'; // Changer la couleur du handle pour indiquer le succès
            sliderHandle.style.cursor = 'default'; // Changer le curseur pour indiquer que ce n'est plus draggable
            sliderHandle.onmousedown = null; // Désactiver le dragging après validation

        } else {
            // Captcha non validé, retour à la position initiale
            sliderHandle.style.left = '0';
            sliderTrack.style.setProperty('--slider-value', '0%'); // Remettre la barre de progression à zéro
        }
    });

    document.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            sliderHandle.style.transition = 'left 0.3s ease';
            // Retour à la position initiale si on sort de la zone du document en draggant
            sliderHandle.style.left = '0';
            sliderTrack.style.setProperty('--slider-value', '0%');
        }
    });
});