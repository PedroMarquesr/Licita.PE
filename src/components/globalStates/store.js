import { getAuth, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { app } from "@/components/libs/firebaseinit";

const getUser = async (set) => {
  let isLoadingUserData = false;
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      set((state) => ({ user: user }));
      set((state) => ({ loadingLogin: true }));
      console.log(user);
    } else {
      set((state) => ({ loadingLogin: false }));
    }
  });
};

const signOutUser = async (set) => {
  const auth = getAuth(app);
  return auth.signOut().then(() => {
    set((state) => ({ user: null }));
  });
};

const useStore = create(
  persist((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),

    getUser: () => getUser(set),
    signOutUser: () => signOutUser(set),
  }))
);

export default useStore;
