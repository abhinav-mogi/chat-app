const exp = require("express");
const app = exp();
var cors = require('cors')

app.use(cors())
const port=4000;
app.listen(port, () => console.log("server listening on port 4000..."));
const mclient=require("mongodb").MongoClient;
mclient.connect('mongodb://127.0.0.1:27017')
.then(Ref=>{

  let dbObj=Ref.db('chat-app')
  let userCollection=dbObj.collection("users")

  app.set("userCollection",userCollection)

  console.log("Connected to DB successfully")
})
.catch(err=>console.log("Connection err is ",err))

const userApp=require("./API/userAPI")

app.use("/user-api", userApp);