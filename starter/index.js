$(document).ready(function () {

    // Display for current day (whenever the day planner is opened and used)
    let currentDay = moment().format("dddd Do MMMM, YYYY");
    $("#currentDay").text(currentDay);

// Forming a working schedule between 9 -5pm
    let hours = [];
    for (let i = 9; i <= 17; i++) {
        let hour = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        hours.push(hour);
    }



    // creating time blocks
    hours.forEach((hour, index) => {
        let timeBlockSlot = $("<div>").addClass("time-block row");
        let hourSlot = $("<div>").addClass("hour col-2").text(hour);
        // ID for each input
        let scheduleInput = $("<input>")
            .addClass("scheduleInput col-8")
            .attr("id", `input-${index}`
            );



        // Local Storage
        let currentNewEvent = `inputActivity${index}`;
        let storedSchedule = localStorage.getItem(currentNewEvent);

        //If there is a stored schedule, we want to save it if its form today hence use split to divide the array
        if (storedSchedule) {
            let splitInputActivity = storedSchedule.split("<>");
            if (splitInputActivity[1] === currentDay) {
                scheduleInput.val(splitInputActivity[0]);
            } else {
                // if not from today, remove from storage
                localStorage.removeItem(currentNewEvent);
            }
        }

        // make a save button
        let saveData = $("<button>")
            .addClass("saveBtn col-2")
            .html("<i class='fas fa-save'></i>");

        // click save button
        saveData.click(function () {
            // Save the current schedule to local storage with the date
            localStorage.setItem(
                currentNewEvent,
                scheduleInput.val() + "<>" + currentDay
            );

            // saveCHanges
            let timeout;
            let saveMessage = $("<p>").addClass("message").text("New changes have been made!");
            if (timeout != null) {
                clearTimeout(timeout);
            } else {
                $(".jumbotron").append(saveMessage);
            }

        });

        timeBlockSlot.append(hourSlot).append(scheduleInput).append(saveData);

        $(".container").append(timeBlockSlot);

    });

    // check if the hour is in the past present or future and assign a class
    for (let i = 0; i < hours.length; i++) {

        // starts at 0 so +9 (0 + 9) so that it represents 9am
        let eachtimeBlock = moment().hour(i + 9);
        // input-${i} corresponds with the unique id of each element 
        let currentIndex = $(`#input-${i}`);

        if (moment().isBefore(eachtimeBlock)) {
            currentIndex.addClass("future");
        } else if (moment().isAfter(eachtimeBlock)) {
            currentIndex.addClass("past");
        } else {
            currentIndex.addClass("present");
        }
    }
});

//attempted colour change grid to differentiate between past present and future 

function colorChange() {
    var hourBlock = moment().hours();
  
    $(".time-block").each(function () {
      var currentHour = parseInt($(this).attr("id"));
  
      if (currentHour > hourBlock) {
        $(this).addClass("future");
      } else if (currentHour === hourBlock) {
        $(this).addClass("present");
      } else {
        $(this).addClass("past");
      }
    });
  }
  
  colorChange();

