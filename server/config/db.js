const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoConn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected: ' + mongoConn.connection.host);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
