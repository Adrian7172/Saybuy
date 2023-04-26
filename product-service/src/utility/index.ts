import { ConnectDB } from "./db-connection";
ConnectDB()
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => console.log(err));
