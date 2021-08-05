const mongoose = require("mongoose");

mongoose.model("Books", {
    //Title, author, numberPage, publisher

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPage: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
})