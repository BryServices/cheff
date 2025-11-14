const navItems = [
  { label: "Dashboard", active: true },
  { label: "Commandes" },
  { label: "Plats" },
  { label: "Livreurs" },
  { label: "Clients" },
  { label: "Paiements" },
  { label: "Paramètres" },
];

const statsCards = [
  {
    label: "Commandes du jour",
    value: "128",
    trend: "+18% vs hier",
    accent: "bg-bite-primary/10 text-bite-primary",
  },
  {
    label: "Commandes en cours",
    value: "32",
    trend: "12 min moyenne",
    accent: "bg-bite-accent/10 text-bite-accent",
  },
  {
    label: "Livrées",
    value: "96",
    trend: "92% dans les délais",
    accent: "bg-bite-dark/10 text-bite-dark",
  },
  {
    label: "Revenus du jour",
    value: "845 500 FCFA",
    trend: "+12% semaine",
    accent: "bg-bite-light/10 text-bite-light",
  },
];

const orders = [
  {
    id: "#CMD-9821",
    client: "Awa Diop",
    address: "Plateau, Abidjan",
    status: "En cours",
    time: "12:24",
    driver: "Koffi M.",
  },
  {
    id: "#CMD-9820",
    client: "Lucas N'Guessan",
    address: "Marcory, zone 4",
    status: "Livrée",
    time: "12:12",
    driver: "Sarah A.",
  },
  {
    id: "#CMD-9819",
    client: "Fatou K.",
    address: "Cocody, Riviera 3",
    status: "En cours",
    time: "12:05",
    driver: "Idriss L.",
  },
  {
    id: "#CMD-9818",
    client: "Jean Yao",
    address: "Treichville",
    status: "Annulée",
    time: "11:58",
    driver: "—",
  },
];

const drivers = [
  { name: "Sarah Akissi", status: "Disponible", lastActive: "il y a 6 min" },
  { name: "Koffi Marcel", status: "En livraison", lastActive: "il y a 2 min" },
  { name: "Idriss Loukou", status: "En pause", lastActive: "il y a 18 min" },
  { name: "Moussa Diabaté", status: "Disponible", lastActive: "il y a 10 min" },
];

const notifications = [
  {
    title: "Rupture de stock",
    detail: "Poulet braisé - Restaurant Chez Fati",
    type: "warning",
    time: "il y a 5 min",
  },
  {
    title: "Alertes livraison",
    detail: "Délai > 35 min pour 3 commandes",
    type: "urgent",
    time: "il y a 12 min",
  },
  {
    title: "Nouveau client VIP",
    detail: "Compte Entreprise Groupe Nimba",
    type: "info",
    time: "il y a 30 min",
  },
];

const quickActions = [
  { label: "Ajouter commande" },
  { label: "Créer un plat" },
  { label: "Livreurs" },
];

const weeklySales = [
  { day: "Lun", value: 320 },
  { day: "Mar", value: 410 },
  { day: "Mer", value: 380 },
  { day: "Jeu", value: 520 },
  { day: "Ven", value: 610 },
  { day: "Sam", value: 720 },
  { day: "Dim", value: 450 },
];

const statusDistribution = [
  { label: "Livrées", value: 72, color: "#A30000" },
  { label: "En cours", value: 20, color: "#FFC107" },
  { label: "Annulées", value: 8, color: "#8B0000" },
];

const statusColors: Record<string, string> = {
  "En cours": "bg-bite-accent/10 text-bite-accent",
  Livrée: "bg-bite-primary/10 text-bite-primary",
  Annulée: "bg-bite-dark/10 text-bite-dark",
};

const driverStatusColors: Record<string, string> = {
  Disponible: "bg-bite-primary/10 text-bite-primary",
  "En livraison": "bg-bite-accent/10 text-bite-accent",
  "En pause": "bg-bite-dark/10 text-bite-dark",
};

