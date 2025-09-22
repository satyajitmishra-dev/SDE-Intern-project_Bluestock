import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getAuthInstance } from "@/firebase";
import api from "@/api/axios";

export interface AuthState {
  status: "idle" | "loading" | "authenticated" | "error";
  user: { uid: string; email: string | null } | null;
  jwt: string | null;
  error?: string | null;
}

const initialState: AuthState = {
  status: "idle",
  user: null,
  jwt: localStorage.getItem("app_jwt"),
  error: null,
};

function assertAuth() {
  const auth = getAuthInstance();
  if (!auth) throw new Error("Firebase is not configured. Set VITE_FIREBASE_* envs.");
  return auth;
}

export const registerWithEmail = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string }) => {
    const a = assertAuth();
    const cred = await createUserWithEmailAndPassword(a, payload.email, payload.password);
    const idToken = await cred.user.getIdToken();
    const { data } = await api.post("/auth/exchange", { idToken });
    localStorage.setItem("app_jwt", data.token);
    return { uid: cred.user.uid, email: cred.user.email, jwt: data.token };
  },
);

export const loginWithEmail = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const a = assertAuth();
    const cred = await signInWithEmailAndPassword(a, payload.email, payload.password);
    const idToken = await cred.user.getIdToken();
    const { data } = await api.post("/auth/exchange", { idToken });
    localStorage.setItem("app_jwt", data.token);
    return { uid: cred.user.uid, email: cred.user.email, jwt: data.token };
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const a = assertAuth();
  await signOut(a);
  localStorage.removeItem("app_jwt");
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerWithEmail.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerWithEmail.fulfilled, (s, a) => {
        s.status = "authenticated";
        s.user = { uid: a.payload.uid, email: a.payload.email };
        s.jwt = a.payload.jwt;
      })
      .addCase(registerWithEmail.rejected, (s, a) => {
        s.status = "error";
        s.error = a.error.message || "Registration failed";
      })
      .addCase(loginWithEmail.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (s, a) => {
        s.status = "authenticated";
        s.user = { uid: a.payload.uid, email: a.payload.email };
        s.jwt = a.payload.jwt;
      })
      .addCase(loginWithEmail.rejected, (s, a) => {
        s.status = "error";
        s.error = a.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (s) => {
        s.status = "idle";
        s.user = null;
        s.jwt = null;
      });
  },
});

export const store = configureStore({
  reducer: { auth: slice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectAuth = (s: RootState) => s.auth;

const authInstance = getAuthInstance();
if (authInstance) {
  onAuthStateChanged(authInstance, async (user) => {
    if (!user) return;
    const idToken = await user.getIdToken();
    const { data } = await api.post("/auth/exchange", { idToken });
    localStorage.setItem("app_jwt", data.token);
  });
}
