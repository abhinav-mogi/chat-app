const exp = require("express");
const userApp = exp.Router();



const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
userApp.use(exp.json())
const asynchandler=require('express-async-handler')


userApp.get("/get-users",asynchandler(async(request,response)=>{
  try{
    const userObj=request.app.get("userCollection")
    let userlist=await userObj.find().toArray()

  response.status(200).send({message:"users",payload:userlist})
}catch{
  response.status(500).send({message:"error"});
}
}))

userApp.post("/register",asynchandler(async(request,response)=>{

  const userObj=request.app.get("userCollection")

  const newUser=request.body;

  const userOfDB= await userObj.findOne({username:newUser.username})

  if(userOfDB!=null){
    response.status(200).send({message:"User already exists"})
  }
  else{
    let hashedPassword=await bcryptjs.hash(newUser.password,4)

    newUser.password=hashedPassword;

    await userObj.insertOne(newUser)
    
    response.status(201).send({message:"User created"})
  }
}))

userApp.post('/login',asynchandler(async(request,response)=>{
  const userObj=request.app.get("userCollection")
  const userCredentials=request.body;

  let userOfDB=await userObj.findOne({username:userCredentials.username})
  console.log(userOfDB)

  if(userOfDB===null){
    response.status(200).send({message:"Invalid username"})
  }
  //if username is valid
  else{
    //compare passwords
    let isEqual=await bcryptjs.compare(userCredentials.password,userOfDB.password)
    if(isEqual===false){
      response.status(200).send({message:"Invalid password"})
    }
    else{
      //create JWT token
      let jwtToken=jwt.sign({username:userOfDB.username},"abcdef",{expiresIn:"1d"})
      response.status(200).send({message:"success",token:jwtToken,username:userOfDB})
    }

  }

}))

module.exports = userApp;