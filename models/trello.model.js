const mongoose=require("mongoose");

const trelloSchema=mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,required:true}
},{
    versionKey:false,
    timestamps:true
})

const TrelloModel=mongoose.model("Trello",trelloSchema)

module.exports={TrelloModel}