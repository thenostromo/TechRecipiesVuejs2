<template>
  <div
    v-if="recipe"
    class="edit-recipe container"
  >
    <h2>
      Edit {{ recipe.title }} Recipe
    </h2>
    <form
      @submit.prevent="editRecipe"
    >
      <div class="field title">
        <label for="title">
          Recipe title:
        </label>
        <input
          type="text"
          name="title"
          v-model="recipe.title"
        >
      </div>
      <div
        v-for="(keyword, index) in recipe.keywords"
        :key="index"
        class="field"
      >
        <label for="keyword">
          Keyword:
        </label>
        <input
          type="text"
          name="keyword"
          v-model="recipe.keywords[index]"
        >
        <i
          class="material-icons delete"
          @click="deleteKeyword(keyword)">
          delete
        </i>
      </div>
      <div class="field edit-recipe">
        <label for="add-recipe">
          Add a keyword:
        </label>
        <input
           type="text"
           name="add-recipe"
           @keydown.tab.prevent="addKeyword"
           v-model="keyword"
        >
      </div>
      <div class="field center-align">
        <p
          v-if="feedback"
          class="red-text"
        >
          {{ feedback }}
        </p>
        <button class="btn pink">
          Update Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import slugify from 'slugify'

  export default {
    name: "EditRecipe",
    data() {
      return {
        recipe: {
          title: null,
          keywords: null,
          slug: null
        },
        keyword: null,
        feedback: null
      }
    },
    mounted() {
      var findSlug = this.$router.currentRoute.params.recipe_slug
      var findRecipe = null
      this.$store.getters.getRecipies.forEach(recipe => {
        if (recipe.slug === findSlug) {
          findRecipe = recipe
        }
      })
      this.recipe.title = findRecipe.title
      this.recipe.keywords = [...findRecipe.keywords]
      this.recipe.slug = findRecipe.slug
    },
    methods: {
      editRecipe() {
        if (this.recipe.title) {
          this.feedback = null
          this.recipe.slug = slugify(this.recipe.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          if (this.keyword) {
              this.recipe.keywords.push(this.keyword)
          }
          var findSlug = this.$router.currentRoute.params.recipe_slug
          var findRecipe = null
          var resultRecipies = [];
          this.$store.getters.getRecipies.forEach(recipe => {
            findRecipe = recipe
            if (recipe.slug === findSlug) {
              findRecipe = {
                title: this.recipe.title,
                keywords: this.recipe.keywords,
                slug: this.recipe.slug
              }
            }
            resultRecipies.push(findRecipe)
          })
          this.$store.commit('setRecipies', resultRecipies)
          this.$router.push({ name: 'Index' })
        } else {
          this.feedback = 'You must enter a recipe title'
        }
      },
      addKeyword() {
        if (this.keyword) {
          this.recipe.keywords.push(this.keyword)
          this.keyword = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add a keyword'
        }
      },
      deleteKeyword(keyword) {
        this.recipe.keywords = this.recipe.keywords.filter(found => {
          return found != keyword
        })
      }
    }
  }
</script>

<style>

</style>
