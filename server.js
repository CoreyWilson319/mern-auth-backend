require('dotenv').config();
// Imports
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require('./config/passport')
const PORT = process.env.PORT || 8000;

// API
const users = require('./api/user')

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Smile, you're being watched by the Backend Engineering Team"})
});

app.use(require('./api/users'), users)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});