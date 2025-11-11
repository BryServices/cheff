'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRestaurantAuth } from '@/app/context/RestaurantAuthContext';
import { getMenuByRestaurant, addDish, updateDish, deleteDish } from '@/app/data/menu';
import { Dish, DishCategory } from '@/app/types/dish';
import { formatCurrency } from '@/app/utils/restaurantStats';

export default function RestoMenuPage() {
  const { owner, isAuthenticated, isLoading: authLoading } = useRestaurantAuth();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'plats' as DishCategory,
    isAvailable: true,
    preparationTime: '',
    ingredients: '',
    allergens: '',
  });

  // Charger le menu
  useEffect(() => {
    if (owner && isAuthenticated) {
      const menu = getMenuByRestaurant(owner.restaurantId);
      setDishes(menu);
    }
  }, [owner, isAuthenticated]);

  // Organiser les plats par catégorie
  const dishesByCategory = useMemo(() => {
    const categories: DishCategory[] = ['entrees', 'plats', 'accompagnements', 'desserts', 'boissons'];
    const organized: { [key in DishCategory]: Dish[] } = {
      entrees: [],
      plats: [],
      desserts: [],
      boissons: [],
      accompagnements: [],
    };

    dishes.forEach(dish => {
      organized[dish.category].push(dish);
    });

    return { categories, organized };
  }, [dishes]);

  const categoryLabels: { [key in DishCategory]: string } = {
    entrees: 'Entrées',
    plats: 'Plats principaux',
    desserts: 'Desserts',
    boissons: 'Boissons',
    accompagnements: 'Accompagnements',
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingDish(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'plats',
      isAvailable: true,
      preparationTime: '',
      ingredients: '',
      allergens: '',
    });
    setError('');
    setSuccess('');
  };

  const handleEditClick = (dish: Dish) => {
    setEditingDish(dish);
    setIsAdding(false);
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      isAvailable: dish.isAvailable,
      preparationTime: dish.preparationTime?.toString() || '',
      ingredients: dish.ingredients?.join(', ') || '',
      allergens: dish.allergens?.join(', ') || '',
    });
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingDish(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'plats',
      isAvailable: true,
      preparationTime: '',
      ingredients: '',
      allergens: '',
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Le prix doit être un nombre positif');
      return;
    }

    try {
      if (editingDish) {
        // Mettre à jour le plat
        const updated = updateDish(editingDish.id, {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: price,
          category: formData.category,
          isAvailable: formData.isAvailable,
          preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
          ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()).filter(i => i) : [],
          allergens: formData.allergens ? formData.allergens.split(',').map(a => a.trim()).filter(a => a) : [],
          restaurantId: owner!.restaurantId,
        });

        if (updated) {
          const menu = getMenuByRestaurant(owner!.restaurantId);
          setDishes(menu);
          setSuccess('Plat mis à jour avec succès');
          handleCancel();
        }
      } else {
        // Ajouter un nouveau plat
        const newDish = addDish({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: price,
          category: formData.category,
          isAvailable: formData.isAvailable,
          preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
          ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()).filter(i => i) : [],
          allergens: formData.allergens ? formData.allergens.split(',').map(a => a.trim()).filter(a => a) : [],
          restaurantId: owner!.restaurantId,
        });

        const menu = getMenuByRestaurant(owner!.restaurantId);
        setDishes(menu);
        setSuccess('Plat ajouté avec succès');
        handleCancel();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving dish:', error);
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = (dishId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      return;
    }

    if (deleteDish(dishId, owner!.restaurantId)) {
      const menu = getMenuByRestaurant(owner!.restaurantId);
      setDishes(menu);
      setSuccess('Plat supprimé avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
  };

  const toggleAvailability = (dish: Dish) => {
    const updated = updateDish(dish.id, {
      isAvailable: !dish.isAvailable,
      restaurantId: dish.restaurantId,
    });

    if (updated) {
      const menu = getMenuByRestaurant(owner!.restaurantId);
      setDishes(menu);
      setSuccess(`Plat ${updated.isAvailable ? 'activé' : 'désactivé'} avec succès`);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bite-gray-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bite-primary mx-auto"></div>
          <p className="mt-4 text-bite-text-light font-body">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !owner) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <p className="text-bite-text-dark text-lg font-body mb-4">
            Veuillez vous connecter pour accéder à la gestion du menu
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-heading text-bite-text-dark">
          Gestion du Menu
        </h1>
        {!isAdding && !editingDish && (
          <button
            onClick={handleAddClick}
            className="bg-bite-primary text-white px-6 py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold shadow-bite-lg"
          >
            + Ajouter un plat
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-body">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl text-sm font-body">
          {success}
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      {(isAdding || editingDish) && (
        <div className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200 mb-6">
          <h2 className="text-xl font-heading text-bite-text-dark mb-4">
            {editingDish ? 'Modifier le plat' : 'Nouveau plat'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Nom du plat *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Catégorie *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as DishCategory })}
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                >
                  <option value="entrees">Entrées</option>
                  <option value="plats">Plats principaux</option>
                  <option value="accompagnements">Accompagnements</option>
                  <option value="desserts">Desserts</option>
                  <option value="boissons">Boissons</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Prix (FCFA) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Temps de préparation (min)
                </label>
                <input
                  type="number"
                  value={formData.preparationTime}
                  onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-5 h-5 text-bite-primary border-bite-gray-300 rounded focus:ring-bite-primary"
                  />
                  <span className="text-sm font-body text-bite-text-dark">Disponible</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Ingrédients (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="Tomate, Oignon, Ail..."
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-bite-text-dark mb-2">
                  Allergènes (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.allergens}
                  onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                  placeholder="Gluten, Lait, Œufs..."
                  className="w-full px-4 py-3 border-2 border-bite-gray-300 rounded-xl focus:ring-2 focus:ring-bite-primary focus:border-bite-primary transition font-body text-bite-text-dark"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-bite-primary text-white rounded-xl hover:bg-bite-dark transition font-heading font-bold"
              >
                {editingDish ? 'Enregistrer les modifications' : 'Ajouter le plat'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border-2 border-bite-gray-300 text-bite-text-dark rounded-xl hover:bg-bite-gray-light transition font-body font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des plats par catégorie */}
      {dishes.length > 0 ? (
        <div className="space-y-6">
          {dishesByCategory.categories.map((category) => {
            const categoryDishes = dishesByCategory.organized[category];
            if (categoryDishes.length === 0) return null;

            return (
              <div key={category} className="bg-white rounded-2xl shadow-bite p-6 border border-bite-gray-200">
                <h2 className="text-xl font-heading text-bite-text-dark mb-4">
                  {categoryLabels[category]}
                  <span className="ml-2 text-sm text-bite-text-light font-body">
                    ({categoryDishes.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className={`p-4 border-2 rounded-xl transition ${
                        dish.isAvailable
                          ? 'border-bite-gray-200 hover:border-bite-primary'
                          : 'border-red-200 bg-red-50 opacity-75'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-heading text-bite-text-dark mb-1">
                            {dish.name}
                          </h3>
                          {!dish.isAvailable && (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded mb-2">
                              Indisponible
                            </span>
                          )}
                        </div>
                        <span className="text-lg font-price text-bite-primary">
                          {formatCurrency(dish.price)}
                        </span>
                      </div>
                      <p className="text-sm text-bite-text-light font-body mb-3">
                        {dish.description}
                      </p>
                      {dish.preparationTime && (
                        <p className="text-xs text-bite-text-light font-body mb-2">
                          ⏱️ {dish.preparationTime} min
                        </p>
                      )}
                      {dish.ingredients && dish.ingredients.length > 0 && (
                        <p className="text-xs text-bite-text-light font-body mb-1">
                          <strong>Ingrédients:</strong> {dish.ingredients.join(', ')}
                        </p>
                      )}
                      {dish.allergens && dish.allergens.length > 0 && (
                        <p className="text-xs text-orange-600 font-body mb-3">
                          <strong>⚠️ Allergènes:</strong> {dish.allergens.join(', ')}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEditClick(dish)}
                          className="flex-1 px-3 py-2 bg-bite-primary text-white rounded-lg hover:bg-bite-dark transition font-body font-medium text-sm"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => toggleAvailability(dish)}
                          className={`flex-1 px-3 py-2 rounded-lg transition font-body font-medium text-sm ${
                            dish.isAvailable
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {dish.isAvailable ? 'Désactiver' : 'Activer'}
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-body font-medium text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-bite p-12 text-center border border-bite-gray-200">
          <svg
            className="w-16 h-16 mx-auto text-bite-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-bite-text-light font-body text-lg mb-2">
            Aucun plat dans le menu
          </p>
          <p className="text-bite-text-light font-body text-sm mb-4">
            Commencez par ajouter votre premier plat
          </p>
          <button
            onClick={handleAddClick}
            className="bg-bite-primary text-white px-6 py-3 rounded-xl hover:bg-bite-dark transition font-heading font-bold"
          >
            + Ajouter un plat
          </button>
        </div>
      )}
    </div>
  );
}
