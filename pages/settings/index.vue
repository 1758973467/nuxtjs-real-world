<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  :disabled="updateDisable"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                  :disabled="updateDisable"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  :disabled="updateDisable"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  :disabled="updateDisable"
                  required
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  :disabled="updateDisable"
                  v-model="user.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :class="{
                  disabled: updateDisable,
                }"
                @click.prevent="onUpdateSettings"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
        <hr />
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

import { getCurrentUser, updateUser } from "@/api/users";
export default {
  name: "SettingsIndex",
  middleware: "authentication",
  async mounted() {
    const { data } = await getCurrentUser();
    this.user = data.user;
  },
  data() {
    return {
      updateDisable: false,
      user: {},
    };
  },
  methods: {
    async onUpdateSettings(event) {
      this.updateDisable = true;
      const { data } = await updateUser(this.user);
      this.updateDisable = false;
      this.$store.commit("setUser", data.user);
      // this.setUser(data.user);
      Cookie.set("user", JSON.stringify(data.user));
      this.$router.push({
        name: "profile",
        params: {
          username: data.user.username,
        },
      });
    },
    logout() {
      this.$store.commit("setUser", null);
      //cookie清掉,store清掉
      Cookie.remove("user");
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style>
</style>