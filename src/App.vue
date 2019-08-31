<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import db from '@/firebase/init'

  export default {
    name: 'App',
    components: {
      Navbar
    },
    beforeCreate() {
      db.collection('recipies').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let recipe = doc.data()
            recipe.id = doc.id
            this.$store.commit('addRecipe', recipe)
          })
        })
    }
  }
</script>

<style>

</style>
<style src='./assets/css/main.css'></style>
