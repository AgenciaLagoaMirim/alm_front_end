  import { defineStore } from "pinia";
  import { api } from "src/boot/authService";
  const useAuthStore = defineStore({
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
      setUser(userData) {
        this.user.id = userData.id
        this.user.email = userData.email
      },
      async fetchUserData() {
        try {
          const response = await api.get("/api/v1/users/me", {
            headers: {
              Authorization: `Token ${this.token}`,
            }
          })
          console.log("RESPOSTA",response)
          const userData = response.data
          localStorage.setItem("id", userData.id)
          localStorage.setItem("email", userData.email)
          this.setUser(userData)
        } catch (error) {
          console.log("Erro ao recuperar dados do usuário:", error)
        }
      }
    },
    getters: {
      userEmail: (state) => state.user.email
    }

  });

  export default useAuthStore
