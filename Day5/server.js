const app= require("./src/app")
const mongoose= require("mongoose")

function connectToDb(){
    const connect = mongoose.connect("mongodb+srv://krishna4593:krishna45934593@cluster0.i2zln6z.mongodb.net/day-5")
    .then(() => {
    console.log("DB connected");
})
}
connectToDb();


app.listen(3000)