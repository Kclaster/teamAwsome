  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAv0U7iV_Zq2WevvNIoY2fEM4SfPzrdpAo",
    authDomain: "movie-app-7ce73.firebaseapp.com",
    databaseURL: "https://movie-app-7ce73.firebaseio.com",
    projectId: "movie-app-7ce73",
    storageBucket: "movie-app-7ce73.appspot.com",
    messagingSenderId: "1044560573437"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

var apiKey = 'AIzaSyB-pKJ6btQcbXMH37vUnWAloDTfS4gb7WU'

$('#forms').on('submit', function() {
    $('.vid-header-none').toggleClass('vid-header-display')
    $('.vid-header-display').toggleClass('vid-header-none')
    event.preventDefault();
    getmoviePoster(getValue());
    getYoutubeTrailer(getValue());
    getYoutubeReview(getValue());

    var userData = movieTitle;

    database.ref().push(userData);

    console.log(userData);

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
    //    console.log(response.Poster)
        $('#theImg').attr('src', response.Poster)
    })
    };
 }
 
 
 
 var posterSource = getmoviePoster(getValue());
 
 
 /// The following are for youtube api
 
 ////////////////////////////////////////////////////
 //following are for youtube movie trailers
 function getYoutubeTrailer(movieTitle) {
    if (movieTitle !== undefined) {
    //    console.log(apiKey)
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} trailer&key=${apiKey}`,
    function(response) {
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
    //        console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }         printVids(idArray);
 });
    };
 };
 
 //////////////////////////////////////////////////////
 //Following is for youtube reviews
 
 function getYoutubeReview(movieTitle) {
    if (movieTitle !== undefined) {
    //    console.log(movieTitle)
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} review&key=${apiKey}`,
    function(response) {
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
    //        console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.review${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }
    printVids(idArray);
 });
 };
};
 


