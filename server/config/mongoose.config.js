const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quizdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('database connected, all systems go!'))
    .catch(err => console.log('encountered problems trying to connect to the database', err));