import mongoose from 'mongoose'

const  userSchema = mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password : {
    type:String,
    required:true
  },
  isAdmin : {
    type:Boolean,
    required:true,
    default:false
  },
  phone:{
    type:Number,
    required:false,

  },
  address: {
    type:String,
    required:false
  },
  date: {
    type: Date,
    default: Date.now
  }

} , {
  timestamps:true
})


const User = mongoose.model('User' , userSchema)
export default User