$(document).ready(function () {

    // Display for current day (whenever the day planner is opened and used)
    let currentDay = moment().format("dddd Do MMMM, YYYY");
    $("#currentDay").text(currentDay);

    // Define an array to store the time values for each hour
    let hours = [];

    // // Loop through the hours from 9am to 5pm and format them
    // for (let i = 9; i <= 17; i++) {
    //     let hour = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
    //     hours.push(hour);
    // }

    //   // build calendar by row for fix set of hours
    //   for (let hour = 9; hour <= 17; hour++) {
    //     // index for array use offset from hour
    //     let index = hour - 9;
});
