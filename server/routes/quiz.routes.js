const QuizController = require('../controllers/Quiz.controller');

module.exports = function(app){
    app.get('/api/quiz', QuizController.allQuizes);
    app.post('/api/quiz', QuizController.createQuiz);
    app.get('/api/quiz/:id', QuizController.getOne);
    app.put('/api/update/:id', QuizController.update);
    app.delete('/api/quiz/:id', QuizController.remove);
}