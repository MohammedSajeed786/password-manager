const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sajeed:Sajeed07@cluster0.beyma.mongodb.net/passwordManager?retryWrites=true&w=majority";
// "mongodb://localhost:27017/passwordManager?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    // console.log("connected to mongo sucessfully");
  });
};
module.exports = connectToMongo;
// php=express
// sql=mongoose
// mysql db=mongodb
