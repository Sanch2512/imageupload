const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type : String , 
        required :true,
    },
    password:{
        type:String ,
        required :true 
    },
    email:{
        type:String , 
        required:true 
    },
    age:{
        type:Number 
    },
    gender:{
        type: String
    },
    profilepic:{
        type: String
    }
});
module.exports = mongoose.model('User' , userSchema);


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdiYzk3NjM1YjcyNGQ4MGQxMGJjNiIsImlhdCI6MTc0NDI4ODk4NiwiZXhwIjoxNzQ0MjkyNTg2fQ.iXXdByB8ysH0mgz8ZNRRlHjyjQCJt6tE-11ChYnjrIo