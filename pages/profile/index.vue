<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>

            <nuxt-link
              v-if="user && user.username === profile.username"
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{
                name: 'settings',
              }"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="onFollow"
              :disabled="followDisabled"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "UnFollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'profile',
                    params: {
                      username: profile.username,
                    },
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{
                    name: 'profileFavorite',
                    params: {
                      username: profile.username,
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
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
                  article.createdAt | date("MMM DD")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
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
                    name: $route.name,
                    params: $route.params,
                    query: {
                      page: item,
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
  </div>
</template>

<script>
import { getProfile, followAuthor, unfollowAuthor } from "@/api/profile";
import {
  getArticles,
  addFavoriteArticle,
  deleteFavoriteArticle,
} from "@/api/articles";
import { mapState } from "vuex";
export default {
  name: "ProfileIndex",
  middleware: "authentication",
  components: {},
  async asyncData({ query, params, route }) {
    const page = parseInt(query.page || 1);
    const limit = 5;
    const articleQuery =
      route.name === "profileFavorite"
        ? {
            limit,
            offset: (page - 1) * limit,
            favorited: params.username,
          }
        : {
            author: params.username,
            limit,
            offset: (page - 1) * limit,
          };
    const [profileRes, artticlesRes] = await Promise.all([
      getProfile(params.username),
      getArticles(articleQuery),
    ]);
    return {
      page,
      limit,
      profile: profileRes.data.profile,
      articles: artticlesRes.data.articles,
      articlesCount: artticlesRes.data.articlesCount,
    };
  },
  data() {
    return {
      followDisabled: false,
    };
  },
  watchQuery: ["page"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavoriteArticle(article.slug);
      } else {
        await addFavoriteArticle(article.slug);
      }
      article.favorited = !article.favorited;
      article.favoriteDisabled = false;
    },
    async onFollow() {
      try {
        this.followDisabled = true;
        const req = this.profile.following ? unfollowAuthor : followAuthor;
        const { data } = await req(this.profile.username);
        this.profile = data.profile;
      } catch (error) {
      } finally {
        this.followDisabled = false;
      }
    },
  },
};
</script>

<style>
</style>