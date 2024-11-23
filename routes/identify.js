const express = require("express");
const { fetchContacts, createContact, sameContactExists } = require("../helpers");
const router = express.Router();

router.post("/identify", async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email || !phoneNumber) {
    return res.status(400).json({ error: "Either email or phoneNumber is missing." });
  }

  try{
    const contactExists= await sameContactExists(email, phoneNumber)
    if(contactExists.length === 0){
        const newContact = await createContact(email, phoneNumber, null, "primary");
    }
   
    const matchingContacts = await fetchContacts(email, phoneNumber);
    
    if (matchingContacts.length === 1) {
      return res.json({
        contact: {
          primaryContatctId: matchingContacts[0].id,
          emails: [matchingContacts[0].email],
          phoneNumbers: [matchingContacts[0].phoneNumber],
          secondaryContactIds: [],
        },
      });
    }
    let primaryContact = matchingContacts.find((contact) => contact.linkPrecedence === "primary");
    if (!primaryContact) {
      primaryContact = matchingContacts[0];
    }

    const secondaryContacts = matchingContacts.filter((contact) => contact.id !== primaryContact.id);
      const response = {
        primaryContatctId: primaryContact.id,
        emails: [...new Set(matchingContacts.map((c) => c.email))],
        phoneNumbers: [...new Set(matchingContacts.map((c) => c.phoneNumber))],
        secondaryContactIds: secondaryContacts
          .filter((c) => c.id !== primaryContact.id)
          .map((c) => c.id),
      };
  
      res.json({ contact: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
