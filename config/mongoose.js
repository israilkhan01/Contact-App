//require the library
const mongoose=require('mongoose');
//connect to the database
mongoose.connect("mongodb://localhost/contact_list_DB");
//auquire the connection(if connection is succesfull)
const db=mongoose.connection;
//error
db.on("error",console.error.bind(console,"error connecting to db"));

//up and run then print the message
db.once('open',function(){
    console.log("succesful connected to database");
})
