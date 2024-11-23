const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const db = async () => {
  try {
    await prisma.$connect();
    console.log('Db Connected');
  } catch (error) {
    console.log(error)
    console.log('DB Connection Error');
  }
};

module.exports = { db };