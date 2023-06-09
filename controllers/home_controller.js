const TaskDB = require('../models/task');

//home page
module.exports.home=async function(req,res){
    try{
        //user specific task found
        let tasks=await TaskDB.find({user:req.user.id});
        
        return res.render('home',{
            title:"Home",
            tasks:tasks
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}