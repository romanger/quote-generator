const quoteContainer = document.getElementById('quote-container');
const quoteText = quoteContainer.querySelector('#quote');
const authorText = quoteContainer.querySelector('#author');
const twitterBtn = quoteContainer.querySelector('#twitter');
const newQuoteBtn = quoteContainer.querySelector('#new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpeener() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote From API
async function getQuote() {

    showLoadingSpinner();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        removeLoadingSpeener();

    } catch (e) {
        getQuote();
        console.log('Whoops, no quote', e);
    }
};

// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
