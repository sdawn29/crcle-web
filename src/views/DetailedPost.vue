<template>
  <div>
    <Navbar />
    <div class="my-3">
      <div class="flex justify-between">
        <div>
          <div class="text-sm font-bold mr-2 text-gray-600">posted</div>
          <div class="text-lg font-bold mr-2">{{ moment(post.createdAt).format("MMM Do YYYY") }}</div>
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
        <div v-if="$session.exists()">
          <textarea
            type="text"
            rows="4"
            placeholder="What are your thoughts? You can format text using marked down."
            class="w-full px-4 py-2 bg-gray-300 rounded my-2 outline-none border-2 border-gray-300 focus:border-blue-700 focus:bg-white text-sm"
            v-model="comment.body"
          />
          <div class="flex justify-end">
            <button
              class="px-4 py-2 bg-blue-600 hover:bg-blue-800 font-bold rounded mb-2 text-white"
              @click="submit"
            >Comment</button>
          </div>
        </div>
        <div
          v-else
          class="flex justify-between bg-gray-200 inline-block rounded-lg px-10 py-5 text-gray-800 w-full font-semibold"
        >
          <div class="px-4 py-2">Log in or Sign up to post your comment</div>
          <div>
            <div
              @click="$router.push({name: 'login'})"
              class="ont-semibold text-blue-600 hover:text-blue-800 cursor-pointer inline-block px-4 py-2"
            >Login</div>
            <div
              @click="$router.push({name: 'signup'})"
              class="font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 py-2 rounded shadow text-white inline-block"
            >Sign Up</div>
          </div>
        </div>
        <div
          class="mt-4 mb-24 text-center font-bold"
          v-if="typeof post.comments == 'undefined' || (post.comments).length == 0"
        >
          <img src="../assets/empty.svg" alt width="500" />
          <div
            class="bg-gray-100 inline-block rounded-lg px-10 py-5 text-gray-800 m-5"
          >Be the first to comment something.</div>
        </div>
        <div v-else>
          <div class="text-xl font-bold my-4 text-gray-600">Comments</div>
          <Comment
            v-for="comment in post.comments"
            :key="comment._id"
            :id="comment._id"
            :body="comment.body"
            :author="comment.author"
            :time="comment.createdAt"
            :upvotedBy="comment.upvotedBy"
            :downvotedBy="comment.downvotedBy"
            :upvotes="comment.upvotes"
            :downvotes="comment.downvotes"
            :noOfComments="typeof comment.replies == 'undefined' ? 0 : (comment.replies).length"
          />
        </div>
      </div>
    </div>
    <ErrorToast :msg="error.msg" v-if="error.status" />
    <SuccessToast msg="The comment has been submitted" v-if="success" />
  </div>
</template>

<script>
import axios from "axios";
var moment = require("moment");

import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";
import Comment from "../components/Comment.vue";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";

export default {
  created() {
    this.getPost(this.$route.params.id);
  },
  components: {
    Navbar,
    Post,
    Comment,
    ErrorToast,
    SuccessToast
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
      uri: process.env.VUE_APP_API_URL,
      post: "",
      comment: {
        body: "",
        author: this.$session.exists() ? this.$session.get("user")._id : "",
        postId: this.$route.params.id
      },
      success: false,
      error: {
        status: false,
        msg: ""
      }
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
        // console.log(this.post.comments.length);
      } catch (error) {
        // console.log(error);
      }
    },

    async submit() {
      const config = {
        method: "post",
        url: this.uri + "/api/comments",
        headers: {
          "x-auth-token": this.$session.get("jwt")
        },
        data: this.comment
      };
      try {
        await axios(config);
        this.success = true;
        this.getPost(this.comment.postId);
        setTimeout(() => {
          this.success = false;
          this.error.status = false;
          this.error.msg = "";
        }, 2000);
      } catch (error) {
        this.error.status = true;
        this.error.msg = error.response;
      }
      this.comment.body = "";
    }
  }
};
</script>

<style>
</style>