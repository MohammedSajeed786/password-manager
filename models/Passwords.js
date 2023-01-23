const mongoose = require("mongoose");
const { Schema } = mongoose;
const PasswordsSchema = new Schema({
  user:{
   type:Schema.Types.ObjectId,
   ref:'user'
  },
  platform: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password:{
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports=mongoose.model("passwords",PasswordsSchema);
