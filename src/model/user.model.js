const { default: mongoose } = require("mongoose");

var userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        pwd: String,
        createdDate:"date",
        updatedDate:"date"
    },
    {
        timestamps:
        {
            createdDate: "created_at",
            updatedDate: "updated_at"
        }
    });

module.exports = mongoose.model("user", userSchema);