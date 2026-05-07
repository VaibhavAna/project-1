const mongoose =rewuire("mongoose");

const connectDB=async()=>{

    try{
        await mongoose(process.env.MONGO_URI);// To be filled 
        console.log("MongoDB connected ")

    }catch(err){
        console.error(error.message);
    }
}