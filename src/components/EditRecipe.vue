<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit {{ recipe.title }} Recipe</h2>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: "EditRecipe",
    data() {
      return {
        recipe: null
      }
    },
    created() {
      let ref = db.collection('recipies').where('slug', '==', this.$router.params.recipe_slug)
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.recipe = doc.data()
          this.recipe.id = doc.id
        })
      })
    }
  }
</script>

<style>

</style>
