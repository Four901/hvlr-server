



const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')
const fetchUser1=require('../middleware/fetchUser1')
const Device=require('../models/Device')
var jwt = require('jsonwebtoken');
const JWT_KEY=process.env.jwt_key
const { body, validationResult } = require('express-validator');
 //this will give the all the notes of a loggedin user



router.post('/adddevice/',fetchUser,[
 
  /*  [body('title','Enter a valid title').isLength({ min: 3 })],
    [body('description','Enter a valid description').isLength({ min: 5 })],
    body('type','Enter a valid type').isLength({ min: 3 }),
*/

    
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
      
         console.log("adding")
       let count=await Device.countDocuments({user:req.user.id})

        const device=new Device({
         user:req.user.id,
         Number:count+1
        })
  
        const saveddevice=await device.save();
        res.json(saveddevice)
  
      }catch(error)
      {
          console.error(error.message)
          res.status(500).send("Some error occured")
      }
    })

router.put('/updatedevice/:id',fetchUser,[
    

        
    ],async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try{
           // console.log(req)
        const {D0,D1,D2,D3,D4,D5,D6,D7,D8,status,camStatus}=req.body
        console.log(req.params.id)
        const newDevice={}
      
        if(D0!=null){newDevice.D0=D0}
        if(D1!=null){newDevice.D1=D1}
        if(D2!=null){newDevice.D2=D2}
        if(D3!=null){newDevice.D3=D3}
        if(D4!=null){newDevice.D4=D4}
        if(D5!=null){newDevice.D5=D5}
        if(D6!=null){newDevice.D6=D6}
        if(D7!=null){newDevice.D7=D7}
        if(D8!=null){newDevice.D8=D8}
        if(status!=null){newDevice.status=status}
        if(camStatus!=null){newDevice.camStatus=camStatus}
        
 
 
        let device=await Device.findById(req.params.id)
        if(!device){return res.status(404).send("Not Found")}
        if(device.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
         
       // if(newReply.question==null)newReply.question=post.question
        if(newDevice.D0==null)newDevice.D0=device.D0
        if(newDevice.D1==null)newDevice.D1=device.D1
        if(newDevice.D2==null)newDevice.D2=device.D2
        if(newDevice.D3==null)newDevice.D3=device.D3
        if(newDevice.D4==null)newDevice.D4=device.D4
        if(newDevice.D5==null)newDevice.D5=device.D5
        if(newDevice.D6==null)newDevice.D6=device.D6
        if(newDevice.D7==null)newDevice.D7=device.D7
        if(newDevice.D8==null)newDevice.D8=device.D8
        if(newDevice.status==null)newDevice.status=device.status
        if(newDevice.image==null)newDevice.image=device.image
        if(newDevice.camStatus==null)newDevice.camStatus=device.camStatus

        
        device=await Device.findByIdAndUpdate(req.params.id,newDevice)
        res.json({device})
         }
         catch(error)
     {
         console.error(error.message)
         res.status(500).send("Some error occured")
     }
        })



