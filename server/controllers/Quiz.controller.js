const { Quiz } = require('../models/quiz.model');


module.exports.createQuiz = (req, res) => {
    const {question, answers, right_answer} = req.body;
    Quiz.create({
        question,
        answers, 
        right_answer
    })
        .then(quiz => res.json( quiz ))
        .catch(err => res.status(400).json(err));
};

module.exports.allQuizes = (req, res) => {
    Quiz.find({})
        .then(quizes => res.json( quizes ))
        .catch(err => res.status(400).json(err));
};

module.exports.getOne = (req, res) => {
    Quiz.findOne({ _id: req.params.id })
    .then(quiz => res.json({ quiz }))
    .catch(err => res.status(400).json(err));
};

module.exports.update = (req, res) => {
    const { id } = req.params;
    const {question, answers, right_answer} = req.body;
    Quiz.findOneAndUpdate({ _id: id }, {
        question,
        answers,
        right_answer
    },
    {
        new: true,
        useFindandModify: true,
        runValidators:true
    })
    .then(updatedQuiz => res.json(updatedQuiz))
    .catch(err => res.status(400).json(err));
};

module.exports.remove = (req, res) => {
    Quiz.deleteOne({ _id: req.params.id })
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.status(400).json(err));
};