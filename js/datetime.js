// Clock script, altered from StackOverflow answer.
// http://stackoverflow.com/a/18229123

var literalMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var literalDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

/**
 * Appends 0 if the ending digit is single.
 * @param {integer} i
 */
function checkTime(i) {
    // add a zero in front of numbers<10
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/**
 * Gets the ordinal (st, th, etc) of the date.
 * Obtained from http://stackoverflow.com/a/15397495
 * @param {integer} d
 */
function getOrdinal(d) {
  if(d > 3 && d < 21) 
    return 'th'; 

  switch (d % 10) {
        case 1:  
            return "st";
        case 2:  
            return "nd";
        case 3:  
            return "rd";
        default:
            return "th";
    }
} 

/**
 * Looping script to update an element with the current time and date.
 */
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    
    m = checkTime(m);

    var time = h + ":" + m;
    var date = today.getDay() + "<sup>" + getOrdinal( today.getDay() ) + "</sup> " + literalMonth[today.getMonth()] + " " + today.getFullYear();

    document.getElementById('time').innerHTML = time;
    document.getElementById('date').innerHTML = date;
    
    t = setTimeout(function () {
        startTime()
    }, 30000);
}
startTime();