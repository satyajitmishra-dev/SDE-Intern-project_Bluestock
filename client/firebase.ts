import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

const hasConfig = Boolean(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.storageBucket && cfg.messagingSenderId && cfg.appId);

export const getAuthInstance = () => {
  if (!hasConfig) return null as ReturnType<typeof getAuth> | null;
  const app = getApps().length ? getApps()[0] : initializeApp(cfg as any);
  return getAuth(app);
};
