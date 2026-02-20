import { UserRole } from '../types';
import { prisma } from '../lib/prisma.js';

const adminSeed = async () => {
  try {
    const adminData = {
      name: 'Nu Khai Mong Marma',
      email: 'admin.nukhai@gmail.com',
      password: 'admin1234',
      user_role: UserRole.admin,
    };

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const adminSignUp = await fetch(
      'http://localhost:8080/api/auth/sign-up/email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://food-delivery-app-frontend-umber.vercel.app',
        },
        body: JSON.stringify(adminData),
      },
    );

    const resData = await adminSignUp.json();

    if (!adminSignUp.ok) {
      console.error('Failed to create admin:', resData);
    } else {
      console.log('Admin created:', resData);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Server side error');
  }
};

adminSeed();
