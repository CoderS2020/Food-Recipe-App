import React, { useEffect, useState } from 'react'
import Recipe from './Recipe'
import './App.css'

const App = () => {
    const APP_ID = "a72c26bf";
    const APP_KEY = "f848b535d96646aeb7ac2499072581cb";
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query,setQuery]=useState('chicken')

    useEffect(() => {
        getRecipes();
    }, [query])

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
        const data = await response.json(); //converts to json data
        console.log(data.hits);
        setRecipes(data.hits);
    }

    const updateSearch=(e)=>{
        setSearch(e.target.value)
    }
    const getSearch=(e)=>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }
    return (
        <div className='App'>
            <form className='search-form' onSubmit={getSearch}>
                <input type='text' className='search-bar' value={search} onChange={updateSearch} />
                <button type='submit' className='search-button'>Search</button>
            </form>
            <div className='recipes'>
            {recipes.map(recipe => (
                <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories} 
                image={recipe.recipe.image} 
               
                />
            ))}
            </div>

        </div>
    )
}

export default App
