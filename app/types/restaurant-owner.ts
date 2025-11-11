import { Restaurant } from './order';

export interface RestaurantOwner {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  restaurantId: number;
  restaurant?: Restaurant;
  isVerified: boolean;
  createdAt: Date;
}

export interface RestaurantOwnerAuth {
  phone: string;
  code: string;
}


