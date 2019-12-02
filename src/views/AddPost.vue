<template>
  <div>
    <Navbar />
    <div class="text-lg font-semibold my-3">Create a Post</div>
    <div class="flex">
      <form @submit.prevent="submit" class="shadow-lg bg-white px-4 py-2 rounded-lg w-3/4">
        <div>
          <label for="title" class="text-sm font-semibold">Title</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Title of the post"
            class="w-full px-4 py-2 bg-gray-200 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
            v-model="post.title"
          />
        </div>
        <div class="flex justify-between text-sm mt-5">
          <div>
            <label for="body" class="font-semibold py-1">Body</label>
          </div>
          <div v-if="post.body != ''">
            <div
              class="bg-gray-200 hover:bg-gray-300 shadow cursor-pointer rounded px-3 py-1 font-semibold"
              @click="preview = !preview"
            >
              <span v-if="!preview">
                <i class="fas fa-eye"></i> Preview
              </span>
              <span v-else>
                <i class="fas fa-pen"></i> Edit
              </span>
            </div>
          </div>
        </div>
        <div v-if="!preview">
          <textarea
            type="text"
            rows="10"
            placeholder="Body of the post also supports markdown"
            class="w-full px-4 py-2 bg-gray-200 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
            v-model="post.body"
          />
        </div>
        <div v-if="preview" class="border border-gray-800 p-3 my-3 rounded">
          <div v-html="compiledMarked" class="text-sm"></div>
        </div>
        <div class="flex justify-between">
          <div>{{Date.now()}}</div>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-800 font-bold rounded mb-2 text-white shadow-md"
          >Add Post</button>
        </div>
      </form>
      <div class="w-1/4 text-sm font-semibold pl-3">
        <div class="text-bold text-lg">Posting to crcle.</div>
        <ul class="list-none">
          <li class="leading-none my-5">
            <i class="far fa-check-circle mr-1 text-green-500"></i>Remember the human
          </li>
          <li class="leading-none my-5">
            <i class="far fa-check-circle mr-1 text-green-500"></i>Behave like you would in real life
          </li>
          <li class="leading-none my-5">
            <i class="far fa-check-circle mr-1 text-green-500"></i>Look for the original source of content
          </li>
          <li class="leading-none my-5">
            <i class="far fa-check-circle mr-1 text-green-500"></i>Search for duplicates before posting
          </li>
          <li class="leading-none my-5">
            <i class="far fa-check-circle mr-1 text-green-500"></i>Read the community’s rules
          </li>
        </ul>
      </div>
    </div>
    <ErrorToast :msg="error.msg" v-if="error.status" />
    <SuccessToast msg="The post has been submitted" v-if="success" />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";

import axios from "axios";
import marked from "marked";

export default {
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push("/login");
    }
  },
  computed: {
    compiledMarked() {
      return marked(this.post.body);
    }
  },
  components: {
    Navbar,
    ErrorToast,
    SuccessToast
  },
  data() {
    return {
      uri: "http://localhost:4000",
      success: false,
      post: {
        title: "",
        body: "",
        postType: "text",
        author: this.$session.get("user")._id
      },
      error: {
        status: false,
        msg: ""
      },
      preview: false
    };
  },
  methods: {
    async submit() {
      const config = {
        method: "post",
        url: this.uri + "/api/posts",
        headers: {
          "x-auth-token": this.$session.get("jwt")
        },
        data: this.post
      };
      try {
        await axios(config);
        this.success = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {
        this.error.status = true;
        this.error.msg = error.response.data.msg;
      }
      this.post.title = "";
      this.post.body = "";
    }
  }
};
</script>

<style>
</style>