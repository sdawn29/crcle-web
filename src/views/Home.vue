<template>
  <div class="home">
    <Navbar />
    <div class="flex justify-between my-3">
      <div>
        <div
          class="inline-block font-semibold mr-2 bg-white hover:bg-gray-200 text-gray-800 shadow cursor-pointer rounded px-3 py-1"
        >
          <i class="fas fa-certificate mr-1"></i>
          New
        </div>
        <div
          class="inline-block font-semibold mr-2 bg-white hover:bg-gray-200 text-gray-800 shadow cursor-pointer rounded px-3 py-1"
        >
          <i class="fas fa-fire mr-2"></i>Top
        </div>
      </div>

      <!-- <div class="w-64 relative">
        <input
          type="text"
          placeholder="Search"
          class="w-full px-4 bg-gray-900 rounded py-1 outline-none border-2 border-gray-900 focus:border-blue-700 focus:bg-black text-sm"
        />
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
          <svg
            class="fill-current pointer-events-none text-gray-500 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            />
          </svg>
        </div>
      </div>-->

      <div v-if="this.$session.exists()">
        <div
          class="font-bold text-blue-600 px-3 py-1 rounded hover:text-blue-500 cursor-pointer inline-block"
        >Create Crcle</div>
        <div
          @click="$router.push({name: 'submit'})"
          class="font-semi-bold bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 cursor-pointer shadow-md text-white inline-block"
        >+ Add Post</div>
      </div>
    </div>
    <div class="my-5">
      <div v-if="posts.length == 0" class="mt-4 mb-24 text-center font-bold">
        <img src="../assets/empty.svg" alt width="500" />
        <div
          class="bg-gray-200 inline-block rounded-lg px-10 py-5 text-gray-800 m-5"
        >There is no post to show</div>
      </div>
      <div v-else v-for="post in posts" :key="post._id">
        <Post
          :id="post._id"
          :title="post.title"
          :body="post.body"
          :author="post.author"
          :time="post.createdAt"
          :points="post.points"
          :upvotedBy="post.upvotedBy"
          :downvotedBy="post.downvotedBy"
          :upvotes="post.upvotes"
          :downvotes="post.downvotes"
          :noOfComments="(post.comments).length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Navbar from "@/components/Navbar.vue";
import Post from "@/components/Post.vue";

export default {
  name: "home",
  mounted() {
    this.getPosts();
  },
  components: {
    Navbar,
    Post
  },
  data() {
    return {
      uri: process.env.VUE_APP_API_URL,
      posts: []
    };
  },
  methods: {
    async getPosts() {
      const config = {
        method: "get",
        url: this.uri + "/api/posts"
        // headers: {
        //   "x-auth-token": this.$session.get("jwt")
        // },
      };
      try {
        const response = await axios(config);
        this.posts = response.data.posts;
      } catch (error) {
        // console.log(error);
      }
    }
  }
};
</script>
