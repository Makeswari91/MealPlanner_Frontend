import style from "./RecipeForm.module.css";
import { useState } from "react";
import axios from 'axios';

export default function RecipeForm({ setRecipes }) {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    createdBy: ""
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split(",")
    };

    try {
      let res = await axios.post("http://localhost:3000/api/recipe", payload);
      setRecipes((prev) => [...prev, res.data]);
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        category: "",
        createdBy: ""
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h2>Add a Recipe</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients (comma-separated)" required />
      <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions" required />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>
      <input name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="User ID" required />
      <button type="submit">Submit</button>
    </form>
  );
}
