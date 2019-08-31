<template>
  <div class="add-recipe container">
    <h2 class="center-align indigo-text">
      Add New Recipe
    </h2>
    <form
      @submit.prevent="addRecipe"
    >
      <div class="field title">
        <label for="title">
          Recipe title:
        </label>
        <input
          type="text"
          name="title"
          v-model="title"
        >
      </div>
      <div
        v-for="(keyword, index) in keywords"
        :key="index"
        class="field"
      >
        <label for="keyword">
          Keyword:
        </label>
        <input
          type="text"
          name="keyword"
          v-model="keywords[index]"
        >
        <i
          class="material-icons delete"
          @click="deleteKeyword(keyword)"
        >
          delete
        </i>
      </div>
      <div class="field add-recipe">
        <label for="add-recipe">
          Add a keyword:
        </label>
        <input type="text" name="add-recipe"
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
          Add Recipe
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: "AddRecipe",
    data() {
      return {
        title: null,
        keyword: null,
        keywords: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
      addRecipe() {
        if (this.title) {
          this.feedback = null
          this.slug = slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          this.$store.commit('addRecipe', {
              title: this.title,
              keywords: this.keywords,
              slug: this.slug
          })
          this.$router.push({ name: 'Index' })
        } else {
          this.feedback = 'You must enter a recipe title'
        }
      },
      addKeyword() {
        if (this.keyword) {
          this.keywords.push(this.keyword)
          this.keyword = null
          this.feedback = null
        } else {
          this.feedback = 'You must enter a value to add a keyword'
        }
      },
      deleteKeyword(keyword) {
        this.keywords = this.keywords.filter(found => {
          return found != keyword
        })
      }
    }
  }
</script>

<style>

</style>
