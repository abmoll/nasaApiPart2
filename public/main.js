$(document).ready(function() {
  console.log("ready!");
});

  $("#form").submit(function(event) {
    event.preventDefault();
    var sD = document.getElementById("startDate").value;
    var eD = document.getElementById("endDate").value;
    console.log(sD)
    console.log(eD)

    //send start and end dates to the server
    $.get(`/api?start_date=${sD}&end_date=${eD}`, function(body, status) {
      //console.log(body)
      body = JSON.parse(body);
      console.log(body)

      var hazardous = []
      for (var day in body.near_earth_objects) {
        //populate all hazardous asteroids into an array
        for (var i = 0; i < body.near_earth_objects[day].length; i++) {
          if (body.near_earth_objects[day][i].is_potentially_hazardous_asteroid) {
            hazardous.push(body.near_earth_objects[day][i])
          }
        }
      }
      //sort largest asteroids first by max diameter
      hazardous.sort(function(a, b) {
        return b.estimated_diameter.feet.estimated_diameter_max - a.estimated_diameter.feet.estimated_diameter_max
      })

      for (var i in hazardous) {
        // for loop around hazardous .append hazardous.name ...
        $(".theScreen").append("<br><p>Asteroid Name: " + hazardous[i].name + "</p>")
        $(".theScreen").append("<p>Velocity MPH: " + Math.round(hazardous[i].close_approach_data[0].relative_velocity.miles_per_hour) + "</p>")
        $(".theScreen").append("<p>Max Diameter Feet: " + Math.round(hazardous[i].estimated_diameter.feet.estimated_diameter_max) + "</p>")
        $(".theScreen").append("<p>Distance from Earth in Miles: " + hazardous[i].close_approach_data[0].miss_distance.miles + "</p>")
      }

    });

  });
