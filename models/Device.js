





const  mongoose=require('mongoose')
const { Schema } = mongoose;
const DeviceSchema=new Schema({
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'user'
    },
    Number:{
        type:Number,
        default:1
    },
    status:{
         type:String,
         default:"offline"
    },
    D0:{
        type:Boolean,
        default:false
    },
    D1:{
        type:Boolean,
        default:false
    },
    D2:{
        type:Boolean,
        default:false
    },
    D3:{
        type:Boolean,
        default:false
    },
    D4:{
        type:Boolean,
        default:false
    },
    D5:{
        type:Boolean,
        default:false
    },
    D6:{
        type:Boolean,
        default:false
    },
    D7:{
        type:Boolean,
        default:false
    },
    D8:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    camStatus:{
        type:String,
        default:"offline"
    }
});

module.exports=mongoose.model('device',DeviceSchema);
//to create the schema we need to first include the mongoose for mongodb after that from the mongoose
//we need to include the schema to create that one 
//now for creating schema just use the new keyword and then javascript object 
//after that using the mongoose need to export this schema using the model
