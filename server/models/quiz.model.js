const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'You must enter a question'],
            minlength: [3, 'Question must have a minimum of 3 characters']
        },
        answers: {
            type: Array,
            required: [true, 'You must enter 4 options to the question'],
        },
        right_answer: {
            type: String,
            required: [true, 'There must be a right answer entered']
        }
    },
    {timestamps: true}
);

module.exports.Quiz = mongoose.model('Quiz', QuizSchema);