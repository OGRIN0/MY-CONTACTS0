const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    getContact, 
    updateContact, 
    deleteContact
} = require("../controllers/contactController");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);;
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

module.exports = router;

