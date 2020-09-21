<template>
  <div class="recipes container">
    <div class="card" v-for="(recipe, index) in recipes" :key="index">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)">delete</i>
        <h3>{{recipe.title}}</h3>
        <ul class="ingredients">
          <li v-for="(ing, index) in recipe.ingredients" :key="index">{{ing}}</li>
        </ul>
        <p class="instructions">{{recipe.instructions}}</p>
      </div>
      <span class="btn-floating btn-large halfway-fab red accent-2">
        <router-link :to="{name: 'EditRecipe', params: {recipe_slug: recipe.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Recipes",
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
    deleteRecipe(id) {
      // Delete Doc from Firestore
      db.collection("recipes")
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter((recipe) => {
            return recipe.id != id;
          });
        });
    },
  },
  created() {
    db.collection("recipes")
      .get()
      .then((state) => {
        state.forEach((element) => {
          let recipe = element.data();
          recipe.id = element.id;
          this.recipes.push(recipe);
        });
      });
  },
};
</script>

<style>
.recipes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  margin-top: 25px;
}

@media screen and (max-width: 600px) {
  .recipes {
    grid-template-columns: 1fr;
  }
}

.recipes h3 {
  text-align: center;
  font-size: 1.9em;
  margin-top: 0;
}

.recipes .delete {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  font-size: 1.3em;
  color: #555;
}

.ingredients li {
  margin: 4px 0;
  font-weight: bold;
  color: #333;
}
</style>
