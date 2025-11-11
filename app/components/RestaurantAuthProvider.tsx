'use client';

import { RestaurantAuthProvider as Provider } from '@/app/context/RestaurantAuthContext';

export default function RestaurantAuthProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}


