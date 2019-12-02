<template>
  <div class="rounded-lg shadow-lg px-5 py-2 mb-5 bg-white">
    <div id="body" class="mt-3" v-html="compiledMarkup"></div>
    <div class="flex flex-row-reverse">
      <!-- <div
            class="inline-block text-sm font-bold text-gray-400 hover:text-blue-400 cursor-pointer"
            @click="$router.push({name: 'post', params: { id: id}})"
          >
            {{typeof noOfcomments == 'undefined' ? 0 : noOfcomments}}
            <i class="fas fa-comment-alt"></i>
      </div>-->
      <!-- <div
        class="text-sm font-bold text-gray-500 hover:text-blue-500 cursor-pointer px-2 py-1 my-2 mx-2"
        @click="$router.push({name: 'post', params: { id: id}})"
      >
        5
        <i class="fas fa-reply"></i>
      </div>-->
      <div class="mx-2 w-32">
        <div class="w-full my-2 flex justify-between font-semibold">
          <div class="inline px-2 py-1 rounded bg-blue-500 text-white" v-if="isUpvoted">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div
            class="inline px-2 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
            @click="vote(id, 'upvote'); isUpvoted = true; isDownvoted = false"
            v-else
          >
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="inline text-blue-500 px-2 py-1" v-if="isUpvoted">{{upvotes - downvotes}}</div>
          <div
            class="inline text-orange-500 px-2 py-1"
            v-else-if="isDownvoted"
          >{{upvotes - downvotes}}</div>
          <div class="inline px-2 py-1" v-else>{{upvotes - downvotes}}</div>

          <div class="inline px-2 py-1 rounded bg-orange-500 text-white" v-if="isDownvoted">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div
            class="inline px-2 py-1 bg-gray-200 rounded hover:bg-orange-500 hover:text-white cursor-pointer"
            @click="vote(id, 'downvote'); isUpvoted = false; isDownvoted = true"
            v-else
          >
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
      </div>
      <div class="text-sm font-semibold text-gray-700 px-2 py-1 my-2 mx-2">
        <i class="far fa-calendar-alt mr-1"></i>
        {{ moment(time).fromNow()}}
      </div>

      <div>
        <div
          class="text-sm font-medium cursor-pointer rounded block text-purple-700 px-2 py-1 my-2 mx-2"
          v-if="author.isAdmin"
        >👑{{author.username}}</div>
        <div
          class="text-sm font-medium cursor-pointer rounded px-2 py-1 my-2 mx-2"
          v-if="!author.isAdmin"
        >
          🧔🏽
          {{author.username}}
        </div>
      </div>
    </div>
    <!-- <div class="font-bold text-gray-700">Replies to sdawn29</div>
    <Reply />
    <Reply />
    <Reply />-->
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
var moment = require("moment");

// import Reply from "./Reply.vue";

export default {
  components: {
    // Reply
  },
  created() {
    this.isVoted();
  },
  computed: {
    compiledMarkup() {
      return marked(this.body || "");
    },
    user() {
      return this.$session.get("user");
    }
  },
  props: [
    "id",
    "body",
    "author",
    "time",
    "upvotes",
    "downvotes",
    "upvotedBy",
    "downvotedBy",
    "noOfreplies"
  ],
  data() {
    return {
      moment: moment,
      isUpvoted: false,
      isDownvoted: false,
      voted: false
    };
  },
  methods: {
    async vote(id, action) {
      if (!this.$session.exists()) {
        this.$router.push({ name: "login" });
      } else {
        const uri = `${process.env.VUE_APP_API_URL}/api/comments/${id}/${action}/${this.user._id}/${this.voted}`;
        const config = {
          method: "put",
          url: uri,
          headers: {
            "x-auth-token": this.$session.get("jwt")
          }
        };
        try {
          await axios(config);
          if (action === "upvote") this.upvotes++;
          if (action === "downvote") this.downvotes++;
          if (action === "upvote" && this.voted) this.upvotes++;
          if (action === "downvote" && this.voted) this.downvotes++;
        } catch (error) {
          // console.log(error);
        }
      }
    },

    isVoted() {
      if (this.$session.exists()) {
        if (this.upvotedBy.indexOf(this.user._id) != -1) {
          this.isUpvoted = true;
          this.isDownvoted = false;
          this.voted = true;
        }
        if (this.downvotedBy.indexOf(this.user._id) != -1) {
          this.isUpvoted = false;
          this.isDownvoted = true;
          this.voted = true;
        }
      }
    }
  }
};
</script>
