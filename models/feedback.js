import mongoose from 'mongoose'

const  feedbackSchema = mongoose.Schema({
  feedback : {
    type:String,
    required:true
  },
  
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'

  },

} , {
  timestamps:true
})


const FeedBack = mongoose.model('FeedBack' , feedbackSchema)
export default FeedBack