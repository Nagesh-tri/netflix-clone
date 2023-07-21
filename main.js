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
    fetchTrendingMovie()
}
function fetchTrendingMovie(){
    fetchBuildSecs(apiPaths.fetchTrending, {id: 28, name: 'Trending Now'} )
    .then(list => {
        const randomIndex = parseInt(Math.random() * list.length);
        buildBanner(list[randomIndex]);
    }).catch(err=>{
        console.error(err);
    });
}
function buildBanner(movie){
    const bannerCont = document.getElementById('banner');
    
    bannerCont.style.backgroundImage = `url('${imgPath}${movie.backdrop_path}')`;

    const div = document.createElement('div');

    div.innerHTML = `
            <h2 class="b-title">${movie.title}</h2>
            <p class="b-info">Trending in movies | Released - ${movie.release_date} </p>
            <p class="b-overview">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0,200).trim()+ '...':movie.overview}</p>
            <div class="b-buttons-cont">
                <button class="b-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
                <button class="b-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
            </div>
        `;
    div.className = "b-content container";

    bannerCont.append(div);
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
    // console.log(list, categ);   //list: array:   & cate

    const mcont = document.getElementById('m-cont');
    
    const moviesListHTML = list.map(item => {
        //every item look like: console it
        return `
        <div class="m-item">
            <img class="m-i-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
            <div class="iframe-wrap" id="yt${item.id}"></div>
        </div>`;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="m-sec-heading">${categ.name} <span class="exp-nudge">Explore All</span></span></h2>
        <div class="m-row">
            ${moviesListHTML}
        </div>
    `

    const div = document.createElement('div');
    div.className = "m-secs"
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