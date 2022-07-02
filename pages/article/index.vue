<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <ul class="tag-list">
        <li
          class="tag-default tag-pill tag-outline"
          v-for="tag in article.tagList"
          :key="tag"
        >
          {{ tag }}
        </li>
      </ul>
      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <post-comment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/articles";
import ArticleMeta from "./components/ArticleMeta.vue";
import { marked } from "marked";
import xss from "xss";
import PostComment from "./components/PostComment.vue";
export default {
  components: { ArticleMeta, PostComment },
  name: "ArticleIndex",
  middleware: ["authentication"],
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);

    data.article.body = xss(marked.parse(data.article.body), {});
    return {
      article: data.article,
    };
  },
};
</script>

<style>
</style>