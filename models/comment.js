const mongoose = require("mongoose"),
//S C H E M A   S E T U P
      commentSchema = mongoose.Schema({
        text: String,
        author: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          username: String
        }
      });

module.exports = mongoose.model("Comment", commentSchema);
