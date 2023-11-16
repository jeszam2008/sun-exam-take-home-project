require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log('App is listening to port ' + PORT);
});

