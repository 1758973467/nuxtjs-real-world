<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          required
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          :class="{
            disabled: postCommentDisabled,
          }"
          @click="onPostComment"
        >
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD,YYYY")
        }}</span>

        <span
          class="mod-options"
          v-if="comment.author.username === user.username"
        >
          <i class="ion-trash-a" @click="onDeleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, postComment, deleteComment } from "@/api/comments";
import { mapState } from "vuex";
export default {
  name: "PostComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comment: {
        body: "",
      },
      comments: [],
      postCommentDisabled: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);

    this.comments = data.comments;
  },
  methods: {
    async onPostComment() {
      this.postCommentDisabled = true;
      await postComment(this.article.slug, {
        comment: {
          body: this.comment.body,
        },
      });
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
      this.comment.body = "";
      this.postCommentDisabled = false;
    },
    async onDeleteComment(comment) {
      await deleteComment(this.article.slug, comment.id);
      const idx = this.comments.findIndex((item) => item.id == comment.id);
      if (idx >= 0 && idx < this.comments.length) {
        this.comments.splice(idx, 1);
      }
    },
  },
};
</script>

<style>
</style>