const prisma = require("./prisma/prisma");

const sameContactExists = async (email, phoneNumber) => {
    return await prisma.contact.findMany({
      where: {
        AND: [
          { email: email },
          { phoneNumber: phoneNumber },
        ],
      },
    });
  };

const fetchContacts = async (email, phoneNumber) => {
  return await prisma.contact.findMany({
    where: {
      OR: [
        { email: email || undefined },
        { phoneNumber: phoneNumber || undefined },
      ],
      deletedAt: null,
    },
  });
};

const createContact = async (email, phoneNumber, linkedId, linkPrecedence) => {
  return await prisma.contact.create({
    data: {
      email,
      phoneNumber,
      linkedId,
      linkPrecedence,
    },
  });
};

const updateContact = async (id, updates) => {
  return await prisma.contact.update({
    where: { id },
    data: updates,
  });
};



module.exports = { fetchContacts, createContact, updateContact, sameContactExists };
