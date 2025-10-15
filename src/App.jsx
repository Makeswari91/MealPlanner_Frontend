import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import MealplanPage from "./pages/MealplanPage/MealplanPage";
import GrocerylistPage from "./pages/GrocerylistPage/GrocerylistPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dash" element={<DashboardPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/mealplan" element={<MealplanPage />} />
        <Route path="/grocerylist" element={<GrocerylistPage />} />
      </Routes>

    </>
  )
}

export default App
