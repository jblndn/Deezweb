$(document).ready(function(){
    // récupération local storage
    let favorisParse = localStorage.getItem('Favoris');
    let favoris = JSON.parse(favorisParse);

    // Récupération random musique
    let keys = Object.keys(favoris)
    let random = keys.length * Math.random() << 0;
    let favRandom = favoris[keys[random]];

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

});