const notificationColors: Record<string, string> = {
  warning: "border-bite-accent/40",
  urgent: "border-bite-primary/40",
  info: "border-bite-dark/30",
};

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function AdminDashboard() {
  const today = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const maxWeeklyValue = Math.max(...weeklySales.map((item) => item.value));
  const linePoints = weeklySales
    .map((item, index) => {
      const x = (index / (weeklySales.length - 1)) * 100;
      const y = 100 - (item.value / maxWeeklyValue) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const totalStatus = statusDistribution.reduce(
    (sum, status) => sum + status.value,
    0
  );

  return (
    <div className="min-h-screen bg-bite-gray-50 text-bite-text-dark font-body">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="hidden lg:flex lg:w-72 border-r border-bite-gray-200 bg-white/95 backdrop-blur px-6 py-8 flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-bite-gradient flex items-center justify-center text-bite-dark font-bold text-xl shadow-bite">
              C
            </div>
            <div>
              <p className="text-lg font-heading text-bite-dark">Cheff Admin</p>
              <p className="text-sm text-bite-text-light">Gestion centrale</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={classNames(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300",
                  item.active
                    ? "bg-bite-gradient text-bite-dark shadow-bite-lg"
                    : "text-bite-text-light hover:text-bite-text-dark hover:bg-bite-gray-100/70"
                )}
              >
                <span
                  className={classNames(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-bite-gray-200 transition-all",
                    item.active
                      ? "bg-white/80 text-bite-primary"
                      : "bg-white text-bite-text-light"
                  )}
                >
                  <span className="text-xs font-semibold">
                    {item.label.slice(0, 2)}
                  </span>
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-h-screen flex flex-col">
          <header className="border-b border-bite-gray-200 bg-white/90 backdrop-blur px-4 sm:px-6 lg:px-10 py-6 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-bite-text-light">
                  Tableau de bord
                </p>
                <h1 className="text-3xl font-heading text-bite-dark mt-2">
                  Restaurant HQ
                </h1>
                <p className="text-sm text-bite-text-light">{today}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={action.label}
                    className={classNames(
                      "px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 shadow-bite",
                      index === 0
                        ? "bg-bite-primary text-white hover:-translate-y-0.5"
                        : "bg-white border border-bite-gray-200 text-bite-dark hover:-translate-y-0.5"
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {statsCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-bite-text-light uppercase tracking-wide">
                      {card.label}
                    </p>
                    <span
                      className={classNames(
                        "text-xs font-semibold px-3 py-1 rounded-full",
                        card.accent
                      )}
                    >
                      {card.trend}
                    </span>
                  </div>
                  <p className="text-4xl font-heading">{card.value}</p>
                  <div className="h-2 rounded-full bg-bite-gray-100 overflow-hidden">
                    <span className="block h-full w-3/4 rounded-full bg-bite-gradient" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 space-y-6">
                <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-heading">Commandes en cours</h2>
                      <p className="text-sm text-bite-text-light">
                        Suivi en temps réel des commandes prioritaires
                      </p>
                    </div>
                    <button className="text-sm font-medium text-bite-primary hover:underline">
                      Voir tout
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase text-bite-text-light border-b border-bite-gray-200">
                        <tr>
                          {[
                            "ID",
                            "Client",
                            "Adresse",
                            "Statut",
                            "Heure",
                            "Livreur",
                            "Actions",
                          ].map((col) => (
                            <th key={col} className="py-3 pr-4">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bite-gray-100">
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="transition-colors duration-200 hover:bg-bite-gray-50/60"
                          >
                            <td className="py-4 pr-4 font-semibold text-bite-dark">
                              {order.id}
                            </td>
                            <td className="py-4 pr-4">{order.client}</td>
                            <td className="py-4 pr-4 text-bite-text-light">
                              {order.address}
                            </td>
                            <td className="py-4 pr-4">
                              <span
                                className={classNames(
                                  "px-3 py-1 rounded-full text-xs font-semibold",
                                  statusColors[order.status]
                                )}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 pr-4">{order.time}</td>
                            <td className="py-4 pr-4 text-bite-text-light">
                              {order.driver}
                            </td>
                            <td className="py-4 pr-4">
                              <button className="text-bite-primary text-xs font-semibold hover:underline">
                                Détails
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-heading">Ventes hebdo</h2>
                      <span className="text-sm text-bite-text-light">
                        +14% vs semaine dernière
                      </span>
                    </div>
                    <div className="relative h-48">
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="salesGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#A30000" />
                            <stop offset="100%" stopColor="#FFC107" />
                          </linearGradient>
                        </defs>
                        <polyline
                          points={linePoints}
                          fill="none"
                          stroke="url(#salesGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-bite-text-light px-1">
                        {weeklySales.map((item) => (
                          <span key={item.day}>{item.day}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-heading">
                        Statut des commandes
                      </h2>
                      <span className="text-sm text-bite-text-light">
                        Aujourd&apos;hui
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div
                        className="relative h-40 w-40 rounded-full"
                        style={{
                          background: `conic-gradient(${statusDistribution
                            .map((status, index) => {
                              const start = statusDistribution
                                .slice(0, index)
                                .reduce((sum, item) => sum + item.value, 0);
                              const startPercent =
                                (start / totalStatus) * 360;
                              const endPercent =
                                ((start + status.value) / totalStatus) * 360;
                              return `${status.color} ${startPercent}deg ${endPercent}deg`;
                            })
                            .join(", ")})`,
                        }}
                      >
                        <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center">
                          <p className="text-xl font-heading text-bite-dark">
                            {totalStatus}
                          </p>
                          <p className="text-xs text-bite-text-light text-center">
                            commandes
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {statusDistribution.map((status) => (
                          <div
                            key={status.label}
                            className="flex items-center gap-3"
                          >
                            <span
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: status.color }}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {status.label}
                              </p>
                              <p className="text-xs text-bite-text-light">
                                {status.value}% des commandes
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-heading">Suivi des livreurs</h2>
                    <button className="text-sm font-medium text-bite-primary hover:underline">
                      Gérer les shifts
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drivers.map((driver) => (
                      <div
                        key={driver.name}
                        className="border border-bite-gray-100 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300 hover:border-bite-primary/40 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-bite-dark">
                              {driver.name}
                            </p>
                            <p className="text-xs text-bite-text-light">
                              Dernière activité {driver.lastActive}
                            </p>
                          </div>
                          <span
                            className={classNames(
                              "px-3 py-1 rounded-full text-xs font-semibold",
                              driverStatusColors[driver.status]
                            )}
                          >
                            {driver.status}
                          </span>
                        </div>
                        <button className="self-start text-xs font-semibold text-bite-primary hover:underline">
                          Détails
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                  <h2 className="text-xl font-heading mb-4">
                    Notifications & alertes
                  </h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.title}
                        className={classNames(
                          "rounded-2xl border p-4 bg-bite-gray-50/60",
                          notificationColors[notification.type]
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-bite-dark">
                            {notification.title}
                          </p>
                          <span className="text-xs text-bite-text-light">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-bite-text-light mt-1">
                          {notification.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-bite-gray-200 shadow-bite p-6">
                  <h2 className="text-xl font-heading mb-4">
                    Planification
                  </h2>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-dashed border-bite-gray-200 p-4 text-sm text-bite-text-light">
                      Configurez vos créneaux de préparation pour optimiser les
                      pics de commandes.
                    </div>
                    <button className="w-full bg-bite-gradient text-bite-dark font-semibold py-3 rounded-2xl shadow-bite-lg transition-all duration-300 hover:-translate-y-0.5">
                      Créer un créneau
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

