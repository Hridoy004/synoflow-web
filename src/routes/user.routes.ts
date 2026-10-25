const prefix = "/user";

export const userRoutes = [
  {
    title: "Workspace",
    items: [
      {
        title: "Overview",
        url: prefix,
      },
      {
        title: "Organizations",
        url: `${prefix}/organizations`,
      },
    ],
  },
];
