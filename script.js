const API_KEY = "b69390dbb63141bb9a3488b23892c76b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    console.log(data)
    bindData(data.articles)
}

function bindData (articles) {
    const cardsContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        const cardClone = newsCardTemplate.content.cloneNode(true);
        if(!article.urlToImage) return;
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone)
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');
    const newsSource = cardClone.querySelector('#news-source');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} : ${date}`

cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank")
})
}


let currentSelectedNav = null;

//onclick method on nav buttons
function onNavItemClick (id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active')
}

const searchText = document.querySelector('#search-text');
const searchButton = document.querySelector('.search-button');

    searchButton.addEventListener('click', ()=>{
        let query = searchText.value;
        if(!query) return;
        fetchNews(query);
    
        currentSelectedNav?.classList.remove('active');
        currentSelectedNav = null;
    
    })


const icon = document.querySelector(".icon");
let searchIn = document.querySelector('.searchIn')
icon.addEventListener("click", () => {

        if(searchIn.style.maxHeight == 0) {
            searchIn.style.maxHeight = searchIn.scrollHeight + 'px';
        } else {
            searchIn.style.maxHeight = null;
        } 
})
// icon.addEventListener("click", () => {
//   if (secondSection.style.maxHeight == 0) {
//     secondSection.style.maxHeight = secondSection.scrollHeight + "px";
//   } else {
//     secondSection.style.maxHeight = null;
//   }
// });

