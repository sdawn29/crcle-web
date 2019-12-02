<template>
  <div class="rounded-lg text-sm px-5 py-2 mb-5 bg-gray-100 my-2">
    <div
      id="body"
      class="mt-3"
    >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi voluptatum eaque adipisci illo expedita earum velit sint! Saepe commodi dolorum, corporis aspernatur unde, molestiae rerum illo excepturi repellendus voluptatum eaque?</div>

    <div class="flex flex-row-reverse text-xs">
      <div class="mx-2">
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
      <div class="font-semibold text-gray-700 px-2 py-1 my-2 mx-2">
        <i class="far fa-calendar-alt mr-1"></i>
        {{ moment(Date.now()).fromNow()}}
      </div>

      <div>
        <!-- <div
            class="text-sm font-medium cursor-pointer rounded flex block text-purple-700"
            v-if="author.isAdmin"
          >👑{{author.username}}</div>
          <div class="text-sm font-medium cursor-pointer rounded flex" v-if="!author.isAdmin">
            🧔🏽
            {{author.username}}
        </div>-->

        <div class="font-medium cursor-pointer rounded flex pr-2 py-1 my-2">🧔🏽sdawn29</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
var moment = require("moment");
export default {
  created() {
    // this.isVoted();
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
