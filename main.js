//consts

const apikey="3c4dd39f16b4c1119a387b1463e30c7d"
const apibase= "https://api.themoviedb.org/3/";

const imgPath = "https://image.tmdb.org/t/p/original";
const apiPaths={
    catg:`${apibase}/genre/movie/list?api_key=${apikey}`,
    mlist: (id)=>`${apibase}/discover/movie?api_key=${apikey}&with_genres=${id}`,//movie list with genres
    fetchTrending:`${apibase}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`

}

//boots up
function init(){
    bulidAllSections()
    
}
function bulidAllSections() {
    fetch(apiPaths.catg)
    .then(res=>res.json())
    .then(res=>{
        //all genres *categories for movie section
        const ctlog=res.genres;
        if (Array.isArray(ctlog) && ctlog.length) {
            ctlog.forEach(cat =>{
                // structure of cat:   {id: 28, name: 'Action'}
                let url=apiPaths.mlist(cat.id)
                //build section for paticular genre
                fetchBuildSecs(url,cat);
            })
        }
        // console.table(cats);
    })
    .catch(err=>console.error(err)) 
}
function fetchBuildSecs(url,any) {
    //here any is obj looks like: {id: 28, name: 'Action'}, url is link to api to movie list of particular genre
    // console.log(url,any);
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res)     res type:   {page: 1, results: Array(20), total_pages: 1846, total_results: 36916}
        const movies = res.results; //array
        // console.log(movies.slice(0,6));
        if (Array.isArray(movies) && movies.length) {
            buildMoviesSection(movies.slice(0,6), any);
        }
        return movies;
    })
    .catch(err=>console.error(err))
}
function buildMoviesSection(list, categ){
    console.log(list, categ);   //list: array:   & cate

    const mcont = document.getElementById('movies-cont');
    
    const moviesListHTML = list.map(item => {
        //every item look like: console it
        return `
        <div class="movie-item">
            <img class="movie-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
            <div class="iframe-wrap" id="yt${item.id}"></div>
        </div>`;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movie-section-heading">${categ.name} <span class="explore-nudge">Explore All</span></span></h2>
        <div class="movies-row">
            ${moviesListHTML}
        </div>
    `

    const div = document.createElement('div');
    div.className = "movies-section"
    div.innerHTML = moviesSectionHTML;

    // append html into movies container
    mcont.append(div);
}
// function searchMovieTrailer(movieName, iframId) {
//     if (!movieName) return;

//     fetch(apiPaths.searchOnYoutube(movieName))
//     .then(res => res.json())
//     .then(res => {
//         const bestResult = res.items[0];
        
//         const elements = document.getElementById(iframId);
//         console.log(elements, iframId);

//         const div = document.createElement('div');
//         div.innerHTML = `<iframe width="245px" height="150px" src="https://www.youtube.com/embed/${bestResult.id.videoId}?autoplay=1&controls=0"></iframe>`

//         elements.append(div);
        
//     })
//     .catch(err=>console.log(err));
// }

window.addEventListener('load',function(){
    init(); 
})