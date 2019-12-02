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
      <div
        class="text-sm font-semibold mb-3 text-gray-900"
      >By having a Crcle account, you can join, vote, and comment on all your favorite Crcle content.</div>

      <ErrorAlert :msg="error.msg" v-if="error.status" />
      <SuccessAlert :msg="success.msg" v-if="success.status" />

      <form @submit.prevent="signup" class="w-full">
        <div>
          <label for="username" class="text-sm font-semibold">Username</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Username"
            class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
            v-model="user.username"
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
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white my-5 px-4 py-2 font-bold w-full rounded cursor-pointer"
        >Sign Up</button>
      </form>
      <div>
        <small>
          By clicking
          <strong>Sign up</strong>, you agree to our
          <span class="text-blue-600 hover:text-blue-700 cursor-pointer">Terms</span> and that you have read our
          <span
            class="text-blue-600 hover:text-blue-700 cursor-pointer"
          >Privacy Policy</span> and
          <span class="text-blue-600 hover:text-blue-700 cursor-pointer">Content Policy</span>.
        </small>
      </div>
      <div class="my-3">
        <small>
          Already have an account?
          <div @click="$router.push({name: 'login'})" class="inline-block">
            <strong class="text-blue-600 hover:text-blue-500 cursor-pointer">SIGN IN</strong>
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
      uri: process.env.VUE_APP_API_URL,
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
    async signup() {
      // console.log("login called");
      this.loading = true;

      this.error.status = false;
      this.error.msg = "";
      this.success.status = false;
      this.success.msg = "";

      const config = {
        method: "post",
        url: this.uri + "/api/users",
        data: this.user
      };
      try {
        await axios(config);
        // console.log(response);
        this.loading = false;
        this.success.status = true;
        this.success.msg =
          "You have succesfuly signed up and soon will be redirected to the login page";
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 2000);
      } catch (error) {
        // console.error(error.response);
        this.loading = false;
        this.error.status = true;
        this.error.msg = error.response.data.msg;
      }
      this.user.username = "";
      this.user.password = "";
    }
  }
};
</script>


<style>
</style>