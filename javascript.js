$(document).ready(function() {
    // Display current day at the top of the calendar
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    // Create timeblocks for standard business hours
    var startTime = 9;
    var endTime = 17;


  // Create timeblocks for standard business hours
  var startTime = 9;
  var endTime = 17;
  for (var i = startTime; i <= endTime; i++) {
    // Create the hour row
    var hourRow = $("<div>").addClass("row time-block").attr("id", "hour-" + i).attr("data-hour", i);
    var hourCol = $("<div>").addClass("col-sm-2 hour").text(i + ":00");
    var eventCol = $("<div>").addClass("col-sm-8");
    var eventArea = $("<textarea>").addClass("description form-control");
    var saveCol = $("<div>").addClass("col-sm-2");
    var saveBtn = $("<button>").addClass("saveBtn btn").html("<i class='fas fa-save'></i>");

    // Append the columns to the hour row
    hourRow.append(hourCol);
    eventCol.append(eventArea);
    hourRow.append(eventCol);
    saveCol.append(saveBtn);
    hourRow.append(saveCol);

    // Append the hour row to the timeblocks container
    $("#timeblocks").append(hourRow);

    // Check if an event is saved in local storage for each hour
    var event = localStorage.getItem("event-" + i);
    if (event) {
      $(".time-block[data-hour='" + i + "'] textarea").val(event);
    }
  }

  // Color-code timeblocks based on past, present, and future
  var currentHour = moment().hour();
  $(".row").each(function() {
    var hour = $(this).attr("data-hour");
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Save event when save button is clicked
  $(".saveBtn").on("click", function() {
    var hour = $(this).parent().parent().attr("data-hour");
    var event = $(this).parent().parent().find("textarea").val();
    localStorage.setItem("event-" + hour, event);
  });
});

