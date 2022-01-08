const express = require('express');
const router = express.Router();
const Product=require('../models/products.model')

router.get("/womens",async (req,res)=>{
//     console.log(req.params.body);
    try{
            const products= await Product.find().lean().exec();
        //     console.log(products)
                let a=[];
            for(let i=0; i<products.length;i++){
                    if(products[i].category==="womens"){
                        a.push(products[i]);
                    }
            }
            
          return  res.send(a);
    }catch (e){
          return   res.status(500).json({status:e.message,status:"Failed"});
    }      
});


// instrument
router.get("/equipment",async (req,res)=>{
//     console.log(req.params.body);
    try{
        const products= await Product.find().lean().exec();
        // console.log(products)
            let a=[];
        for(let i=0; i<products.length;i++){
                if(products[i].category==="equipment"){
                    a.push(products[i]);
                }
        }
        
      return  res.send(a);
    }catch (e){
          return   res.status(500).json({status:e.message,status:"Failed"});
    }      
});

//mens product
router.get("/men",async (req,res)=>{
//     console.log(req.params.body);
    try{
        const products= await Product.find().lean().exec();
        // console.log(products)
            let a=[];
        for(let i=0; i<products.length;i++){
                if(products[i].category==="men"){
                    a.push(products[i]);
                }
        }
        
      return  res.send(a);
    }catch (e){
          return   res.status(500).json({status:e.message,status:"Failed"});
    }      
});


router.get("/vitamins",async (req,res)=>{
        // console.log(req.params.body);
        try{
            const products= await Product.find().lean().exec();
            // console.log(products)
                let a=[];
            for(let i=0; i<products.length;i++){
                    if(products[i].category==="vitamins"){
                        a.push(products[i]);
                    }
            }
            
          return  res.send(a);
        }catch (e){
              return   res.status(500).json({status:e.message,status:"Failed"});
        }      
    });


    router.get("/accessories",async (req,res)=>{
        console.log(req.params.body);
        try{
            const products= await Product.find().lean().exec();
            // console.log(products)
                let a=[];
            for(let i=0; i<products.length;i++){
                    if(products[i].category==="accessories"){
                        a.push(products[i]);
                    }
            }
            
          return  res.send(a);
        }catch (e){
              return   res.status(500).json({status:e.message,status:"Failed"});
        }      
    });

// to add new document in womens collection
router.post("",async (req,res)=>{
    try{
            const product= await Product.create(req.body);
            return   res.status(201).send(product);
    }catch(e){
            return  res.status(500).json({status:e.message});
    }
});

// adding product for display page
// router.post("/checkproduct",async (req,res)=>{
//         try{
//                 const a= await Product.find({}).remove();
//                 const product= await Product.create(req.body);
//                 return   res.status(201).send(product);
//         }catch(e){
//                 return  res.status(500).json({status:e.message});
//         }
//     });



// to update an womens collection
router.patch("/:id",async (req,res)=>{
    try{
            const product=await product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
            return    res.send({product}); 

    }catch(e){
            return    res.status(500).json({status:e.message,status:"Failed"});  
    }
});


//to delete document in womens collection
router.delete("/:id",async (req,res)=>{
    try{
            const product=await Product.findByIdAndDelete(req.params.id,req.body).lean().exec();
            return    res.send({product}); 
    }catch(e){
            return    res.status(500).json({status:e.message,status:"Failed"});  
    }
})



module.exports =router;