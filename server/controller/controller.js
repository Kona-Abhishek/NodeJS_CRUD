
const mongoose=require('mongoose')
var Userdb=require('../model/model')

exports.create=(req,res)=>{
if(!req.body){
    res.status(400).send({message:"Content cant be empty"})
    return;
}

  

const user=new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})


user.save(user).then(data=>{
    res.redirect('/add_user')
}).catch(err=>res.status(500).send({
    message:err.message||"Some error occured while creating a create operation"
}))

} 

exports.get=(req,res)=>{
    if(req.params.id){
        Userdb.findById(req.params.id).then(
            data=>{
            if(!data){
                res.status(404).send({message:`Not found user with id: ${req.params.id}`})
            }
            else{
                res.send(data)
            }
            })
    }
    else{
   Userdb.find().then(user=>{
       res.send(user)
   }).catch(err=>{
       res.status(500).send({
           message:err.message||"Error Occured while retrieving Information"
       })
   })
}
}

exports.update=(req,res)=>{
 if(!req.body){
     return res.status(400).send({message:"Data to update cant be empty!!!"})
 }
 const id=req.params.id;
 Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
 .then(data=>{
     if(!data){
         res.status(404).send({message:`Cant update user with ${id} May be user not found`})
     }
     else{
         res.send(data)
     }
 })
 .catch(err=>res.status(500).send({message:`Error Update user information`}))
}

exports.delete=(req,res)=>{
const id1=req.params.id;
Userdb.findByIdAndDelete(id1)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cant delete with id ${id1} May be id is wrong`})
    }
    else{
        res.send({message:`User was deleted successfully`})
    }
})

.catch(err=>{
    res.status(500).send(`Could  not delete user with id ${id1}`)
})

}