
declare global {
  namespace Express {
    interface Request{
      user?: {
        id: string,
        email: string,
        name: string,
        user_role: UserRole,
        photo_url?: string | undefined
      }
    }
  }
}

export enum UserRole {
  user= 'USER',
  admin= 'ADMIN',
  provider= 'PROVIDER',
}