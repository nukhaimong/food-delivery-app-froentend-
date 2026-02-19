import { OrderMethod, OrderStatus } from '../../src/generated/prisma/enums';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        user_role: UserRole;
        image?: string | undefined;
        status: UserStatus;
      };
    }
  }
}

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
  provider = 'PROVIDER',
}

export interface MealData {
  provider_id: string;
  category_id: string;
  meal_name: string;
  image_url?: string;
  description?: string;
  price: number;
  is_available: boolean;
}

export interface OrderData {
  providerProfile_id: string;
  meal_id: string;
  price: number;
  quantity: number;
  total_price: number | undefined | null;
  delivery_address: string;
  order_status?: OrderStatus;
  phone_number: string;
  order_method?: OrderMethod;
}

export enum UserStatus {
  active = 'ACTIVE',
  suspended = 'SUSPENDED',
}

export type SortPrice = 'desc' | 'asc';
