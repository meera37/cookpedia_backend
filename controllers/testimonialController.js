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