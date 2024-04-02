import { getRecipes } from "./modules/data.js";

const response = getRecipes();
console.log(await response);
