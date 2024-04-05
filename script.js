


import { createRecipe, getRecipes, deleteRecipe, updateRecipe } from "./modules/data.js";

import { setupCountries } from "./modules/setup.js";

setupCountries();

async function showRecipes() {
  const response = await getRecipes();
  console.table(response);
  const el = document.querySelector("#recipe-template").content;

  const parent = document.querySelector(".recipes");
  parent.innerHTML = "";
  response.forEach((rec) => {
    const clone = el.cloneNode(true);
    clone.querySelector("[data-name]").textContent = rec.name;
    clone.querySelector("[data-origin]").textContent = rec.origin;
    clone.querySelector("[data-description]").textContent = rec.description;

    clone.querySelector("[data-serves]").value = rec.serves;

    clone.querySelector("[data-time]").textContent = `${rec.time} min`;

    if (rec.studentFriendly) {
      clone.querySelector(".status").hidden = false;
    } else {
      clone.querySelector(".status").hidden = true;
    }

    const randomImgWidth = 600;
    const randomImgHeight = 300;
    /*const recipeKeywords = ["food", "cooking", "recipe", "meal"];*/

    const keyword = `food-${rec.id}`;
    const randomImgUrl = `https://source.unsplash.com/random/${randomImgWidth}x${randomImgHeight}/?${keyword}`;

    clone.querySelector("[data-img]").setAttribute("src", randomImgUrl);

    clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
    clone.querySelector("button[data-action='delete']").addEventListener("click", async () => {
      await deleteRecipe(rec.id);
      await showRecipes();
    });
    clone.querySelector("button[data-action='update']").addEventListener("click", async () => {
      await updateRecipe(rec.id, !rec.studentFriendly);
      await showRecipes();
    });
    parent.appendChild(clone);
  });
}

showRecipes();

async function handleSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const allergens = [];
    formData.getAll("allergens[]").forEach((allergen) => {
      allergens.push(allergen);
    });

    await createRecipe({
      name: formData.get("name"),
      description: formData.get("description"),
      ingredients: formData.get("ingredients").split("\n"),
      serves: formData.get("serves"),
      allergens: allergens,
      diet: formData.get("diet"),
      studentFriendly: formData.get("studentFriendly"),
      origin: formData.get("origin"),
      time: formData.get("time"),
    });

    form.reset();

    showRecipes();
  });
}

handleSubmit();
