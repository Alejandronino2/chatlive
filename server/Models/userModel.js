const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 50 },
    email: { type: String, require: true, minlength: 3, maxlength: 200, unique: true },
    password: { type: String, require: true, minlength: 3, maxlength: 200 },
},
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;