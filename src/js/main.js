$(document).ready(function(){
    let favoris = {};
    let music = {};
    let track = {};

    // GET DOM
    let search = $('#search');
    let searchInput = $('#search-input');

    
      search.on('submit', function(e){
        e.preventDefault();


        // Remove all cards
        $('.card').remove();

        // Récupération valeur 
        let searchValue = searchInput.val();
        let select = $('#trie option:selected'); 
        let selectValue = select[0].value;
        

        //Requête ajax api
        $.ajax({
            url: 'https://api.deezer.com/search?q='+ searchValue +'&output=jsonp&order='+ selectValue,
            dataType: 'jsonp'
        }).done(function(musiques){
            
            // Affichage recherche
            displaySearch( musiques.data);
            

            //FONCTION FAVORIS
            let iconFav = document.querySelectorAll('#iconFav');

            for (let n = 0; n < iconFav.length; n++) {
                
                iconFav[n].addEventListener('click', function(e){
                    e.preventDefault();

                    if (this.getAttribute('data-fav') == "unfav") {
                        
                        // Fonction ajout fav
                        addFavoris(this);

                    }
                    else if (this.getAttribute('data-fav') == "fav") {
                        
                        // Fonction suppr fav
                        removeFavoris(this);

                    }


                });
            }
            

        });
      });     

      function displaySearch(musiqueSearch) {

          // Boucle affichant les cards
          for (let i = 0; i < musiqueSearch.length; i++) {

            let id = musiqueSearch[i].id;
            let titleValue = musiqueSearch[i].title;
            let artisteValue = musiqueSearch[i].artist.name;
            let albumValue = musiqueSearch[i].album.title;
            let coverSrc = musiqueSearch[i].album.cover;
            let src = musiqueSearch[i].preview;

            // Stockage des musiques dans un tableau
            track.title = titleValue;
            track.artiste = artisteValue;
            track.album = albumValue;
            track.cover = coverSrc;
            track.src = src;

            music[id] = track;


            // Insertion code html
            $('.grid-cards').append(
                '<div class="card">' +
                    '<img class="image"  src="'+ coverSrc +'">' + // a remplacer par une <img>
                    '<h4 class="title title-card">'+ titleValue +'</h4>' +
                    '<span class="subtitle">'+ artisteValue +' - '+ albumValue +'</span>' +
                    '<ion-icon name="heart-empty" class="fav" id="iconFav" data-id="'+ id +'" data-fav="unfav"></ion-icon>' +
                    '<audio id="audioPlayer" src="'+ src +'"></audio>'+
                '</div>');
            
        }
      }

    function addFavoris(icon) {
        let favStringify; 

        // Récupère id musique + ajout dans tableau
        let idMusique = icon.getAttribute('data-id');
        let musicFav = music[idMusique];
        favoris[idMusique] = musicFav;

        // Change icon
        icon.setAttribute("name","heart");

        // Ajout local storage
        favStringify = JSON.stringify(favoris);
        localStorage.setItem("Favoris", favStringify);

        icon.setAttribute("data-fav","fav");
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