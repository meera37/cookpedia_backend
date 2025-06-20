const mongoose = require('mongoose')



const testiSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     message:{
        type:String,
        required:true
    },
     status:{
        type:String,
        default:'pending'
    },
})

const testimonials = mongoose.model('testimonials', testiSchema)

module.exports = testimonials