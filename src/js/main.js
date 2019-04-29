
$.ajax({
    url: 'https://api.deezer.com/search?q=eminem&output=jsonp',
    dataType: 'jsonp'
}).done(function(musiques){

    document.querySelector('#results').innerHTML = 
        musiques.data.map(m => m.title).join('<br>');

});
