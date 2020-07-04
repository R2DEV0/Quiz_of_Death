const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require('dotenv').config();

require('./server/config/mongoose.config');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./server/routes/quiz.routes')(app);

app.listen(8000, () => console.log('listening on port: 8000'));
