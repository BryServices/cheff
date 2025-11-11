import { Dish, DishCategory } from '@/app/types/dish';

// Plats mock pour la démonstration
const generateMockDishes = (restaurantId: number): Dish[] => {
  const dishes: Dish[] = [];
  const now = new Date();

  // Plats pour restaurant 1 (Le Congolais)
  if (restaurantId === 1) {
    dishes.push(
      {
        id: `dish_${restaurantId}_1`,
        restaurantId: 1,
        name: 'Poulet Moambe',
        description: 'Poulet cuit dans une sauce à base de noix de palme, accompagné de riz',
        price: 8000,
        category: 'plats',
        isAvailable: true,
        preparationTime: 30,
        ingredients: ['Poulet', 'Noix de palme', 'Riz', 'Tomates', 'Oignons'],
        allergens: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: `dish_${restaurantId}_2`,
        restaurantId: 1,
        name: 'Saka-saka',
        description: 'Feuilles de manioc pilées avec poisson ou viande',
        price: 5000,
        category: 'plats',
        isAvailable: true,
        preparationTime: 25,
        ingredients: ['Feuilles de manioc', 'Poisson', 'Huile de palme'],
        allergens: ['Poisson'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: `dish_${restaurantId}_3`,
        restaurantId: 1,
        name: 'Foufou',
        description: 'Boule de manioc ou plantain pilé',
        price: 3000,
        category: 'accompagnements',
        isAvailable: true,
        preparationTime: 20,
        ingredients: ['Manioc', 'Eau'],
        allergens: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: `dish_${restaurantId}_4`,
        restaurantId: 1,
        name: 'Capitaine braisé',
        description: 'Poisson capitaine grillé avec épices',
        price: 12000,
        category: 'plats',
        isAvailable: true,
        preparationTime: 35,
        ingredients: ['Capitaine', 'Épices', 'Citron'],
        allergens: ['Poisson'],
        createdAt: now,
        updatedAt: now,
      },
    );
  }

  // Plats pour restaurant 2 (Pizza Brazza)
  if (restaurantId === 2) {
    dishes.push(
      {
        id: `dish_${restaurantId}_1`,
        restaurantId: 2,
        name: 'Pizza Margherita',
        description: 'Tomate, mozzarella, basilic',
        price: 6000,
        category: 'plats',
        isAvailable: true,
        preparationTime: 20,
        ingredients: ['Pâte', 'Tomate', 'Mozzarella', 'Basilic'],
        allergens: ['Gluten', 'Lait'],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: `dish_${restaurantId}_2`,
        restaurantId: 2,
        name: 'Pizza Pepperoni',
        description: 'Tomate, mozzarella, pepperoni',
        price: 7500,
        category: 'plats',
        isAvailable: true,
        preparationTime: 20,
        ingredients: ['Pâte', 'Tomate', 'Mozzarella', 'Pepperoni'],
        allergens: ['Gluten', 'Lait'],
        createdAt: now,
        updatedAt: now,
      },
    );
  }

  return dishes;
};

// Fonction pour obtenir le menu d'un restaurant
export function getMenuByRestaurant(restaurantId: number): Dish[] {
  if (typeof window === 'undefined') {
    return generateMockDishes(restaurantId);
  }

  const storedMenu = localStorage.getItem(`cheff_menu_${restaurantId}`);
  if (storedMenu) {
    try {
      const parsed = JSON.parse(storedMenu);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((dish: any) => ({
          ...dish,
          createdAt: new Date(dish.createdAt),
          updatedAt: new Date(dish.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Error parsing stored menu:', error);
    }
  }

  // Initialiser avec les données mock
  const mockDishes = generateMockDishes(restaurantId);
  localStorage.setItem(`cheff_menu_${restaurantId}`, JSON.stringify(mockDishes));
  return mockDishes;
}

// Fonction pour ajouter un plat
export function addDish(dish: Omit<Dish, 'id' | 'createdAt' | 'updatedAt'>): Dish {
  const newDish: Dish = {
    ...dish,
    id: `dish_${dish.restaurantId}_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const menu = getMenuByRestaurant(dish.restaurantId);
  menu.push(newDish);
  localStorage.setItem(`cheff_menu_${dish.restaurantId}`, JSON.stringify(menu));

  return newDish;
}

// Fonction pour mettre à jour un plat
export function updateDish(dishId: string, updates: Partial<Dish>): Dish | null {
  if (typeof window === 'undefined') return null;

  const storedMenu = localStorage.getItem(`cheff_menu_${updates.restaurantId}`);
  if (!storedMenu) return null;

  const menu: Dish[] = JSON.parse(storedMenu);
  const dishIndex = menu.findIndex(d => d.id === dishId);
  if (dishIndex === -1) return null;

  const updatedDish: Dish = {
    ...menu[dishIndex],
    ...updates,
    updatedAt: new Date(),
  };

  menu[dishIndex] = updatedDish;
  localStorage.setItem(`cheff_menu_${updates.restaurantId}`, JSON.stringify(menu));

  return updatedDish;
}

// Fonction pour supprimer un plat
export function deleteDish(dishId: string, restaurantId: number): boolean {
  if (typeof window === 'undefined') return false;

  const storedMenu = localStorage.getItem(`cheff_menu_${restaurantId}`);
  if (!storedMenu) return false;

  const menu: Dish[] = JSON.parse(storedMenu);
  const filteredMenu = menu.filter(d => d.id !== dishId);
  localStorage.setItem(`cheff_menu_${restaurantId}`, JSON.stringify(filteredMenu));

  return true;
}

// Fonction pour obtenir les plats par catégorie
export function getDishesByCategory(restaurantId: number, category: DishCategory): Dish[] {
  const menu = getMenuByRestaurant(restaurantId);
  return menu.filter(dish => dish.category === category);
}

