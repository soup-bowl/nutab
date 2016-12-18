var tsl = chrome.i18n;

/**
 * Literals used for dates.
 */
var dateLiterals = {
    months: [
        tsl.getMessage("monthJanuary"),
        tsl.getMessage("monthFebruary"),
        tsl.getMessage("monthMarch"),
        tsl.getMessage("monthApril"),
        tsl.getMessage("monthMay"),
        tsl.getMessage("monthJune"),
        tsl.getMessage("monthJuly"),
        tsl.getMessage("monthAugust"),
        tsl.getMessage("monthSeptember"),
        tsl.getMessage("monthOctober"),
        tsl.getMessage("monthNovember"),
        tsl.getMessage("monthDecember")
    ],
    days: [
        tsl.getMessage("daySunday"),
        tsl.getMessage("dayMonday"),
        tsl.getMessage("dayTuesday"),
        tsl.getMessage("dayWednesday"),
        tsl.getMessage("dayThursday"),
        tsl.getMessage("dayFriday"),
        tsl.getMessage("daySaturday")
    ]
};

/**
 * Common label translations.
 */
var tlabels = {
    broadcast: tsl.getMessage("labelBroadcast"),
    courtesy:  tsl.getMessage("labelCourtesy")
}

document.addEventListener("DOMContentLoaded", function(event) { 
    document.title = tsl.getMessage( "appNewTab" );
    document.getElementById("broadcast").innerHTML = tlabels.broadcast;
    document.getElementById("courtesy").innerHTML = tlabels.courtesy + " ";
    document.getElementById("courtesy").appendChild( createHyperlink("unsplash.com", "https://unsplash.com") );

});

/**
 * Creates a hyperlink element.
 * @param {string} name 
 * @param {string} url
 */
function createHyperlink(name, url) {
    var link = document.createElement("A");
    link.setAttribute("href", url);
    link.textContent = name;  
    
    return link;
}