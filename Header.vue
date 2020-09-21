<template>
  <div class="navbar">
    <nav class="nav-extended blue darken-4">
      <div class="nav-content center-align">
        <router-link :to="{name: 'Recipes'}">
          <span class="title">My Recipes</span>
        </router-link>
      </div>
    </nav>
    <div class="add-icon center-align">
      <a href class="center-align btn-floating btn-large blue lighten-4">
        <router-link :to="{name: 'AddRecipe'}">
          <i class="material-icons">add</i>
        </router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style>
.nav-content {
  padding: 20px 0;
}

.title {
  font-size: 2.5rem;
}

.add-icon {
  margin-top: 20px;
}
</style>