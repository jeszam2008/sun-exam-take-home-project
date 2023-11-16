require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

app.use(errorHandler);

// Connect DB
connectDB();

app.listen(PORT, () => {
    console.log('App is listening to port ' + PORT);
});

