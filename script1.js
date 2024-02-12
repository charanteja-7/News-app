

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
    const url = `https://google-news13.p.rapidapi.com/search?keyword=${query}&lr=en-US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f9cb18f503msha801c212bc43687p19a375jsn222e37393e44',
            'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        displayNotFoundMessage(query);
        return;
    }
    const data = await response.json();
    if (data.items.length === 0) {
        // when no items found
        displayNotFoundMessage(query);
    } else {
        topic.innerHTML =`${query}-<em style="color:grey">Total ${data.items.length} results found</em>`;
        console.log('before binddata',data);
        bindData(data.items);
    }
}
//display that items are not found
function displayNotFoundMessage(query) {
    document.querySelector('.card-container').innerHTML ='';
    topic.innerHTML =`No results found for <span style='color:orange'>'${query}'</span>`;
     // const cardsContainer = document.querySelector('.card-container');
    // cardsContainer.innerHTML = `<h1 class = "error-msg">No results found for <span style='color:orange'>'${query}'</span></h1>`;
   
}

function bindData(items){
    console.log('in bind data',items);
    const cardsContainer = document.querySelector('.card-container');
    const cardTemplate = document.querySelector('.template-news-card');    
    cardsContainer.innerHTML='';
    items.forEach((item) => {
            if(!item.images.thumbnail) 
            {
                return;
            }
            const cloneCard = cardTemplate.content.cloneNode(true);
            fillCardData(cloneCard,item);
            cardsContainer.appendChild(cloneCard);
    });
    
}

function fillCardData(cloneCard,item){
    const newsImage = cloneCard.querySelector('#card-image');
    const newsTitle = cloneCard.querySelector('#news-title');
    const newssrc = cloneCard.querySelector('#news-source');
    const newsdesc= cloneCard.querySelector('#news-desc');
    const readitem = cloneCard.querySelector('#read-article');

    newsImage.src = item.images.thumbnail;
    newsTitle.innerHTML = item.title;
    newsdesc.innerHTML=item.snippet;
    const date = new Date(item.timestamp*1000);
    newssrc.innerHTML = `${item.publisher} . ${date.toLocaleString()}`;
    readitem.addEventListener('click',()=>{
        window.open(item.newsUrl,"_blank");
    })
}
