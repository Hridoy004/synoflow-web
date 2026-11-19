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
      {
        title: "Profile",
        url: `${prefix}/profile`,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Product services",
        url: "/services",
      },
      {
        title: "Contact support",
        url: "/contact",
      },
    ],
  },
];