router.put('/updatestatus',fetchUser1,[
    

        
        ],async (req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            try{
               // console.log(req)
            const status=req.headers.status;
            let id=req.headers.id;
           
            id = id.substring(1, id.length-1);

            console.log(status.toString()+" "+id)
            const newDevice={}
          
            
            if(status.toString()=="online"){newDevice.status=status.toString()}
            
     
     
            let device=await Device.findById(id)
            if(!device){return res.status(404).send("Not Found")}
            if(device.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
             
           // if(newReply.question==null)newReply.question=post.question
            if(newDevice.D0==null)newDevice.D0=device.D0
            if(newDevice.D1==null)newDevice.D1=device.D1
            if(newDevice.D2==null)newDevice.D2=device.D2
            if(newDevice.D3==null)newDevice.D3=device.D3
            if(newDevice.D4==null)newDevice.D4=device.D4
            if(newDevice.D5==null)newDevice.D5=device.D5
            if(newDevice.D6==null)newDevice.D6=device.D6
            if(newDevice.D7==null)newDevice.D7=device.D7
            if(newDevice.D8==null)newDevice.D8=device.D8
            if(newDevice.status==null)newDevice.status=device.status
            if(newDevice.image==null)newDevice.image=device.image
            if(newDevice.camStatus==null)newDevice.camStatus=device.camStatus
    
            
            device=await Device.findByIdAndUpdate(id,newDevice)
           
             }
             catch(error)
         {
             console.error(error.message)
             res.status(500).send("Some error occured")
         }
            })

router.put('/updateimage',fetchUser1,[
    

        
            ],async (req,res)=>{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                try{
                   // console.log(req)
                   console.log("at image")
               const imagei=req.headers.image;
                const camStatus=req.headers.camstatus;
                let id=req.headers.id;
                 console.log(req.headers)
                id = id.substring(1, id.length-1);
    
                console.log(imagei+" "+id)
                const newDevice={}
                const image=imagei.split(",");
                console.log(image)
                let newImage=[];
                for(let j=0;j<image.size();i++)
                {
                  newImage[i]=Number(image[i]);
                }
                console.log(newImage)
               let arr= new Uint16Array(newImage).buffer;
               console.log(arr)
                newDevice.image=arr;
                newDevice.camStatus=camStatus.toString();
                console.log(newDevice)
                //some way to convert string into buffer
               // if(image.toString()=="online"){newDevice.image=image.toString()}
                
         
         
                let device=await Device.findById(id)
                if(!device){return res.status(404).send("Not Found")}
                if(device.user.toString()!==req.user.id){return res.status(404).send("Not Allowed")}
                 
               // if(newReply.question==null)newReply.question=post.question
                if(newDevice.D0==null)newDevice.D0=device.D0
                if(newDevice.D1==null)newDevice.D1=device.D1
                if(newDevice.D2==null)newDevice.D2=device.D2
                if(newDevice.D3==null)newDevice.D3=device.D3
                if(newDevice.D4==null)newDevice.D4=device.D4
                if(newDevice.D5==null)newDevice.D5=device.D5
                if(newDevice.D6==null)newDevice.D6=device.D6
                if(newDevice.D7==null)newDevice.D7=device.D7
                if(newDevice.D8==null)newDevice.D8=device.D8
                if(newDevice.status==null)newDevice.status=device.status
                if(newDevice.image==null)newDevice.image=device.image
                if(newDevice.camStatus==null)newDevice.camStatus=device.camStatus
        
                
                device=await Device.findByIdAndUpdate(id,newDevice)
               
                 }
                 catch(error)
             {
                 console.error(error.message)
                 res.status(500).send("Some error occured")
             }
                })            
        
        
router.get('/getdevices/',fetchUser,[
    

        
        ],async (req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            try{
               // console.log(req)
            
           
          
            let device=await Device.find({user:req.user.id})
            res.json({device})
             }
             catch(error)
         {
             console.error(error.message)
             res.status(500).send("Some error occured")
         }
            })
router.get('/getdevice',fetchUser1,async (req,res)=>{
             
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                try{
                   // console.log(req)
                
                   const number=parseInt(req.headers.number);
    
                let device=await Device.find({user:req.user.id,Number:number})
                
                let sendDevice=[];
               
                sendDevice.push(device[0]._id);
                sendDevice.push(device[0].D0);
                sendDevice.push(device[0].D1);
                sendDevice.push(device[0].D2);
                sendDevice.push(device[0].D3);
                sendDevice.push(device[0].D4);
                sendDevice.push(device[0].D5);
                sendDevice.push(device[0].D6);
                sendDevice.push(device[0].D7);
                sendDevice.push(device[0].D8);

                
                res.json(sendDevice)
                 }
                 catch(error)
             {
                 console.error(error.message)
                 res.status(500).send("Some error occured")
             }
                })

        

      
module.exports=router