const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const DBConnect = require('./config/database');
const route = require('./routes/route');
const path = require('path');
app.use(express.urlencoded({ extended: true }));

// create app instance
app.use(bodyParser.json());

// Middle ware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// database connect
try {
    DBConnect();
} catch (err) {
    console.error("Error connecting to the database:", err.message);
}

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Lions Den Fight Club. This is the backend PART</h1>`)
});

// Route middle ware for '/api/v1'
app.use('/api/v1', route);

// Serve static files from the "files" directory
app.use('/api/v1/files', express.static(path.join(__dirname, 'ImagesFiles')));
app.use('/api/v1/blog/files', express.static(path.join(__dirname, 'BlogImages')));
