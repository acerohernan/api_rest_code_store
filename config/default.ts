import dotenv from "dotenv";
import path from "path";
dotenv.config();

export default {
    port: process.env.PORT,
    dbUri: process.env.MONGODB_URI,
    saltWorkFactor: 10,
    privateKey: process.env.TOKEN_PRIVATE_KEY,
    publicKey: process.env.TOKEN_PUBLIC_KEY,
    accessTokenDuration: "15m",
    refreshTokenDuration: "1y"
}