var mongoose = require("mongoose");

var ExpenseSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    source: String,
    amount: Number
});

module.exports = mongoose.model("Expense", ExpenseSchema);