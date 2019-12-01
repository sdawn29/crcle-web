<template>
  <div>
    <Navbar />
    <div class="my-3">
      <div class="flex justify-between">
        <div>
          <div class="text-sm font-bold mr-2 text-gray-600">posted</div>
          <div class="text-lg font-bold mr-2">{{ moment(post.createdAt).format("MMM Do YY") }}</div>
        </div>
        <div>
          <div class="text-3xl">
            <span class="text-sm text-sm font-bold text-gray-600 mr-1">upvoted</span>
            <span v-if="pointsPer <= 25" class="text-red-600">{{pointsPer}}</span>
            <span v-if="pointsPer > 25 && pointsPer <=50" class="text-orange-600">{{pointsPer}}</span>
            <span v-if="pointsPer > 50 && pointsPer <=75" class="text-yellow-600">{{pointsPer}}</span>
            <span v-if="pointsPer > 75 && pointsPer <=100" class="text-green-600">{{pointsPer}}</span>
            <span class="text-base font-bold ml-1 text-gray-600">%</span>
          </div>
        </div>
      </div>
      <div class="my-4">
        <Post
          v-if="post != ''"
          :id="post._id"
          :title="post.title"
          :body="post.body"
          :author="post.author"
          :time="post.createdAt"
          :upvotedBy="post.upvotedBy"
          :downvotedBy="post.downvotedBy"
          :upvotes="post.upvotes"
          :downvotes="post.downvotes"
          :noOfComments="typeof post.comments == 'undefined' ? 0 : (post.comments).length"
        />
      </div>
      <div>
        <textarea
          type="text"
          rows="4"
          placeholder="What are your thoughts? You can format text using marked down."
          class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-200 focus:border-blue-700 focus:bg-white text-sm"
        />
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-blue-600 hover:bg-blue-800 font-bold rounded mb-2 text-white shadow-md"
          >Comment</button>
        </div>
        <div class="my-4 text-center font-bold">Be the first to comment something</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var moment = require("moment");

import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";
export default {
  created() {
    this.getPost(this.$route.params.id);
  },
  components: {
    Navbar,
    Post
  },
  computed: {
    pointsPer() {
      return (
        Math.round(
          (this.post.upvotes / (this.post.upvotes + this.post.downvotes)) * 100
        ) || 0
      );
    }
  },
  data() {
    return {
      moment: moment,
      uri: "http://localhost:4000",
      post: ""
    };
  },
  methods: {
    momentn() {
      return moment();
    },
    async getPost(id) {
      const config = {
        method: "get",
        url: this.uri + "/api/posts/" + id
        // headers: {
        //   "x-auth-token": this.$session.get("jwt")
        // },
      };
      try {
        const response = await axios(config);
        this.post = response.data.post;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>