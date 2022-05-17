import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

export async function connect(){
    const dbUri = config.get<string>("dbUri");

    try{
        await mongoose.connect(dbUri);
        logger.info("DB is connected");
    }catch (error){
        logger.error("Could not connect to db");
        process.exit(1);
    }
};