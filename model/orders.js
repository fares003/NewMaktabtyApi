const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  email: {
    type: String, 
    required:true
  },
  city:{
    type: String, 
    required:true 
  },
  street:{
    type: String, 
    required:true
  },
  building:{
    type: String, 
    required:true
  },
  phone:{
    type: String, 
    required:true
  },
  state:{
    type: String, 
    required:true
  },
  amount:{
    type: String, 
    required:true
  },
  payment:{
    type: String, 
    required:true
  },
books:{
    type:[String],
    required:true
},
refund:{
type:String,
default: "no"

}
});

module.exports = mongoose.model('Orders', ordersSchema);
