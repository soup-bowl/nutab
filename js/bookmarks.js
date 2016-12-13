var bmk = chrome.bookmarks; // Chrome bookmarks shorthand

document.addEventListener("DOMContentLoaded", function(event) { 
    displayBookmarks();
});

function displayBookmarks() {
    // "1" being the Bookmarks Bar, grab the bookmark tree.
    bmk.getSubTree("1", function(e) {

        var bookmarkBar = document.getElementById("bookmarksbar");

        // Iterate through the bookmark nodes.
        e[0].children.forEach(function(bookmark) {
            // TODO - Support folders. For now, skip them.
            if (bookmark.children !== undefined)
                return;
            
            var bookmarkEntry = document.createElement("LI"); // Container
            var bookmarkLink = document.createElement("A");   // Hyperlink
            var bookmarkIcon = document.createElement("IMG"); // Favicon
            
            bookmarkLink.setAttribute("href", bookmark.url);
            bookmarkIcon.setAttribute("src", "chrome://favicon/" + bookmark.url);
            bookmarkIcon.setAttribute("title", bookmark.title);
            
            bookmarkLink.appendChild(bookmarkIcon);
            bookmarkEntry.appendChild(bookmarkLink);
            bookmarkBar.appendChild(bookmarkEntry);
        });
    }); 
}