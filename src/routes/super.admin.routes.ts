const prefix = "/super-admin";

export const superAdminRoutes = [
  {
    title: "Platform",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Users",
        url: `${prefix}/users`,
      },
      {
        title: "Audit logs",
        url: `${prefix}/audit-logs`,
      },
      {
        title: "Organizations",
        url: `${prefix}/organizations`,
      },
      {
        title: "Projects",
        url: `${prefix}/projects`,
      },
      {
        title: "Subscriptions",
        url: `${prefix}/subscriptions`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
    ],
  },
];
