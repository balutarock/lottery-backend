const mongoose = require("mongoose");

const Results = new mongoose.Schema(
    {
        first_price: { "amount": { type: String, default: "10,00,000" }, ticket_number: { type: String } },
        second_price: { "amount": { type: String, default: "5,00,000" }, ticket_number: { type: String } },
        third_price: { "amount": { type: String, default: "1,20,000" }, ticket_number: { type: String } },
        fourth_price: { "amount": { type: String, default: "50,000" }, ticket_number: { type: String } },
        fifth_price: { "amount": { type: String, default: "20,000" }, ticket_number: { type: String } },
        sixth_price: { "amount": { type: String, default: "15,000" }, ticket_number: { type: String } },
        seventh_price: { "amount": { type: String, default: "6,000" }, ticket_number: { type: String } },
        eight_price: { "amount": { type: String, default: "6,000" }, ticket_number: { type: String } },
        ninth_price: { "amount": { type: String, default: "5,000" }, ticket_number: { type: String } },
        tenth_price: { "amount": { type: String, default: "5,000" }, ticket_number: { type: String } },
        eleventh_price: { "amount": { type: String, default: "4,000" }, ticket_number: { type: String } },
        category: { type: String, default: "Normal" },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    }, { collation: { locale: 'en_US', strength: 1 } }
);

const resultsModel = mongoose.model("results", Results);

module.exports = resultsModel