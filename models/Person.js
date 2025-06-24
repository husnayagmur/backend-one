const mongoose=require("mongoose");

const PersonSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    age:{type:Number,},
     created_at:{type:Date,default:Date.now},
})

module.exports = mongoose.model("Person", PersonSchema);