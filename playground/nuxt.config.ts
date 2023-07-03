export default defineNuxtConfig({
  modules: ["../src/module"],
  routeTransform: {
    transforms: {
      contact: "kontakt",
      users: [
        "brugere", // Only added to the transforms list after adding it's children
        {
          // No change because it's a dynamic route
          "[user]": {
            friends: "venner",
            settings: "indstillinger",
          },
        },
      ],
      disabled: false,
    },
  },
  devtools: { enabled: true },
});
