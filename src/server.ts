import { prisma } from './lib/prisma.js';
import app from './app';

const PORT = process.env.PORT || 8080;

const main = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`An error occured in server`, error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
