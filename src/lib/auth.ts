import { betterAuth, boolean } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from './prisma';
import { UserStatus } from '../types';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL as string],
  user: {
    additionalFields: {
      user_role: {
        type: 'string',
        defaultValue: 'USER',
        required: true,
      },
      status: {
        type: 'string',
        defaultValue: UserStatus.active,
        enum: [UserStatus.active, UserStatus.suspended],
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
