const url = "http://localhost:3001";
// will fetch news of the given query ,i.e, india
window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// will fetch the given query
async function fetchNews(query) {
    // fetch library
    // news is fetched from a server, so we can't get it automatically 
    // so we awit on the promise
    const res = await fetch(url + "?q=" + query);
    // convert data to json 
    const data = await res.json();
    bindData(data.articles);
}

// whenever we get data, we need to make the template and then we need 
// to add he template to card container

// so will make clone of cards
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    // if not done, whenever bindata is called, cards will be added to
    // the card container so we need ti empty the container every time 
    // before making clone
    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        // if article have no img so will not show it,
        // in order to avoid damaging of UI
        if (!article.urlToImage) return;

        // to clone all divs inside card
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        // add clone in card-continer
        cardsContainer.appendChild(cardClone);

    });
}

function fillDataInCard(cardClone, article) {
    // adding data in card clone
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    // opens the news article in new tab
    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    // when you click new nav item remove active class from previous nav item
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    // add active class to newer one
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
