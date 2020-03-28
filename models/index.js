const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    workout_name: {
        type: String,
        unique: true,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
    created: {
        type: Date
    }
});
const exerciseSchema = new Schema({
    exercise_name: {
        type: String,
        required: true
    },
    num_of_reps: {
        type: Number,
        required: true
    }
});
const Workout = mongoose.model("Workout", workoutSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = {Workout, Exercise};
