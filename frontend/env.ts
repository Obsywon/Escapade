export type Env = {
    BACKEND_APP_URI: string,
    

  //Authentification par Firebase
  FIREBASE_API_KEY: string,
  FIREBASE_AUTH_DOMAIN: string,
  FIREBASE_PROJECT_ID: string,
  FIREBASE_STORAGE_BUCKET: string,
  FIREBASE_MESSAGING_SENDER_ID: string,
  FIREBASE_APP_ID: string,

  // Google Map API
  GOOGLE_BASE_URL: string,
  GOOGLE_API_KEY: string,
}

const env: Readonly<Env> = {
  //Données sur l'application
  BACKEND_APP_URI:
    //"https://escapadeapi20240115214733.azurewebsites.net/graphql/",
    "https://localhost:7025/graphql/",

  //Authentification par Firebase
  FIREBASE_API_KEY: "AIzaSyCfaZTRP3qpC_XqVpZgMAEs2b10E0-j12c",
  FIREBASE_AUTH_DOMAIN: "escapade-37d5e.firebaseapp.com",
  FIREBASE_PROJECT_ID: "escapade-37d5e",
  FIREBASE_STORAGE_BUCKET: "escapade-37d5e.appspot.com",
  FIREBASE_MESSAGING_SENDER_ID: "509799142893",
  FIREBASE_APP_ID: "1:509799142893:web:464b7ae509e92c6453c3e4",

  // Google Map API
  GOOGLE_BASE_URL: "https://maps.googleapis.com/maps/api/place/",
  GOOGLE_API_KEY: "AIzaSyAABNPGkjDak4g3bd2_BxB1SVo0omURGck",
};

export default env;
