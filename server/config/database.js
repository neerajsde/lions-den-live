const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = async() => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("✅ Database connected successfully.");
    })
    .catch((err) => {
        console.log("❌ Database not connected");
        console.log(err);
        process.exit(1);
    });
}

module.exports = DBConnect;
