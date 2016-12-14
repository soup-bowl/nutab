var bmk = chrome.bookmarks; // Chrome bookmarks shorthand

document.addEventListener("DOMContentLoaded", function(event) { 
    displayBookmarks();
});

/**
 * Populate the bookmarks bar with favourites.
 */
function displayBookmarks() {
    // "1" being the Bookmarks Bar, grab the bookmark tree.
    bmk.getSubTree("1", function(e) {

        var bookmarkBar = document.getElementById("bookmarksbar");

        createBookmarkIcons(bookmarkBar, e[0].children);

        // Enable launching of the App tray, which is otherwise blocked.
        document.getElementById("applauncher").addEventListener("click", function() { 
            event.preventDefault();
            chrome.tabs.update({url: "chrome://apps/"});
        });
    }); 
}

/**
 * Creates a HTML image with hyperlink representing the favicon, and hyperlink to the bookmark.
 * @param {Object}           parent   - UL/OL DOM where the bookmark bar is located. 
 * @param {BookmarkTreeNode} bookmark 
 */
function createBookmarkIcon(parent, bookmark) {
    var bookmarkEntry = document.createElement("LI");
    var bookmarkLink = document.createElement("A");   // Hyperlink
    var bookmarkIcon = document.createElement("IMG"); // Favicon
    
    bookmarkLink.setAttribute("href", bookmark.url);
    bookmarkIcon.setAttribute("src", "chrome://favicon/" + bookmark.url);
    bookmarkIcon.setAttribute("class", "favicon");
    bookmarkIcon.setAttribute("title", bookmark.title);

    // If Chrome app launcher.
    if (bookmark.url === "chrome://apps/") {
        bookmarkIcon.setAttribute("id", "applauncher");
        bookmarkIcon.setAttribute("title", "App Launcher");
    }

    // If bookmark folder.
    if (bookmark.children !== undefined) {
        bookmarkIcon.setAttribute("class", "folder");
        bookmarkIcon.setAttribute("src", "../img/folder.svg");
        bookmarkLink.setAttribute("href", "#");
        bookmarkLink.setAttribute("data-id", bookmark.id);
    }
    
    bookmarkLink.appendChild(bookmarkIcon);
    bookmarkEntry.appendChild(bookmarkLink);
    parent.appendChild(bookmarkEntry);
}

/** 
 * Creates a collection of HTML images with hyperlinks representing the respective favicon, and hyperlink to the said bookmark.
 * @see {@link createBookmarkIcon}
 * @param {Object}           parent    - UL/OL DOM where the bookmark bar is located. 
 * @param {BookmarkTreeNode} bookmarks - Collection of BookmarkTreeNode.
 */
function createBookmarkIcons(parent, bookmarks) {
    bookmarks.forEach(function(bookmark) {
        createBookmarkIcon(parent, bookmark);
    });
}