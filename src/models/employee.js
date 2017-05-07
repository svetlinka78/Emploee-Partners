const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Partner = require('./partner');

//console.log(State);
//other partners
const PartnersSchema = new Schema({
  name: { type : String, required: true, trim: true },
  email: { type : String, required: true, trim: true },
  phone: { type : Number, required: true }
});

const EmployeeSchema = new Schema({
  name        : { type : String, required: true, trim: true },
  position    : { type : String, required: true, trim: true },
  partnerId     : { type : Number, required: true },
  partner       : Partner.schema ,
  partners      : [ PartnersSchema ]
});
//obj,shema,foreach var
module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');
