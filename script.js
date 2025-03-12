document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("slider");
    const puzzlePiece = document.getElementById("puzzle-piece");
    const correctPosition = 80;  // Position correcte en %

    slider.addEventListener("input", function() {
        let value = slider.value;
        puzzlePiece.style.left = value + "%";
    });

    slider.addEventListener("change", function() {
        if (Math.abs(slider.value - correctPosition) < 5) {
            alert("✅ Vérification réussie !");
            document.getElementById("captcha-overlay").style.display = "none";
        } else {
            alert("❌ Réessayez !");
            slider.value = 0;
            puzzlePiece.style.left = "0%";
        }
    });
});
