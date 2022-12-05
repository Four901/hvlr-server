






const express=require('express');

const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
require("dotenv").config()
const JWT_KEY=process.env.jwt_key

var jwt = require('jsonwebtoken');

const fetchUser=require('../middleware/fetchUser')




/*
router.delete('/deleteuser',fetchUser,async (req,res)=>{
   
    let Success=false
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select(-"password")
    const resi=await User.findByIdAndDelete(userId)
    Success=true
    res.send({Success,resi})
    }catch(error)
    {
      console.error(error.message)
        res.status(500).send({Success,error:"You Need to signup"})
    }
    
        
    })*/
/*
router.get('/getusers',fetchUser,async (req,res)=>{
   
    let Success=false
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select(-"password")
    const users=await User.find()
     console.log(users)
    Success=true
    res.send({Success,users})
    }catch(error)
    {
      console.error(error.message)
        res.status(500).send({Success,error:"You Need to Login"})
    }
    
        
    })




router.post('/updateuser',[
  
],async (req,res)=>{
  let Success=false

console.log("here i am ");
const errors = validationResult(req);
console.log("here i am "+req.body.empNo);
    if (!errors.isEmpty()) {
      return res.status(400).json({Success, errors: errors.array() });
    }
    //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
    try{
      console.log("here i am "+req.body.empNo);
      let user1=await User.findOne({empNo:req.body.empNo});
      console.log(req.body.name)
      if(!user1)
      {
         return res.status(400).json({Success,error:"User with the emp no does not exists"});
      }
      const salt=await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt);
      console.log(req.body)

      //followings
      let followings_list=user1.followings;
      if(req.body.followings)
      {
      const req_array_followings=(req.body.followings).split(" ");
      console.log(req_array_followings);
      req_array_followings.map((follow)=>{
       // console.log(follow)
       if(!followings_list.includes(follow))followings_list.push(follow)
      })
      }
     
      let followers_list=user1.followers;
     if(req.body.followers){ 
      const req_array_followers=(req.body.followers).split(" ");
      console.log(req_array_followers);
      req_array_followers.map((follow)=>{
       // console.log(follow)
       if(!followers_list.includes(follow))followers_list.push(follow)
      })}
    //  console.log(followings_list)
     // followings_list=followings_list.split(" ")
      //(listi).map((follow)=>{followings_list.concat(follow)})
     // const listi1=req.body.followings;
     
    //  (req.body.followings).map((follow)=>{followings_list.concat(follow)})
  
      const user= await User.findOne({empNo:req.body.empNo}).updateOne({
        name: req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        empNo:req.body.empNo,
        userName:req.body.userName,
        dobDate:req.body.dobDate,
        dateOfJoining:req.body.dateOfJoining,
        password: secPass,
        followings:followings_list,
        followers:followers_list,

      })
      console.log(req.body)
      console.log(user)
      var data={
        "id":req.body.id
      }
      let Success=true
      res.json({Success,user})
   
      //.then(user => res.json(user))
      //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
    }catch(error){
      console.error(error.message)
      res.status(500).send({Success,error:"Some error occured 235"})
    }

      
})

*/






router.post('/createuser',[
 
  body('email','Enter a valid mail').isEmail(),
  body('Password','Password should be atleast of 5 chars').isLength({ min: 5 }),
 

 
],async (req,res)=>{
let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/

const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  try{
   
    let user=await User.findOne({email:req.body.email});
  
    if(user)
    {
       return res.status(400).json({Success,error:"User with the mail already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.Password,salt);
   
    user= await User.create({
    
      email:req.body.email,
      password: secPass
    })
   
  
    let Success=true
    res.json({Success,user})
  /*  var AuthToken=jwt.sign(data,JWT_KEY);
    console.log(AuthToken)
    res.json(AuthToken)
    var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
   // console.error(error.message)
    res.status(500).send({Success,error:"Some error occured 235"})
  }

    
})




router.post('/loginuser',[
  body('email',"Please Enter the email"),
  // password must be at least 5 chars long
  body('Password',"Password can not be blank"),
],async (req,res)=>{
  let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  const {email,Password}=req.body;
  console.log("hey bro")
  
  try{

    let user=await User.findOne({email:req.body.email});
    if(!user)
    {
       return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
    var passwordCompare=await bcrypt.compare(Password,user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
   
    var data={
      user:{
        id:user.id
      }
    }
  
    var AuthToken=jwt.sign(data,JWT_KEY);//over here we are signing the jwtauth token which is containing the id of the user
    
    
    Success=true
    res.json({Success,AuthToken})
    /*var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    
    res.status(500).send({Success,error:"Internal Server Error"})
  }

    
})



router.post('/loginuser1',async (req,res)=>{
  let Success=false
/*console.log(req.body)
const user=User(req.body)
user.save();
res.send(req.body)*/
console.log("loog")

const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({Success, errors: errors.array() });
  }
  //so from the user schema we have removed info about which one to make indexes , now we need to do a operation to check whether the user with current mail exits or not 
  
  console.log("hey bro + body")
  console.log(req.body)
  console.log(req.header.email)
  console.log(req.headers)
  console.log(req.rawHeaders)
  console.log(req.rawHeaders.email)
  console.log(req.email)
  console.log(req.password)
const email=req.headers.email;
const Password=req.headers.password
console.log(email+" "+Password)
  try{

    let user=await User.findOne({email:email});
    if(!user)
    {
       return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
    var passwordCompare=await bcrypt.compare(Password,user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({Success,error:"Enter The Correct Credentials"});
    }
   
    var data={
      user:{
        id:user.id
      }
    }
  
    var AuthToken=jwt.sign(data,JWT_KEY);//over here we are signing the jwtauth token which is containing the id of the user
    
    
    Success=true
    res.json({Success,AuthToken})
    /*var decoded = jwt.verify(AuthToken, JWT_KEY);
console.log(decoded)*/
    //.then(user => res.json(user))
    //.catch(errors,res.json({"msg":"Please enter a valid mail"}));
  }catch(error){
    
    res.status(500).send({Success,error:"Internal Server Error"})
  }

    
})









module.exports=router

//the hashing is the algorithm to store the paqssword in the form of hash means rather than storing the plan text password 
//backend will put the hashed code into the table 
//salt is used to make the hashed code more compliacted to that common passwords can't be broken 
//also pepper is used to make more security by adding after salt
//for these things we are going to use bcycripts.js