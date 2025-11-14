const navItems = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "Restaurants", icon: "store" },
  { label: "Utilisateurs", icon: "users" },
  { label: "Livreurs", icon: "bike" },
  { label: "Commandes", icon: "list" },
  { label: "Paiements", icon: "credit" },
  { label: "Paramètres global", icon: "settings" },
  { label: "Support", icon: "life" },
  { label: "Logs système", icon: "logs" },
];

const statsCards = [
  {
    label: "Restaurants actifs",
    value: "324",
    detail: "+12 nouveaux cette semaine",
    trend: "+4,6%",
  },
  {
    label: "Commandes globales",
    value: "18 420",
    detail: "Jour 520 • Semaine 3 980 • Mois 12 450",
    trend: "+18% vs semaine passée",
  },
  {
    label: "Chiffre d’affaires",
    value: "94,5 M FCFA",
    detail: "Ticket moyen 5 140 FCFA",
    trend: "+9,4%",
  },
  {
    label: "Taux activité livreurs",
    value: "86%",
    detail: "45 en mission • 8 inactifs",
    trend: "+3 points",
  },
];

const restaurants = [
  {
    name: "Chez Fati",
    logo: "CF",
    status: "Actif",
    orders: 1280,
  },
  {
    name: "Urban Burger",
    logo: "UB",
    status: "Actif",
    orders: 940,
  },
  {
    name: "Maison Saba",
    logo: "MS",
    status: "Suspendu",
    orders: 120,
  },
  {
    name: "Les Papilles",
    logo: "LP",
    status: "Actif",
    orders: 760,
  },
];

const roles = [
  {
    label: "Administrateurs",
    count: 8,
    description: "Accès complet à la plateforme",
    accent: "bg-bite-primary/10 text-bite-primary",
  },
  {
    label: "Restaurants",
    count: 324,
    description: "Gestionnaire de menus et commandes",
    accent: "bg-bite-accent/10 text-bite-accent",
  },
  {
    label: "Livreurs",
    count: 212,
    description: "Suivi temps réel des missions",
    accent: "bg-bite-dark/10 text-bite-dark",
  },
  {
    label: "Clients",
    count: 21_430,
    description: "Commandes et fidélité",
    accent: "bg-bite-light/10 text-bite-light",
  },
];

const drivers = [
  { name: "Sarah Akissi", status: "Disponible", lastActive: "il y a 6 min" },
  { name: "Koffi Marcel", status: "En mission", lastActive: "En livraison" },
  { name: "Idriss Loukou", status: "Inactif", lastActive: "il y a 2 h" },
  { name: "Moussa Diabaté", status: "Disponible", lastActive: "il y a 3 min" },
];

const orders = [
  {
    id: "#CMD-21450",
    restaurant: "Chez Fati",
    client: "Awa Diop",
    status: "En cours",
    total: "18 500 FCFA",
    date: "14:32",
  },
  {
    id: "#CMD-21449",
    restaurant: "Urban Burger",
    client: "Lucas N’Guessan",
    status: "Livrée",
    total: "9 800 FCFA",
    date: "14:10",
  },
  {
    id: "#CMD-21448",
    restaurant: "Maison Saba",
    client: "Fatou Koné",
    status: "Retard",
    total: "15 300 FCFA",
    date: "13:54",
  },
  {
    id: "#CMD-21447",
    restaurant: "Les Papilles",
    client: "Jean Yao",
    status: "Annulée",
    total: "—",
    date: "13:48",
  },
];

const payments = [
  { label: "Volume traité", value: "48,2 M FCFA", detail: "+12% ce mois" },
  { label: "Commissions", value: "5,1 M FCFA", detail: "10,5% moyen" },
  { label: "En attente", value: "2,4 M FCFA", detail: "37 transactions" },
  { label: "Validés", value: "1,8 M FCFA", detail: "24 transactions" },
];

const configSections = [
  { title: "Paramètres globaux", description: "Fuseaux, devises, SLA", icon: "globe" },
  { title: "Politique de prix", description: "Marges, promotions, TVA", icon: "tag" },
  { title: "Méthodes de paiement", description: "Portefeuilles, cartes, mobile money", icon: "card" },
  { title: "Sécurité & accès", description: "SSO, MFA, journaux", icon: "shield" },
  { title: "Support", description: "Escalade, SLA, réponses templates", icon: "life" },
  { title: "Logs système", description: "Audit, webhooks, intégrations", icon: "logs" },
];

