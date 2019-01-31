$('#forms').on('submit', function() {
    event.preventDefault();
    getmoviePoster(getValue());
    getYoutubeTrailer(getValue());
    getYoutubeReview(getValue());
 });
 
 
 function getValue() {
    if ($('#inputMovie').val() !== 'Enter Movie Title') {
      var movieTitle = $('#inputMovie').val();
    }
    return movieTitle
 }
 
 
 function getmoviePoster(movieTitle) {
    if (movieTitle !== undefined) {
    $.get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=fcc96c64`,
    function(response) {
        console.log(response.Poster)
        $('#theImg').attr('src', response.Poster)
    })
    };
 }
 
 
 
 var posterSource = getmoviePoster(getValue());
 
 
 /// The following are for youtube api
 var apiKey = 'AIzaSyDfh0vTr9C2bILx8r9o3PAkO_87tXlmBu8';
 
 ////////////////////////////////////////////////////
 //following are for youtube movie trailers
 function getYoutubeTrailer(movieTitle) {
    if (movieTitle !== undefined) {
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} trailer&key=AIzaSyDfh0vTr9C2bILx8r9o3PAkO_87tXlmBu8`,
    function(response) {
        console.log(response.items);
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
            console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }         printVids(idArray);
 });
    };
 };
 
 function publishYoutube(youtubeArray) {
   return youtubeArray.map(function(cur, index) {
    $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
 });
 };
 getYoutubeTrailer(getValue());
 
 //////////////////////////////////////////////////////
 //Following is for youtube reviews
 
 function getYoutubeReview(movieTitle) {
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} review&key=AIzaSyDfh0vTr9C2bILx8r9o3PAkO_87tXlmBu8`,
    function(response) {
        console.log(response.items);
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
            console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.review${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }
    printVids(idArray);
 });
 };
 
 function publishYoutube(youtubeArray) {
   return youtubeArray.map(function(cur, index) {
    $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
 });
 };
 getYoutubeReview(movieTitle);


