
var picCount = 0;
$(document).ready(function() {

    //
    getMovieList();
    getBoxOff();
    renderPopular();


    /**
     * 获取最受欢迎的电影们
     */
    function renderPopular(){
        getRequest(
            "/statistics/popular/movie?days=7&movieNum=10",
            function (res) {
                console.log(res)
                var list = res.content
                var infoStr = ""
                for (var i=0;i<list.length;i++){
                    infoStr += '<div class="statistic-item">' +
                        '<span class="title">' + (i+1)+'</span>' +
                        '<span>' + list[i].movieName+ '</span>' +
                        '<span class="error-text">' + list[i].box + '</span>'+
                        '</div>'
                }

                $("#popular").append(infoStr)
            },
            function (error) {
                alert(error)
            }
        )
    }

    /**
     * 获得票房成员
     */
    function getBoxOff(){
        var infoStr = "";
        getRequest(
            "/statistics/boxOffice/total",

            function(res) {
                console.log(res)
         var list = res.content;
         for(var i=0; i < list.length && i < 10; i++) {
             infoStr += '<div class="statistic-item">'
                 + '<span class="title">' + (i+1) +'</span>'
                 +'<span>' +  list[i].name + '</span>'
                 +'<span class="error-text">' + (list[i].boxOffice||0)  +'</span>'+
                 '</div> ';
         }
         $("#boxOffInfo").append(infoStr);
    },
        function(error){
    alert(error)

    }
    )

    }

    function getMovieList(){
        getRequest(
            "/movie/all",
            function(res){
                renderMovieList(res.content);
            },
            function(error){
                alert(error)
            }
        )
    }

    function renderMovieList(list){
        $('.movie-list').empty();
        var movieDomStr = '';
            for(var x=0;x<list.length  ;x++){
                var movie = list[x]
                picCount = picCount + 1;
                movie.description = movie.description || '';
                movieDomStr +=
                    '<dd>'+
                    '<div class="movie-item">' +
                    "<a href='/user/movieDetail?id="+ movie.id +"'>" +
                    "<img class='movie-img' src='" + (movie.posterUrl || "../images/defaultAvatar.jpg")  + "' alt='" + (x+1) + "'/>"+
                    '</a>' +
                    "<a href='/user/movieDetail?id="+ movie.id +"' class='buyButton'><p text-align:'center'>购 票</p></a>"+
                    '</div>'+
                '</dd>'
            }
        $('#movie-list').append(movieDomStr);

    }

})

