const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

//main partner-supervisor
const PartnerSchema = new Schema({
  id: { type : Number, required: true },
  name: { type : String, required: true, trim: true },
  email: { type : String, required: true, trim: true },
  phone: { type : Number, required: true }
});

module.exports = mongoose.model('Partner', PartnerSchema);
