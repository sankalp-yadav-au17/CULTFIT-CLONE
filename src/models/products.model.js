const mongoose=require('mongoose');

const productSchema =new mongoose.Schema({
    id:{type:Number,required:false},
    name:{type :String,required:true},
    brand:{type :String,required:false,default:"CULTSPORT"},
    price:{type:Number, required:true,},
    mainPrice:{type:Number, required:true,},
    discount:{type :String,required:false},
    size:[{type:String, required:false},],
    description:{type:String, required:false},
    categary:{type:String,required:false},
    img:[{type:String, required:false},]
},{
 versionKey:false,
 timestamps:true , 
})

module.exports =mongoose.model("product",productSchema);