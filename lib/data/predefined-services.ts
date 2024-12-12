export interface PredefinedService {
  id: string;
  title: string;
  description: string;
  defaultHours: number;
  defaultPrice: number;
}

export const frontendServices: PredefinedService[] = [
  {
    id: "design",
    title: "Création de la maquette",
    description: "- Conception des pages avec design responsive\n- Ajustements après les retours client\n- Validation finale du design",
    defaultHours: 15,
    defaultPrice: 300
  },
  {
    id: "development",
    title: "Réalisation du code",
    description: "- Intégration Next.js/React en suivant la maquette validée\n- Développement des fonctionnalités interactives\n- Tests et optimisations\n- Ajustements après les retours",
    defaultHours: 35,
    defaultPrice: 1050
  },
  {
    id: "deployment",
    title: "Mise en ligne",
    description: "- Configuration de l'hébergement et nom de domaine\n- Transfert des fichiers et tests finaux\n- SEO et Référencement (Google Search Console, Analytics)",
    defaultHours: 5,
    defaultPrice: 150
  },
  {
    id: "admin",
    title: "Espace administrateur (option)",
    description: "- Authentification et gestion des admins\n- Création d'une BDD\n- Interface graphique d'administration",
    defaultHours: 40,
    defaultPrice: 1200
  },
  {
    id: "maintenance-monthly",
    title: "Maintenance mensuelle (option)",
    description: "- Maintenance technique et mises à jour\n- Surveillance et corrections d'anomalies\n- Modifications mineures (textes, images)\n- Environ 4 heures par mois",
    defaultHours: 4,
    defaultPrice: 75
  }
];