const zones = [
  {
    name: "Abidjan Sud",
    restaurants: 142,
    livreurs: 58,
    status: "Stable",
    variation: "+8% trimestre",
  },
  {
    name: "Abidjan Nord",
    restaurants: 96,
    livreurs: 42,
    status: "Extension",
    variation: "+15% semaine",
  },
  {
    name: "Bouaké",
    restaurants: 38,
    livreurs: 18,
    status: "Saturation",
    variation: "-3% capacité",
  },
  {
    name: "Yamoussoukro",
    restaurants: 24,
    livreurs: 12,
    status: "Stable",
    variation: "+4% mois",
  },
];

const orderStatusColors: Record<string, string> = {
  "En cours": "bg-bite-accent/15 text-bite-dark",
  Livrée: "bg-bite-primary/10 text-bite-primary",
  Retard: "bg-bite-light/15 text-bite-light",
  Annulée: "bg-bite-dark/10 text-bite-dark",
};

const driverStatusColors: Record<string, string> = {
  Disponible: "bg-bite-primary/10 text-bite-primary",
  "En mission": "bg-bite-accent/15 text-bite-dark",
  Inactif: "bg-bite-gray-200 text-bite-text-light",
};

const zoneStatusColors: Record<string, string> = {
  Stable: "bg-bite-primary/10 text-bite-primary",
  Extension: "bg-bite-accent/15 text-bite-dark",
  Saturation: "bg-bite-dark/10 text-bite-dark",
};

