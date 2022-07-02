<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p v-if="!isLogin" class="text-xs-center">
            <nuxt-link to="/login">Have an account?</nuxt-link>
          </p>
          <p v-else class="text-xs-center">
            <nuxt-link to="/register">Need an account?</nuxt-link>
          </p>
          <template v-if="errors">
            <ul
              v-for="errItemKey in Object.keys(errors)"
              :key="errItemKey"
              class="error-messages"
            >
              <li v-for="(errDesc, index) in errors[errItemKey]" :key="index">
                {{ errItemKey + " " + errDesc }}
              </li>
            </ul>
          </template>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                placeholder="Email"
                autocomplete="email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                autocomplete="current-password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/users";

const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "LoginIndex",
  middleware: "notAuthentication",

  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSubmit(event) {
      try {
        const { data } = this.isLogin
          ? await login(this.user)
          : await register(this.user);
        // console.log(data);
        this.$store.commit("setUser", data.user);
        // this.setUser(data.user);
        Cookie.set("user", JSON.stringify(data.user));
        this.$router.push("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>