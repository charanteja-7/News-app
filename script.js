// const API_KEY = "cc2188b313e24b899b51e8ea22f907e7";
const API_KEY = "f473c12b6e2d41938957ed0c235495f2";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => {
    fetchNews("India");
});

// handling search button 
const searchButton = document.querySelector('#submit-btn');
const topic = document.querySelector('#topic');

searchButton.addEventListener('click',()=>{
    const searchContent = document.querySelector('#search').value;
    document.querySelector('#search').value ='';
    searchContent =='' ?fetchNews("current affairs"):fetchNews(searchContent);
})
async function fetchNews(query){
    const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        displayNotFoundMessage(query);
        return;
    }
    const data = await response.json();
    if (data.articles.length === 0) {
        // when no articles found
        displayNotFoundMessage(query);
    } else {
        topic.innerHTML =`${query}-<em style="color:grey">Total ${data.articles.length} results found</em>`;
        bindData(data.articles);
    }
}
//display that articles are not found
function displayNotFoundMessage(query) {
    document.querySelector('.card-container').innerHTML ='';
    topic.innerHTML =`No results found for <span style='color:orange'>'${query}'</span>`;
     // const cardsContainer = document.querySelector('.card-container');
    // cardsContainer.innerHTML = `<h1 class = "error-msg">No results found for <span style='color:orange'>'${query}'</span></h1>`;
   
}

function bindData(articles){
  
    const cardsContainer = document.querySelector('.card-container');
    const cardTemplate = document.querySelector('.template-news-card');    

    cardsContainer.innerHTML='';
    articles.forEach((article) => {
            if(!article.urlToImage) 
            {
                return;
            }
            const cloneCard = cardTemplate.content.cloneNode(true);
            fillCardData(cloneCard,article);
            cardsContainer.appendChild(cloneCard);
    });
    
}

function fillCardData(cloneCard,article){
    const newsImage = cloneCard.querySelector('#card-image');
    const newsTitle = cloneCard.querySelector('#news-title');
    const newssrc= cloneCard.querySelector('#news-source');
    const newsdesc= cloneCard.querySelector('#news-desc');
    const readArticle = cloneCard.querySelector('#read-article');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsdesc.innerHTML=article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newssrc.innerHTML = `${article.source.name} . ${date}`;

    readArticle.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}