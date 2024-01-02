const mongoose = require("mongoose");
const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_connect);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports=mongoConnect;