<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
    </div>
    <template v-if="isArticleAuthor">
      <button class="btn btn-sm btn-outline-secondary" @click="gotoEdit">
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;
      <button class="btn btn-sm btn-outline-primary" @click="deleteArticle">
        <i class="ion-delete"></i>
        &nbsp; Delete Article
      </button>
    </template>
    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          disabled: followDisable,
        }"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "UnFollow" : "Follow" }}
        {{ article.author.username }}
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          disabled: favoriteDisable,
        }"
        @click="onFavorite"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "Unfavorited" : "Favorite" }} Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { followAuthor, unfollowAuthor } from "@/api/profile";
import { favoriteArticle, unfavoriteArticle } from "@/api/favorite";
import { deleteArticle } from "@/api/articles";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      favoriteDisable: false,
      followDisable: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    isArticleAuthor() {
      return this.article.author.username === this.user.username;
    },
  },
  methods: {
    async onFollow() {
      this.followDisable = true;
      if (this.article.favorited) {
        await unfollowAuthor(this.user.username);
      } else {
        await followAuthor(this.user.username);
      }
      this.followDisable = false;
    },
    async onFavorite() {
      this.onFavorite = true;
      if (this.article.favorited) {
        await unfavoriteArticle(this.article.slug);
      } else {
        await favoriteArticle(this.article.slug);
      }
      this.onFavorite = false;
    },
    gotoEdit() {
      this.$router.push({
        name: "editor",
        params: {
          slug: this.article.slug,
        },
      });
    },
    async deleteArticle() {
      try {
        await deleteArticle(this.article.slug);
        this.$router.push({
          name: "home",
        });
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>