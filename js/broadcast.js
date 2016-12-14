// Requires JQuery

$(document).ready(function() {
    var label = $("#broadcast").html();
    $('body').on('mouseover', 'img.favicon', function(e) {
        if ( e.target.title != "") {
            $("#broadcast").html( e.target.title );
        } else {
            $("#broadcast").html(e.target.parentNode.href);
        }
    });

    $('body').on('mouseleave', 'img.favicon', function(e) {
        $("#broadcast").html(label);
    });

});