import { defineStore } from "pinia";


export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    token: "",
    user: {
      id: 0,
      email: "",
    },
  }),
  actions: {
    initializeStore() {
      if (localStorage.getItem("token")) {
        this.token = localStorage.getItem("token");
        this.isAuthenticated = true;
        this.user.email = localStorage.getItem("email");
        this.user.id = localStorage.getItem("id");
      } else {
        this.token = "";
        this.isAuthenticated = false;
      }
    },
    setIsLoading(status) {
      this.isLoading = status;
    },
    setToken(token) {
      console.log("Token definido:", token);
      this.token = token;
      this.isAuthenticated = true;
    },
    removeToken() {
      console.log("Token removido");
      this.token = "";
      this.isAuthenticated = false;
    },
  },
});

export default useAuthStore;
