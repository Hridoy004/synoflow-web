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
        title: "Projects",
        url: `${prefix}/projects`,
      },
      {
        title: "Teams",
        url: `${prefix}/teams`,
      },
      {
        title: "My Tasks",
        url: `${prefix}/tasks`,
      },
    ],
  },
  {
    title: "Personal",
    items: [
      {
        title: "Profile",
        url: `${prefix}/profile`,
      },
      {
        title: "Notifications",
        url: `${prefix}/notifications`,
      },
    ],
  },
];
