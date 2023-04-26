import mongoose from "mongoose";
mongoose.set('strictQuery', false);

async function ConnectDB() {
  const uri ="mongodb://127.0.0.1:27017/Saybuy";

  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.log(err);
  }
}
export { ConnectDB };
