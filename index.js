import Vue from 'vue'
import Router from 'vue-router'
import Recipes from '@/components/Recipes'
import AddRecipe from '@/components/AddRecipe'
import EditRecipe from '@/components/EditRecipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/add-recipe',
      name: 'AddRecipe',
      component: AddRecipe
    },
    {
      path: '/edit-recipe/:recipe_slug',
      name: 'EditRecipe',
      component: EditRecipe
    }

  ]
})
