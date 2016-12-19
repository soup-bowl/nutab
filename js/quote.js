/**
 * Nutub Quotes - soup-bowl
 * 
 * This file grabs the latest quotes from the quote API, and stores it locally within Chrome.
 * This is stored for a day to avoid exhausting API calls. 
 */

document.addEventListener("DOMContentLoaded", function(event) { 
    //chrome.storage.local.clear();
    loadQuoteItem();
});

/**
 * Creates a new quote item, with a day-long expiry.
 * @param {string} quote
 * @param {string} author
 */
function createQuoteItem(quote, author) {
    return {
        quote: quote,
        author: author,
        expiry: Date.now() + 86400000
    }
}

/**
 * Stores the quote item in the database. Optional reload calls loadQuoteItem.
 * @param {createQuoteItem} quoteItem
 * @param {boolean} [reload]
 */
function storeQuoteItem(quoteItem, reload = false) {
    if (reload) {
        chrome.storage.local.set({"nutabQuote": quoteItem}, function(obj) {
            loadQuoteItem();
        });
    } else {
        chrome.storage.local.set({"nutabQuote": quoteItem});
    }
}

/**
 * Loads a quote stored in Chrome, or if expired from the quotes API. 
 */
function loadQuoteItem() {
    chrome.storage.local.get('nutabQuote', function (obj) {
        var expiryCountdown = 0;
        if ( Object.keys(obj).length === 0 && obj.constructor === Object ) {
            expiryCountdown = 0;
        } else {
            expiryCountdown = obj.nutabQuote.expiry - Date.now();
        }

        if ( expiryCountdown <= 0 ) {
            var quoteAPI = "http://quotes.rest/qod.json?category=inspire";
            $.getJSON( quoteAPI, {
                category: "inspire"
            })
            .done(function( data ) {
                var srct = data.contents.quotes[0];
                storeQuoteItem( createQuoteItem( srct.quote, srct.author ), true );
            });
        } else {
            displayQuote( obj.nutabQuote );
        }
    });
}

/**
 * Displays the quote items on the page.
 * @param {createQuoteItem} quoteItem
 */
function displayQuote(quoteItem) {
    document.getElementById("quotetext").innerHTML = quoteItem.quote;
    document.getElementById("quoteauthor").innerHTML = quoteItem.author;
}