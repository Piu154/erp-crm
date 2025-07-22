const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://piu:4SsBu5a7PlwbVMja@erp.ld4ptdv.mongodb.net/erp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SettingSchema = new mongoose.Schema({
  default_currency_code: String,
  currency_symbol: String,
  currency_position: String,
  decimal_sep: String,
  thousand_sep: String,
  cent_precision: Number,
  zero_format: Boolean,
  language: String,
  removed: Boolean,
  isPrivate: Boolean,
  enabled: Boolean,
  last_invoice_number: Number,
  created: { type: Date, default: Date.now },
});

const Setting = mongoose.model('Setting', SettingSchema);

Setting.create({
  default_currency_code: "INR",
  currency_symbol: "₹",
  currency_position: "before",
  decimal_sep: ".",
  thousand_sep: ",",
  cent_precision: 2,
  zero_format: true,
  language: "en",
  removed: false,
  isPrivate: false,
  enabled: true,
  last_invoice_number: 100,
  created: new Date()
}).then(() => {
  console.log("✅ Setting inserted successfully");
  mongoose.disconnect();
}).catch(err => {
  console.error("❌ Error inserting setting:", err);
  mongoose.disconnect();
});
