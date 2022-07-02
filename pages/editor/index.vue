<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <list-error :errors="errors" />
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  :disabled="isPublish"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  required
                  :disabled="isPublish"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  required
                  :disabled="isPublish"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  :disabled="isPublish"
                  @keydown.enter="handleTagListEnter"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, index) in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="isPublish"
                @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { createArticle } from "@/api/articles";
import ListError from "@/components/ListError.vue";
export default {
  components: { ListError },
  name: "EditorIndex",
  middleware: "authentication",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      isPublish: false,
      errors: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    removeTag(index) {
      this.article.tagList.splice(index, 1);
    },
    async publishArticle() {
      this.isPublish = true;
      try {
        const { data } = await createArticle({
          article: this.article,
        });
        this.$router.push({
          name: "article",
          params: {
            slug: data.article.slug,
          },
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      } finally {
        this.isPublish = false;
      }
    },
    handleTagListEnter(event) {
      const tag = event.target.value;
      if (tag.length && tag.trim().length !== 0) {
        this.article.tagList.push(tag.trim());
        event.target.value = "";
      }
    },
  },
};
</script>

<style>
</style>