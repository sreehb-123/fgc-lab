export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),

  //Full public URL for your Strapi backend
  url: env("URL", "https://nextgenlab.iitdh.ac.in/strapi"),

  admin: {
    path: "/strapi/admin",
    serveAdminPanel: true,   // important
    //REMOVE 'url' completely
  },

  app: {
   keys: env.array("APP_KEYS"),
 },

  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});

//export default ({ env }) => ({
  //host: env("HOST", "0.0.0.0"),
  //port: env.int("PORT", 1337),

  // Remove custom URL — Strapi will auto-detect
  // Remove custom admin path — defaults to /admin
 //admin: {
    //serveAdminPanel: true,
  //},

  //app: {
    //keys: env.array("APP_KEYS"),
  //},

 //webhooks: {
   //populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
 //},
//});


