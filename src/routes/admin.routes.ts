const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Administration",
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
        title: "Payments",
        url: `${prefix}/payments`,
      },
    ],
  },
];
