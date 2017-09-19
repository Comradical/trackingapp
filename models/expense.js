var mongoose = require("mongoose");

var ExpenseSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    source: String,
    campaign: {
        name: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign"
        }
      }, 
    amount: Number
});

module.exports = mongoose.model("Expense", ExpenseSchema);