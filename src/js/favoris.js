

$(document).ready(function(){
    let favorisParse = localStorage.getItem('Favoris');
    let favoris = JSON.parse(favorisParse);
    
    for(var i in favoris){
            let titleValue = favoris[i].title;
            let artisteValue = favoris[i].artiste;
            let albumValue = favoris[i].album;
            let coverSrc = favoris[i].cover;
            let src = favoris[i].preview;
            let id = i;
            
            $('.grid-cards-fav').append(
                '<div class="card">' +
                    '<img class="image"  src="'+ coverSrc +'">' + // a remplacer par une <img>
                    '<h4 class="title title-card">'+ titleValue +'</h4>' +
                    '<span class="subtitle">'+ artisteValue +' - '+ albumValue +'</span>' +
                    '<ion-icon name="heart" class="fav" id="iconFav" data-fav="fav" data-id="'+ id +'"></ion-icon>' +
                    '<audio id="audioPlayer" controls src="'+ src +'"></audio>'+
                '</div>');
    
    }

    let iconFav = document.querySelectorAll('#iconFav');

    for (let n = 0; n < iconFav.length; n++) {
        
        iconFav[n].addEventListener('click', function(e){
            e.preventDefault();

                removeFavoris(this);

        });
    }

    function removeFavoris(icon) {
        let favStringify; 

        // Change icon
        icon.setAttribute("name","heart-empty");

        // Récupération tableau dans localstorage
        let idMusic = icon.getAttribute("data-id");
        

        // Supp local storage
        delete favoris[idMusic];

        // Renvoie localstorage
        favStringify = JSON.stringify(favoris);
        localStorage.setItem("Favoris", favStringify);
        

        icon.setAttribute("data-fav","unfav");
    }


    
});