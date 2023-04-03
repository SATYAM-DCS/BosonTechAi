const TaskDB = require('../models/task');


module.exports.addTask=async function(req,res){
    try{
        
        let task = await TaskDB.create({
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
            user:req.body.userId
        });
       
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteTask=async function(req,res){
    try{
       
        var task = await TaskDB.findById(req.params.id);
        
        if(!task || req.user.id != task.user){
           
            return res.redirect('back');
        }
        
        await task.deleteOne();
        
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.editTaskPage=async function(req,res){
    try{
        
        let task = await TaskDB.findById(req.params.id);

        return res.render("editTask",{
            title:"Edit Task",
            task:task
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updateTask =async function(req,res){
    try{
        
        if(req.user.id != req.body.userId){
            
            return res.redirect('/');
        }
    
        await TaskDB.findByIdAndUpdate(req.body.taskId,{
            task:req.body.taskName,
            category:req.body.category,
            dueDate:req.body.dueDate,
        });
        
        return res.redirect('/')
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
