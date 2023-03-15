import * as mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB Connected', connect.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}