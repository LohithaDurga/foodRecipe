import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(false)

    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
            navigate("/addRecipe")
        else{
            setIsOpen(true)
        }
    }

  return (
    <>
        <section className='home'>
            <div className='left'>
                <h1>Food Recipe</h1>
                <h5>Stir in tomato puree, turmeric, chili powder, and salt, cooking until the oil separates. Add paneer cubes, garam masala, and kasuri methi, mixing everything well. Pour in fresh cream, stir, and let it simmer for a couple of minutes. Serve hot with naan or rice.</h5>
                <button onClick={addRecipe}>Share your recipe</button>
            </div>
            <div className='right'>
                <img src={foodRecipe} width="320px" height="300px"></img>
            </div>
        </section>
        <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,64L24,58.7C48,53,96,43,144,74.7C192,107,240,181,288,197.3C336,213,384,171,432,133.3C480,96,528,64,576,74.7C624,85,672,139,720,144C768,149,816,107,864,106.7C912,107,960,149,1008,165.3C1056,181,1104,171,1152,181.3C1200,192,1248,224,1296,202.7C1344,181,1392,107,1416,69.3L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
        </div>
{  (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
        <div className='recipe'>
            <RecipeItems/>
        </div>
    </>
  )
}
