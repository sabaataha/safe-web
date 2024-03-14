const mongoose = require("mongoose");

const gameroomSchema = new mongoose.Schema(
    {
        pin: {
            type: mongoose.Schema.Types.ObjectId,
            required: "Pin code is required!"
        },
});

module.exports = mongoose.model("Gameroom", gameroomSchema);