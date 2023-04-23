const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const transactionSchema=mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
    

})
module.exports=mongoose.model("Transaction",transactionSchema)