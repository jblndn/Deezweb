$(document).ready(function(){
    let favRandom;
    let button = $('#randomFav');

    // récupération local storage
    let favorisParse = localStorage.getItem('Favoris');
    let favoris = JSON.parse(favorisParse);

    // Affichage au refresh de la page
    random(favoris);
    afficheCard(favRandom);

    // Affichage au click
    button.on('click', function () {
        random(favoris);
        afficheCard(favRandom);
    });


    function random(favoris) {
        // Récupération random musique
        let keys = Object.keys(favoris)
        let random = keys.length * Math.random() << 0;
        favRandom = favoris[keys[random]];
    }

    function afficheCard(favRandom) {
        
        $('.card').remove();

        // Récupération valeurs cards
        let titleValue = favRandom.title;
        let artisteValue = favRandom.artiste;
        let albumValue = favRandom.album;
        let coverSrc = favRandom.cover;
        let src = favRandom.preview;
        
        // Affichage card
        $('.random-fav').append(
            '<div class="card">' +
                '<img class="image"  src="'+ coverSrc +'">' + // a remplacer par une <img>
                '<h4 class="title title-card">'+ titleValue +'</h4>' +
                '<span class="subtitle">'+ artisteValue +' - '+ albumValue +'</span>' +
                '<audio id="audioPlayer" controls src="'+ src +'"></audio>'+
            '</div>');
    }

});