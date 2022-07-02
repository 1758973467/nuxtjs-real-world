<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'your_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'global_feed',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(article, index) in articles"
            :key="article.slug"
          >
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
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD,YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article, index)"
              >
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list" v-for="tag in tags" :key="tag">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page,
              }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavoriteArticle,
  deleteFavoriteArticle,
} from "@/api/articles";
import { getTags } from "@/api/tags";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query, store }) {
    const page = parseInt(query.page || 1);
    const limit = 5;
    let tab = "global_feed";
    if (store.state.user) {
      if (query.tab) {
        tab = query.tab;
      } else {
        tab = "your_feed";
      }
    }

    const loadArticles = tab === "your_feed" ? getFeedArticles : getArticles;
    const [articleRes, tagDataRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    articles.forEach((article) => (article.favoriteDisabled = false));
    const { tags } = tagDataRes.data;
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag: query.tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  mounted() {
    console.log("home", this.tab, this);
  },
  methods: {
    async onFavorite(article, index) {
      article.favoriteDisabled = true;
      let res = {};
      if (article.favorited) {
        res = await deleteFavoriteArticle(article.slug);
      } else {
        res = await addFavoriteArticle(article.slug);
      }
      this.$set(res.data.article, "favoriteDisabled", false);
      this.articles.splice(index, 1, res.data.article);
      res.data.article.favoriteDisabled = false;
    },
  },
};
</script>

<style></style>