const icons: Record<string, JSX.Element> = {
  grid: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16l-1.2 10.5a2 2 0 0 1-2 1.5H7.2a2 2 0 0 1-2-1.5L4 7Z" />
      <path d="M3 7h18l-2-3H5Z" />
      <path d="M9 11h6v8" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3" />
      <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" />
    </svg>
  ),
  bike: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 18h4l4-9h4" />
      <path d="M11 9h5l-1-3h-3" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <circle cx="3" cy="6" r="1.5" />
      <circle cx="3" cy="12" r="1.5" />
      <circle cx="3" cy="18" r="1.5" />
    </svg>
  ),
  credit: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-3 0 1.65 1.65 0 0 0-.33 1.82l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 3 0 1.65 1.65 0 0 0 .33-1.82l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0 0 2.34Z" />
    </svg>
  ),
  life: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M7 12h10" />
    </svg>
  ),
  logs: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h16v4H4z" />
      <path d="M4 10h16v10H4z" />
      <path d="M8 14h8" />
      <path d="M8 18h5" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20.59 13.41 11 3H3v8l9.59 9.59a2 2 0 0 0 2.82 0l5.18-5.18a2 2 0 0 0 0-2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3 4 6v6c0 5 3.58 9.74 8 11 4.42-1.26 8-6 8-11V6Z" />
      <path d="M12 11v6" />
    </svg>
  ),
};

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function AdminDashboard() {
  const paymentChart = [65, 45, 78, 52, 90, 64, 88];
  const maxPayment = Math.max(...paymentChart);

  return (
    <div className="min-h-screen bg-bite-gray-50 text-bite-text-dark font-body">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex lg:w-72 border-r border-bite-gray-200 bg-white/95 backdrop-blur-xl px-6 py-8 flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-bite-gradient flex items-center justify-center text-bite-dark font-bold text-xl shadow-bite">
              C
            </div>
            <div>
              <p className="text-lg font-heading text-bite-dark">Cheff Super Admin</p>
              <p className="text-sm text-bite-text-light">Écosystème Cheff-Mu</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={classNames(
                  "group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300",
                  item.active
                    ? "bg-bite-gradient text-bite-dark shadow-bite-lg"
                    : "text-bite-text-light hover:text-bite-dark hover:bg-bite-gray-100/70"
                )}
              >
                <span
                  className={classNames(
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl border transition-all duration-300",
                    item.active
                      ? "bg-white/90 border-transparent text-bite-primary"
                      : "bg-white border-bite-gray-200 group-hover:border-bite-gray-300"
                  )}
                >
                  {icons[item.icon]}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-h-screen bg-transparent">
          <section className="px-4 sm:px-6 xl:px-10 py-10 space-y-10">
            <div id="tableau" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 scroll-mt-24">
              {statsCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-wide text-bite-text-light">
                      {card.label}
                    </p>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-bite-gray-100 text-bite-dark">
                      {card.trend}
                    </span>
                  </div>
                  <p className="text-4xl font-heading">{card.value}</p>
                  <p className="text-sm text-bite-text-light">{card.detail}</p>
                  <span className="h-2 rounded-full bg-bite-gray-100 overflow-hidden">
                    <span className="block h-full w-3/4 rounded-full bg-bite-gradient" />
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div
                id="restaurants"
                className="xl:col-span-7 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-heading">Gestion des restaurants</h2>
                    <p className="text-sm text-bite-text-light">État global et performance</p>
                  </div>
                  <button className="text-sm font-semibold text-bite-primary hover:underline">
                    Ajouter un restaurant
                  </button>
                </div>
                <div className="rounded-2xl border border-bite-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-bite-gray-50 text-bite-text-light uppercase text-xs tracking-wide">
                      <tr>
                        {["Restaurant", "Statut", "Commandes", ""].map((col) => (
                          <th key={col} className="px-6 py-4 text-left">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bite-gray-100">
                      {restaurants.map((restaurant) => (
                        <tr key={restaurant.name} className="hover:bg-bite-gray-50/80 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <span className="h-10 w-10 rounded-2xl bg-bite-gray-100 text-bite-dark font-semibold flex items-center justify-center">
                              {restaurant.logo}
                            </span>
                            <span className="font-semibold text-bite-dark">{restaurant.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={classNames(
                                "px-3 py-1 rounded-full text-xs font-semibold",
                                restaurant.status === "Actif"
                                  ? "bg-bite-primary/10 text-bite-primary"
                                  : "bg-bite-dark/10 text-bite-dark"
                              )}
                            >
                              {restaurant.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-bite-text-light">{restaurant.orders}</td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm font-semibold text-bite-primary hover:underline">
                              Gérer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                id="utilisateurs"
                className="xl:col-span-5 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 space-y-6 scroll-mt-24"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading">Rôles & accès</h2>
                  <button className="text-sm font-semibold text-bite-primary hover:underline">
                    Gestion des rôles
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <div key={role.label} className="border border-bite-gray-100 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-bite-dark">{role.label}</p>
                        <span className={classNames("text-xs font-semibold px-2 py-1 rounded-full", role.accent)}>
                          {role.count}
                        </span>
                      </div>
                      <p className="text-xs text-bite-text-light">{role.description}</p>
                      <div className="flex gap-2">
                        <button className="text-xs font-semibold text-bite-primary">Ajouter</button>
                        <button className="text-xs text-bite-text-light">Suspendre</button>
                        <button className="text-xs text-bite-text-light">Modifier</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div
                id="livreurs"
                className="xl:col-span-5 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 scroll-mt-24"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading">Livreurs actifs</h2>
                  <button className="text-sm font-semibold text-bite-primary hover:underline">
                    Voir tout
                  </button>
                </div>
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div
                      key={driver.name}
                      className="rounded-2xl border border-bite-gray-100 p-4 flex items-center justify-between hover:border-bite-primary/40 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-bite-dark">{driver.name}</p>
                        <p className="text-xs text-bite-text-light">{driver.lastActive}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={classNames(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            driverStatusColors[driver.status]
                          )}
                        >
                          {driver.status}
                        </span>
                        <button className="text-xs font-semibold text-bite-primary">Détails</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-7 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <h2 className="text-xl font-heading flex-1">Commandes globales</h2>
                  {["Date", "Restaurant", "Statut"].map((filter) => (
                    <button key={filter} className="px-4 py-2 rounded-2xl border border-bite-gray-200 text-xs font-semibold text-bite-text-light hover:text-bite-dark">
                      {filter}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-2xl bg-bite-primary text-white text-xs font-semibold shadow-bite-lg">
                    + Filtres
                  </button>
                </div>
                <div className="rounded-2xl border border-bite-gray-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-bite-gray-50 text-bite-text-light uppercase text-xs tracking-wide">
                      <tr>
                        {["ID", "Restaurant", "Client", "Statut", "Montant", "Heure", ""].map((col) => (
                          <th key={col} className="px-5 py-3 text-left">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bite-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-bite-gray-50/80 transition-colors">
                          <td className="px-5 py-3 font-semibold text-bite-dark">{order.id}</td>
                          <td className="px-5 py-3">{order.restaurant}</td>
                          <td className="px-5 py-3 text-bite-text-light">{order.client}</td>
                          <td className="px-5 py-3">
                            <span
                              className={classNames(
                                "px-3 py-1 rounded-full text-xs font-semibold",
                                orderStatusColors[order.status]
                              )}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3">{order.total}</td>
                          <td className="px-5 py-3 text-bite-text-light">{order.date}</td>
                          <td className="px-5 py-3 text-right">
                            <button className="text-xs font-semibold text-bite-primary hover:underline">
                              Actions
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div
                id="paiements"
                className="xl:col-span-6 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 space-y-5 scroll-mt-24"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading">Paiements</h2>
                  <button className="text-sm font-semibold text-bite-primary hover:underline">
                    Voir les rapports
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {payments.map((payment) => (
                    <div key={payment.label} className="border border-bite-gray-100 rounded-2xl p-4 space-y-2">
                      <p className="text-xs text-bite-text-light uppercase tracking-wide">{payment.label}</p>
                      <p className="text-2xl font-heading text-bite-dark">{payment.value}</p>
                      <p className="text-xs text-bite-text-light">{payment.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="relative h-40">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="paymentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A30000" />
                        <stop offset="100%" stopColor="#FFC107" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points={paymentChart
                        .map((value, index) => {
                          const x = (index / (paymentChart.length - 1)) * 100;
                          const y = 100 - (value / maxPayment) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="url(#paymentGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points={`0,100 ${paymentChart
                        .map((value, index) => {
                          const x = (index / (paymentChart.length - 1)) * 100;
                          const y = 100 - (value / maxPayment) * 100;
                          return `${x},${y}`;
                        })
                        .join(" ")} 100,100`}
                      fill="url(#paymentGradient)"
                      opacity="0.15"
                    />
                  </svg>
                  <div className="absolute inset-0 border border-dashed border-bite-gray-200 rounded-2xl" />
                </div>
              </div>

              <div
                id="zones"
                className="xl:col-span-6 bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 space-y-6 scroll-mt-24"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading">Zones & couverture</h2>
                  <button className="text-sm font-semibold text-bite-primary hover:underline">
                    Configurer les zones
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {zones.map((zone) => (
                    <div
                      key={zone.name}
                      className="border border-bite-gray-100 rounded-2xl p-4 space-y-3 hover:border-bite-primary/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-bite-dark">{zone.name}</p>
                        <span
                          className={classNames(
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            zoneStatusColors[zone.status]
                          )}
                        >
                          {zone.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-xs text-bite-text-light">Restaurants</p>
                          <p className="font-semibold text-bite-dark">{zone.restaurants}</p>
                        </div>
                        <div>
                          <p className="text-xs text-bite-text-light">Livreurs</p>
                          <p className="font-semibold text-bite-dark">{zone.livreurs}</p>
                        </div>
                      </div>
                      <p className="text-xs text-bite-text-light">{zone.variation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="parametres"
              className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 space-y-6 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading">Paramètres & configuration</h2>
                <button className="text-sm font-semibold text-bite-primary hover:underline">Tout configurer</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {configSections.map((section) => (
                  <div
                    key={section.title}
                    className="border border-bite-gray-100 rounded-2xl p-4 flex flex-col gap-3 hover:border-bite-primary/40 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-2xl bg-bite-gray-100 flex items-center justify-center text-bite-primary">
                        {icons[section.icon]}
                      </span>
                      <p className="font-semibold text-bite-dark">{section.title}</p>
                    </div>
                    <p className="text-sm text-bite-text-light">{section.description}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs font-semibold text-bite-primary">Configurer</button>
                      <button className="text-xs text-bite-text-light">Modifier</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

