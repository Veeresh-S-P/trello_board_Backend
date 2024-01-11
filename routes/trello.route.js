const {Router}=require("express");
const trelloRoute=Router()
const {TrelloModel}=require("../models/trello.model")

trelloRoute.post("/trello", async(req,res)=>{
    try {
        const {name,title,description,date}=req.body;
        let newTrello=new TrelloModel({name,title,description,date})
        await newTrello.save()
        res.status(200).send({ "success": true, "message": "Trello added to board successfully"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})



trelloRoute.get("/trello",async(req,res)=>{
    try {
        const trellos = await TrelloModel.find();
        res.status(200).send({ success: true, message: "you successfully get trello details", data:trellos});
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
})

trelloRoute.put("/trello/:id", async (req, res) => {
    try {
        const trelloId = req.params.id;
        const { name, title, description, date } = req.body;

       
        const updatedTrello = await TrelloModel.findByIdAndUpdate(
            trelloId,
            { name, title, description, date },
            { new: true } 
        );

        if (!updatedTrello) {
            return res.status(404).send({ success: false, message: "trello not found" });
        }

        res.status(200).send({ success: true, message: "trello is updated", data: updatedTrello });
    } catch (error) {
        res.status(400).send({ success: false, error: error.message });
    }
});

trelloRoute.delete("/trello/:id",async(req,res)=>{
    try {
        const trelloId = req.params.id;
        let trello=await TrelloModel.findByIdAndDelete(trelloId);
        res.status(200).send({success:true,message:"trello is delete"});
      } catch (error) {
        res.status(400).send({ success: false, error: error.message });
      }
})


module.exports={trelloRoute}