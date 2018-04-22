var mongoose = require("mongoose");

var ExpenseSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    title: String,
    date: Date,
    amount: Number
});

module.exports = mongoose.model("Expense", ExpenseSchema);