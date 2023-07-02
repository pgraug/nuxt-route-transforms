export default defineNuxtConfig({
  modules: ["../src/module"],
  routeTransform: {
    transforms: {
      contact: "kontakt",
      users: [
        "brugere", // Først på listen efter children er tilføjet
        {
          // Ingen ændring fordi det er en dynamisk route
          "[userId]": {
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
