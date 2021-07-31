const axios=require('axios')


exports.homeRoutes=(req,res)=>{
    axios.get("http://localhost:3000/api/users")
    .then(response=>{
        res.render("index",{users:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
  
}

exports.addUser=(req,res)=>{
    res.render("add_user")
}

exports.updateUser=(req,res)=>{
    axios.get(`http://localhost:3000/api/users/${req.query.id}`)
    .then(userData=>{
         console.log(userData.data),
        res.render("update_user",{user1:userData.data})
        
    })
    .catch(err=>{
        res.send(err);
    })
    

}