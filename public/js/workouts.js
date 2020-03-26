
$.ajax({
    url: "/workouts",
    method: "GET",
    success: data => {
      renderWorkouts(data);
    }
})


function renderExercises(workout_id) {

$("#divExerciseList").html("");
$.ajax({
    url: `/exercises/${workout_id}`,
    method: "GET",
    success: result => {
        for (exercise of result[0].exercises) {
            $("#divExerciseList").append(`
            <div class="col-3" style=" margin-top: 1%;">
            <div class="card" style="background-color: #2533cf;">
                <div class="card-body">
                  <h6 class="card-title text-center">${exercise.exercise_name}</h6>
                  <p class="card-text text-center">Reps: ${exercise.num_of_reps}</p>
                </div>
              </div>
        </div>
            `)
        }
    }
})
}


function renderExerciseForm(workoutName) {
$("#divLoadExercises").prepend(`
<h2>Add Exercise to ${$(workoutName).text()}</h2>
<form action="/addExercise" method="post">
    <div class="form-group>
        <label for="exerciseName">Name of Exercise</label>
        <input class="form-control" type="text" name="exerciseName" value="" placeholder="Exercise">
    </div>
    <div class="form-group">
        <label for="exerciseReps">Number of Reps</label>
        <input class="form-control" type="number" name="exerciseReps" min="0" value="" placeholder="# of Reps">
    </div>
    <button class="btn btn-primary" id="addExercise">Add Exercise</button>
</form>
<hr>
`);
}

function renderWorkouts(data) {
$("#divLoadWorkouts").html(` 
<h3 style="padding-top:10px; text-align: center">Workout History</h3>
<p style="text-align:center">Click on a workout to update it.</p>
<hr style="border: 1px solid white">`)
for (workout of data) {
    $("#divLoadWorkouts").append(`
<div style="text-align:center"><button class="btn btn-link whiteLink workoutBtn" value="${workout._id}" style="text-align:center">${workout.workout_name}</button></div>`);
}
$(".workoutBtn").click(event => {
    let workoutId = $(event.currentTarget).val();
    $("#divLoadExercises").html(`
    <div id="divExerciseList" class="row"></div>
    `)
    renderExerciseForm(event.currentTarget)
    renderExercises(workoutId)  
    $("#addExercise").click((event) => {
        event.preventDefault();
        let numReps = $("input[name*='exerciseReps']").val()
        let exerciseObject = {
          workoutId: workoutId,
            exercise_name: $("input[name*='exerciseName']").val().trim(),
            num_of_reps: (numReps > 0) ? numReps : undefined
        }
        console.log(exerciseObject)
        $.ajax({
            url: "/addExercise",
            data: exerciseObject,
            method: "POST",
            success: result => {
                if (result.errors != undefined) {
                    if (result.errors.exercise_name) {
                        alert("Please enter a name")
                    } else if (result.errors.num_of_reps) {
                       alert("Please enter number of reps")
                    }
                } else {
                    renderExercises(result._id);
                }
            }
        })
    })
})
}