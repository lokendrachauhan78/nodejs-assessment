const mongoose = require("mongoose");

class Database {
    static connect() {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));
    }
}

module.exports = Database;