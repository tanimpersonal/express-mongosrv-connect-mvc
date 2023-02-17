const { ObjectId } = require("mongodb");
const dbConnect = require("../utils/dbConnect");
const { getDb } = require("../utils/dbConnect")

module.exports.allUsers=async (req,res,next)=>{
    try {
        const {page,limit}= req.query;
        const db=getDb();
    let collection= await db.collection("person").find({}).skip(+page*limit).limit(+limit).toArray();
    
    res.status(200).json({success:true, data:collection});
    } catch (error) {
        next(error)
    }
}
module.exports.userDetail=async (req,res,next)=>{
    try {
        const db = getDb();
        const {id} = req.params; 
        
        if(!ObjectId.isValid(id)){
            return res.status(400).json({success:false, error:"Not a valid object id"})
        }
        const result= await db.collection("person").findOne({_id:new ObjectId(id)});
        console.log(result)
        if(!result){
            return res.status(400).json({success:false, error:"No matched"})
        }
        
        res.status(200).json({success:true, data:result}) 
    } catch (error) {
        next(error)
    }
}

module.exports.postUser= async(req,res,next)=>{
    try {
        const db=getDb();
    let collection= await db.collection("person");
    let newDoc= req.body; 
    console.log(newDoc);
    let result= await collection.insertOne(newDoc);
    res.send(result)
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser=async (req,res,next) => {
    try {
        const db = getDb(); 
        const {id}= req.params;
        const doc= req.body;
        const update= await db.collection("person").updateMany({quantity:{$exists:false}}, {$set:{quantity:5}});
        // {_id:new ObjectId(id)}, {$set:{doc}}
        if(!update){
            return res.status(400).json({success:false, error: "Not found"})
        }
        if(!update.modifiedCount){
            res.status(400).json({success:false, error:"Not updated"})
        }
        console.log(update)
        res.status(200).json({success:true, data:update})
    } catch (error) {
        next(error)
    }
}


module.exports.deleteUser=async (req,res,next) => {
    try {
        const db = getDb(); 
        const {id}= req.params;
        const doc= req.body;
        const update= await db.collection("person").deleteOne({_id:new ObjectId(id)});
        // {_id:new ObjectId(id)}, {$set:{doc}}
        if(!update){
            return res.status(400).json({success:false, error: "Couldn't found the tool"})
        }
        if(!update.deletedCount){
            res.status(400).json({success:false, error:"Not deleted"})
        }
        console.log(update)
        res.status(200).json({success:true, data:update})
    } catch (error) {
        next(error)
    }
}