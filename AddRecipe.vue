<template>
  <div class="add-recipe container">
    <h2 class="center-align">Add New Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="input-field title">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div class="field" v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" id="ingredient" v-model="ingredients[index]" />
        <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
      </div>
      <div class="input-field add-ingredient">
        <label for="add-ingredient">Add ingredient and amount</label>
        <input
          type="text"
          name="add-ingredient"
          id="add-ingredient"
          @keydown.enter.prevent="addIngredient"
          v-model="ing"
        />
      </div>
      <div class="input-field add-instructions">
        <label for="add-instructions">Add instructions</label>
        <textarea
          name="add-instructions"
          id="add-instructions"
          class="materialize-textarea"
          cols="30"
          rows="10"
          v-model="instructions"
        ></textarea>
      </div>
      <div class="input-field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn red accent-2">Add Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddRecipe",
  data() {
    return {
      title: null,
      ingredients: [],
      ing: null,
      instructions: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    addRecipe() {
      if (this.title) {
        this.feedback = null;
        // Create Slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("recipes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            instructions: this.instructions,
            slug: this.slug,
          })
          .then(() => {
            this.$router.push({ name: "Recipes" }).catch((err) => {
              console.log(err);
            });
          });
      } else {
        this.feedback = "Title is required";
      }
    },
    addIngredient() {
      if (this.ing) {
        this.ingredients.push(this.ing);
        this.ing = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient != ing;
      });
    },
  },
};
</script>

<style>
.add-recipe {
  margin-top: 30px;
  padding: 25px;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-recipe .field {
  position: relative;
}

.add-recipe .field input[type="text"]:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.add-recipe .input-field input[type="text"]:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.add-recipe .input-field textarea:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #555;
  font-size: 1.4em;
  cursor: pointer;
}
</style>