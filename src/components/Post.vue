<template>
  <div class="rounded-lg px-5 py-5 mb-5">
    <div id="title" class="font-semibold">{{title}}</div>
    <div id="body" class="text-sm text-gray-300 mt-3" v-html="compiledMarkup"></div>
    <div class="flex justify-between mt-5">
      <div class="flex">
        <div
          class="text-xs font-bold bg-purple-800 hover:bg-purple-900 cursor-pointer px-2 py-1 rounded"
          v-if="author.isAdmin"
        >{{author.username}}</div>
        <div
          class="text-xs font-bold bg-gray-800 hover:bg-gray-900 cursor-pointer px-2 py-1 rounded"
          v-if="!author.isAdmin"
        >{{author.username}}</div>
        <div
          class="text-xs font-bold px-2 py-1 border border-yellow-500 text-yellow-500 rounded mx-3"
        >
          <i class="fas fa-bullhorn mr-1"></i>Announcements
        </div>
      </div>
      <div class="flex">
        <div class="inline-block w-16 flex justify-between font-semibold">
          <div class="inline" v-if="isUpvoted">
            <i class="fas fa-arrow-up text-blue-500"></i>
          </div>
          <div
            class="inline"
            @click="vote(id, 'upvote'); isUpvoted = true; isDownvoted = false"
            v-else
          >
            <i class="fas fa-arrow-up hover:text-blue-500 cursor-pointer"></i>
          </div>
          <div class="inline text-blue-500" v-if="isUpvoted">{{upvotes - downvotes}}</div>
          <div class="inline text-orange-500" v-else-if="isDownvoted">{{upvotes - downvotes}}</div>
          <div class="inline" v-else>{{upvotes - downvotes}}</div>

          <div class="inline" v-if="isDownvoted">
            <i class="fas fa-arrow-down text-orange-500"></i>
          </div>
          <div
            class="inline"
            @click="vote(id, 'downvote'); isUpvoted = false; isDownvoted = true"
            v-else
          >
            <i class="fas fa-arrow-down hover:text-orange-500 cursor-pointer"></i>
          </div>
        </div>
        <div
          class="inline-block ml-5 text-sm font-bold text-gray-400 hover:text-blue-400 cursor-pointer"
          @click="$router.push({name: 'post', params: { id: id}})"
        >
          {{typeof noOfcomments == 'undefined' ? 0 : noOfcomments}}
          <i class="fas fa-comment-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
export default {
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
    "title",
    "body",
    "author",
    "time",
    "upvotes",
    "downvotes",
    "upvotedBy",
    "downvotedBy",
    "noOfcomments"
  ],
  data() {
    return {
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
        const uri = `http://localhost:4000/api/posts/${id}/${action}/${this.user._id}/${this.voted}`;
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
          console.log(error);
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
