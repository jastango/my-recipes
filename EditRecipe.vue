<template>
  <div class="edit-recipe container">
    <h2 v-if="recipe">Edit {{recipe.title}}</h2>
    <form @submit.prevent="updateRecipe" v-if="recipe">
      <div class="input-field title">
        <label for="title"></label>
        <input type="text" name="title" id="title" v-model="recipe.title" />
      </div>
      <div class="field" v-for="(ing, index) in recipe.ingredients" :key="index">
        <label for="ingredient"></label>
        <input type="text" name="ingredient" id="ingredient" v-model="recipe.ingredients[index]" />
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
        <label for="add-instructions"></label>
        <textarea
          name="add-instructions"
          id="add-instructions"
          class="materialize-textarea"
          cols="30"
          rows="10"
          v-model="recipe.instructions"
        ></textarea>
      </div>
      <div class="input-field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn red accent-2">Update Recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      ing: null,
      feedback: null,
    };
  },
  methods: {
    updateRecipe() {
      if (this.recipe.title) {
        this.feedback = null;
        // Create Slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        db.collection("recipes")
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            ingredients: this.recipe.ingredients,
            instructions: this.recipe.instructions,
            slug: this.recipe.slug,
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
        this.recipe.ingredients.push(this.ing);
        this.ing = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIngredient(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter((ingredient) => {
        return ingredient != ing;
      });
    },
  },
  created() {
    let ref = db
      .collection("recipes")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then((state) => {
      state.forEach((doc) => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  },
};
</script>


<style>
.edit-recipe {
  margin-top: 30px;
  padding: 25px;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-recipe .field {
  position: relative;
}

.edit-recipe .field input[type="text"]:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.edit-recipe .input-field input[type="text"]:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.edit-recipe .input-field textarea:focus {
  border-bottom: 1px solid#bbdefb;
  box-shadow: 0 1px 0 0 #bbdefb;
}

.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #555;
  font-size: 1.4em;
  cursor: pointer;
}
</style>