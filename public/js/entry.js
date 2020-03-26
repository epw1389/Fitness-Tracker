$("#btnAddWorkout").click(function(){
    event.preventDefault();

    
    var workoutData = {};
    workoutData.workout_name = $("#workout_name").val();
    workoutData.created = Date.now();

    fetch("/submitWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData)
      });

      $("#addAlert").fadeIn();
      $("#addAlert").fadeOut(4000);
    console.log(workoutData);
})