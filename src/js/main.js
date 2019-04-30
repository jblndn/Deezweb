$(document).ready(function(){
      // GET DOM
      let search = $('#search');
      let searchInput = $('#search-input');

      search.on('submit', function(e){
          e.preventDefault();

          // Remove all cards
          $('.card').remove();

          // Récupération valeur input
          let searchValue = searchInput.val();

          //Requête ajax api
          $.ajax({
                url: 'https://api.deezer.com/search?q='+ searchValue +'&output=jsonp',
                dataType: 'jsonp'
          }).done(function(musiques){
                let musiqueSearch = musiques.data
                
                // Boucle affichant les cards
                for (let i = 0; i < musiqueSearch.length; i++) {

                    let titleValue = musiqueSearch[i].title;
                    let artisteValue = musiqueSearch[i].artist.name;
                    let albumValue = musiqueSearch[i].album.title;
                    let coverSrc = musiqueSearch[i].album.cover;

                    // Insertion code html
                    $('.grid-cards').append('<div class="card"><div class="image" style="background-image: url(\''+ coverSrc +'\')"></div><h4 class="title title-card">'+ titleValue +'</h4><span class="subtitle">'+ artisteValue +' - '+ albumValue +'</span><ion-icon name="heart-empty" class="fav"></ion-icon></div>');
                    
                }
          });
      });
      
});