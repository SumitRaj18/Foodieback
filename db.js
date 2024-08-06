const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/FoodieNation";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI,{useNewUrlParser: true});
        console.log("Connected to MongoDB");
        
        const fetched_data = await mongoose.connection.db.collection("Food");
        const data = await fetched_data.find({}).toArray();
        console.log(data);
        
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const Catdata = await foodCategory.find({}).toArray();
        console.log(Catdata);

        global.Food = data;
        global.foodCategory = Catdata;
        
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Exporting the connection function

mongoDB()
module.exports = mongoDB;