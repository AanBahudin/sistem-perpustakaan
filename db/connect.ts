import mongoose from "mongoose";

const databaseConnectionFunction = async(URL_CONNECTION : string) => {
    mongoose.connect(URL_CONNECTION)
}

export default databaseConnectionFunction