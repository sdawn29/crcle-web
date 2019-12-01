<template>
  <div class="mx-auto mt-10 shadow-lg rounded-lg p-5 bg-white" style="width:20em">
    <div>
      <div
        @click="$router.push({name: 'home'})"
        class="logo text-4xl font-bold w-full cursor-pointer"
      >
        <span>crcle</span>
        <span class="text-blue-500 text-5xl">.</span>
      </div>
      <div class="text-xl font-semibold mb-3">Sign in.</div>

      <ErrorAlert :msg="error.msg" v-if="error.status" />
      <SuccessAlert :msg="success.msg" v-if="success.status" />

      <form @submit.prevent="login" class="w-full">
        <div>
          <label for="username" class="text-sm font-semibold">Username</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Username"
            class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
            v-model="user.username"
            required
          />
        </div>
        <div>
          <label for="password" class="text-sm font-semibold">Password</label>
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
            v-model="user.password"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-blue-700 hover:bg-blue-800 text-white my-5 px-4 py-2 font-bold w-full rounded cursor-pointer shadow-md"
        >Sign In</button>
      </form>
      <div>
        <small class="text-gray-900">
          New to Crcle?
          <div @click="$router.push({name: 'signup'})" class="inline-block">
            <strong class="text-blue-600 hover:text-blue-500 cursor-pointer">SIGN UP</strong>
          </div>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert.vue";
import SuccessAlert from "../components/SuccessAlert.vue";
export default {
  components: {
    ErrorAlert,
    SuccessAlert
  },
  data() {
    return {
      uri: "http://localhost:4000",
      user: {
        username: "",
        password: ""
      },
      error: { status: false, msg: "" },
      success: { status: false, msg: "" },
      loading: false
    };
  },
  methods: {
    async login() {
      // console.log("login called");
      this.loading = true;

      this.error.status = false;
      this.error.msg = "";
      this.success.status = false;
      this.success.msg = "";

      const config = {
        method: "post",
        url: this.uri + "/api/auth",
        data: this.user
      };
      try {
        const response = await axios(config);
        console.log(response);
        this.loading = false;
        this.success.status = true;
        this.success.msg = "You have succesfuly logged in!";
        this.$session.start();
        this.$session.set("jwt", response.data.token);
        this.getUserData(response.data.token);
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 2000);
      } catch (error) {
        // console.error(error.response);
        this.loading = false;
        this.error.status = true;
        this.error.msg = error.response.data.msg;
      }
      this.user.username = "";
      this.user.password = "";
    },

    async getUserData(token) {
      const uri = "http://localhost:4000/api/users/me";
      const config = {
        method: "get",
        url: uri,
        headers: {
          "x-auth-token": token
        }
      };
      try {
        const response = await axios(config);
        this.$session.set("user", response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>