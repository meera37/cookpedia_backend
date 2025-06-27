//add testimonial
const testimonials = require("../models/testimonialModel");

exports.addTestimonialController = async(req,res)=>{
    const {name, email, message} = req.body
    console.log(name, email, message);

    try {

        const newTestimonial = await testimonials({
            name,
            email,
            message
        })
        await newTestimonial.save()
        res.status(200).json(newTestimonial)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

//get all testimonials
exports.getAllTestimonialController = async(req,res)=>{
    try {
        const alltestimonial = await testimonials.find()
        res.status(200).json(alltestimonial)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to update testimonial
exports.updateTestimonialStatusController = async(req,res)=>{
  const {id}= req.params
  const {status}=req.body
  console.log(id,status);
    
  try {
    const existingTestimonial = await testimonials.find({_id:id})
    if(existingTestimonial){
const newTestimonial = await testimonials.findByIdAndUpdate({_id:id},
    {
    name:existingTestimonial.name,
    email:existingTestimonial.email,
    message:existingTestimonial.messsage,
    status
},{new:true})
res.status(200).json(newTestimonial)
    }
    else{
        res.status(401).json('Something went wrong')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

//get all approved testimonials
exports.getAllApprovedTestimonialsController = async(req,res)=>{

    try {
        const allApprovedTestimonial = await testimonials.find({status:'approved'})
        res.status(200).json(allApprovedTestimonial)
    } catch (error) {
        res.status(500).json(error)
    }
}