import style from "./MealPlan.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MealPlanPage() {
    const [recipes, setRecipes] = useState([]);
    const [users, setUsers] = useState([]);
    const [mealPlans, setMealPlans] = useState(null);
    const [formData, setFormData] = useState({
        userId: "",
        weekStart: "",
        meals: [
            { day: "Monday", breakfast: "", lunch: "", dinner: "" },
            { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
            { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
            { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
            { day: "Friday", breakfast: "", lunch: "", dinner: "" },
            { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
            { day: "Sunday", breakfast: "", lunch: "", dinner: "" }
        ]
    });

    useEffect(() => {
        async function fetchMealPlans() {
            try {
                const res = await axios.get("http://localhost:3000/api/mealplan");
                setMealPlans(res.data);
            } catch (err) {
                console.error("Error fetching meal plans:", err);
            }
        }
        fetchMealPlans();
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await axios.get("http://localhost:3000/api/users");
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }
        fetchUsers();
    }, []);

    const getUserName = (id) => {
        const user = users.find((u) => u._id === id);
        return user ? user.name : id;
    };


    useEffect(() => {
        async function fetchRecipes() {
            try {
                const res = await axios.get("http://localhost:3000/api/recipe");
                setRecipes(res.data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
            }
        }
        fetchRecipes();
    }, []);

    const getRecipeTitle = (id) => {
        const recipe = recipes.find((r) => r._id === id);
        return recipe ? recipe.title : id;
    };


    const handleChange = (e, index, mealType) => {
        const updatedMeals = [...formData.meals];
        updatedMeals[index][mealType] = e.target.value;
        setFormData((prev) => ({ ...prev, meals: updatedMeals }));
    };

    const handleBasicChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/mealplan", formData);
            setMealPlans((prev) => [...prev, res.data]);
            setFormData({
                userId: "",
                weekStart: "",
                meals: formData.meals.map((m) => ({ ...m, breakfast: "", lunch: "", dinner: "" }))
            });
        } catch (err) {
            console.error("Error creating meal plan:", err);
        }
    };

    return (
        <div className={style.container}>
            <h2>Create Meal Plan</h2>
            <form className={style.form} onSubmit={handleSubmit}>
                <input
                    name="userId"
                    value={formData.userId}
                    onChange={handleBasicChange}
                    placeholder="User ID"
                    required
                />
                <input
                    name="weekStart"
                    type="date"
                    value={formData.weekStart}
                    onChange={handleBasicChange}
                    required
                />
                {formData.meals.map((meal, index) => (
                    <div key={meal.day} className={style.dayBlock}>
                        <h4>{meal.day}</h4>
                        <input
                            placeholder="Breakfast Recipe ID"
                            value={meal.breakfast}
                            onChange={(e) => handleChange(e, index, "breakfast")}
                        /><br/><br/>
                        <input
                            placeholder="Lunch Recipe ID"
                            value={meal.lunch}
                            onChange={(e) => handleChange(e, index, "lunch")}
                        /><br/><br/>
                        <input
                            placeholder="Dinner Recipe ID"
                            value={meal.dinner}
                            onChange={(e) => handleChange(e, index, "dinner")}
                        />
                    </div>
                ))}
                <button type="submit">Save Meal Plan</button>
            </form>

            <h2>Existing Meal Plans</h2>
            <ul className={style.list}>
                {mealPlans?.map((plan) => (
                    <li key={plan._id} className={style.item}>
                        <p><strong>User:</strong> {getUserName(plan.userId)}</p>

                        <p><strong>Week Starting:</strong> {new Date(plan.weekStart).toDateString()}</p>
                        <ul>
                            {plan.meals.map((meal, i) => (
                                <li key={i}>
                                    <strong>{meal.day}</strong>:
                                    Breakfast - {getRecipeTitle(meal.breakfast)},
                                    Lunch - {getRecipeTitle(meal.lunch)},
                                    Dinner- {getRecipeTitle(meal.dinner)}

                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
