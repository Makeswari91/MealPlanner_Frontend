import style from "./Recipe.module.css";
import RecipeForm from "../../components/RecipeComponents/RecipeForm";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecipePage() {
    const [recipes, setRecipes] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        title: "",
        ingredients: "",
        instructions: "",
        category: "",
        createdBy: ""
    });

    useEffect(() => {
        async function getRecipes() {
            try {
                let res = await axios.get("http://localhost:3000/api/recipe");
                setRecipes(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        getRecipes();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/recipe/${id}`);
            setRecipes((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            console.error(err);
        }
    };


    const startEdit = (recipe) => {
        setEditingId(recipe._id);
        setEditData({
            title: recipe.title,
            ingredients: recipe.ingredients.join(", "),
            instructions: recipe.instructions,
            category: recipe.category
        });
    };

    const handleEditChange = (e) => {
        setEditData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updated = {
                ...editData,
                ingredients: editData.ingredients.split(",")
            };
            const res = await axios.put(`http://localhost:3000/api/recipe/${editingId}`, updated);
            setRecipes((prev) =>
                prev.map((r) => (r._id === editingId ? res.data : r))
            );
            setEditingId(null);
        } catch (err) {
            console.error("Error updating recipe:", err);
        }
    };

    if (!recipes) return <h2>Loading recipes...</h2>;

    return (

        <div className={style.container}>
            <RecipeForm setRecipes={setRecipes} />
            <ul className={style.list}>
                {recipes.map((recipe) => (
                    <li key={recipe._id} className={style.item}>
                        {editingId === recipe._id ? (
                            <form onSubmit={handleUpdate} className={style.editForm}>
                                <input name="title" value={editData.title} onChange={handleEditChange} required />
                                <input name="ingredients" value={editData.ingredients} onChange={handleEditChange} required />
                                <textarea name="instructions" value={editData.instructions} onChange={handleEditChange} required />
                                <select name="category" value={editData.category} onChange={handleEditChange}>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                            </form>
                        ) : (
            
                            <>
                                <h3>{recipe.title}</h3>
                                <p><strong>Category:</strong> {recipe.category}</p>
                                <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                <button onClick={() => startEdit(recipe)}>Edit</button>
                                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}