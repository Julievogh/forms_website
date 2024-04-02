import { apikey, endpoint } from "./settings.js";

export async function getRecipes() {
  let headersList = {
    Accept: "*/*",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
}

export async function createRecipe() {
  let headersList = {
    Accept: "*/*",
    apikey: apikey,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: "Cabonara",
    description: "Den klassiske italienske ret",
    ingredients: ["Æg", "Pasta", "prut"],
    serves: 2,
    allergens: ["Laktose", "Egg", "Gluten"],
    diet: "Omni",
    studentFriendly: true,
    origin: "Italy",
  });

  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
}

export async function changeRecipe() {
  let headersList = {
    Accept: "*/*",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    description: "Den klassiske italienske ret (DEN BLASFEMISKE VERSION)",
    ingredients: ["Æg", "Pasta", "Bacon", "Parmesan", "Fløde", "Tomater", "Løg"],
  });

  let response = await fetch(endpoint, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
}

export async function deleteRecipe() {
  let headersList = {
    Accept: "*/*",
    apikey: apikey,
    Prefer: "return=representation",
  };

  let response = await fetch(endpoint, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
}
