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

        createBookmarkEntries(bookmarkBar, e[0].children);

        // Enable launching of the App tray, which is otherwise blocked.
        document.getElementById("applauncher").addEventListener("click", function() { 
            event.preventDefault();
            chrome.tabs.update({url: "chrome://apps/"});
        });
    }); 
}

/**
 * Creates a HTML entry with a hyperlink representing a bookmark, and hyperlink to the bookmark.
 * 
 * If icons is false, the entry will be generated as a text item instead of an icon.
 * @param {Object}           parent   - UL/OL DOM where the bookmark bar is located. 
 * @param {BookmarkTreeNode} bookmark 
 * @param {Boolean}          [icons]
 */
function createBookmarkEntry(parent, bookmark, icons = true) {
    var bookmarkEntry = document.createElement("LI");
    var bookmarkLink = document.createElement("A");   // Hyperlink
    
    if (icons) {
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
        
        bookmarkLink.appendChild(bookmarkIcon);
        bookmarkEntry.appendChild(bookmarkLink);
        parent.appendChild(bookmarkEntry);
    } else {
        bookmarkLink.setAttribute("href", bookmark.url);
        bookmarkLink.setAttribute("class", "menuitem");
        bookmarkLink.textContent = bookmark.title;

        bookmarkEntry.appendChild(bookmarkLink);
        parent.appendChild(bookmarkEntry);
    }
}

/**
 * Creates a HTML folder with a submenu for bookmark folders.
 * @param {Object}           parent   - UL/OL DOM where the bookmark bar is located. 
 * @param {BookmarkTreeNode} bookmark 
 */
function createBookmarkFolder(parent, bookmark) {
    var folderContainer         = document.createElement("SPAN");
    var bookmarkEntryCollection = document.createElement("UL");
    var bookmarkEntry           = document.createElement("LI");
    var bookmarkLink            = document.createElement("A");   
    var bookmarkIcon            = document.createElement("IMG"); 
    
    // Setup folder icon and container
    folderContainer.setAttribute("class", "subfolder");
    folderContainer.setAttribute("id", bookmark.id);
    bookmarkLink.setAttribute("class", "subfolder-button");
    bookmarkLink.setAttribute("href", "#");
    bookmarkLink.setAttribute("data-id", bookmark.id);
    bookmarkIcon.setAttribute("class", "folder");
    bookmarkIcon.setAttribute("src", "../img/folder.svg");
    bookmarkIcon.setAttribute("title", bookmark.title);
    bookmarkEntryCollection.setAttribute("class", "subfolder-content");
    
    createBookmarkEntries(bookmarkEntryCollection, bookmark.children, false, false);

    bookmarkLink.appendChild(bookmarkIcon);
    bookmarkEntry.appendChild(bookmarkLink);
    bookmarkEntry.appendChild(bookmarkEntryCollection);
    folderContainer.appendChild(bookmarkEntry);
    parent.appendChild(folderContainer);
}

/** 
 * Creates a collection of HTML images with hyperlinks representing the respective favicon, and hyperlink to the said bookmark.
 * @see {@link createBookmarkEntry}
 * @param {Object}           parent    - UL/OL DOM where the bookmark bar is located. 
 * @param {BookmarkTreeNode} bookmarks - Collection of BookmarkTreeNode.
 * @param {Boolean}          [folders] - Whether folders should be returned or not.
 * @param {Boolean}          [icons]   - If icons or menu items. Icons default.
 */
function createBookmarkEntries(parent, bookmarks, folders = true, icons = true) {
    bookmarks.forEach(function(bookmark) {
        if (bookmark.children === undefined) {
            createBookmarkEntry(parent, bookmark, icons);
        } else {
            if (folders) {
                createBookmarkFolder(parent, bookmark);
            } 
        }      
    });
}