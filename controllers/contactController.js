const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels")

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user_id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({ name, email, phone });  
    res.status(201).json(contact);
});
  
const getContact = asyncHandler(async ( req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async ( req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !==userModel.id){
        res.status(401);
        throw new Error("User don't have permission to update user conatcts");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json({message: `Update contacts for ${req.params.id}`});
});


const deleteContact = asyncHandler(async  (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !==userModel.id){
        res.status(401);
        throw new Error("User don't have permission to delete user conatcts");
    }
    
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports ={getContacts, createContact, getContact, updateContact, deleteContact};







