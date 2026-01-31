declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        user_role: UserRole;
        photo_url?: string | undefined;
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
  delivery_address: string;
  order_status?: string;
  total_price: number | undefined | null;
  phone_number: string;
  order_method?: string;
  orderItems: [{ meal_id: string; price: number; quantity: number }];
}

export enum OrderStatus {
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivered = 'DELIVERED',
  cancelled = 'CANCELLED',
}
