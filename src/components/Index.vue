<template>
  <div class="index container">
    <div
      class="card"
      v-for="recipe in recipies"
      :key="recipe.id"
    >
      <div class="card-content">
        <i
          class="material-icons delete"
          @click="deleteRecipe(recipe.slug)"
        >
          delete
        </i>
        <h2 class="indigo-text">
          {{ recipe.title }}
          <ul class="keywords">
            <li
              v-for="(keyword, index) in recipe.keywords"
              :key="index"
            >
              <span class="chip">
                {{ keyword }}
              </span>
            </li>
          </ul>
        </h2>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{ name: 'EditRecipe', params: { 'recipe_slug': recipe.slug }}"
        >
          <i class="material-icons edit">
            edit
          </i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    methods: {
      deleteRecipe(slug) {
        var resultRecipies = [];
        this.$store.getters.getRecipies.forEach(recipe => {
          if (recipe.slug != slug) {
            resultRecipies.push(recipe)
          }
        })
        this.$store.commit('setRecipies', resultRecipies)
      }
    },
    computed: {
      recipies() {
        return this.$store.getters.getRecipies;
      }
    }
  }
</script>

<style>

</style>
