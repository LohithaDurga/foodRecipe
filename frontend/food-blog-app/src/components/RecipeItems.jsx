import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineDelete } from "react-icons/md";


export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes,setAllRecipes]=useState()
    let path=window.location.pathname==="/myRecipe" ? true : false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe,setIsFavRecipe]=useState(false)
    console.log(allRecipes)

    useEffect(()=>{
        setAllRecipes(recipes)
    },[recipes])

    const OnDelete=async(id)=>{
        await axios.delete(`https://food-blog-platform-l7goxcwu8-durga-lohithas-projects.vercel.app/recipe/${id}`)
                .then((res)=>console.log(res))

        setAllRecipes(recipes=>recipes.filter(recipe=>recipe._id !== id))
        let filterItem=favItems.filter(recipe=>recipe._id !== id)
        localStorage.setItem("fav",JSON.stringify(filterItem))
    }

    const favRecipe=(item)=>{
        let filterItem=favItems.filter(recipe=>recipe._id !== item._id)
        favItems=favItems.filter(recipe=>recipe._id === item._id).length=== 0 ?[...favItems,item] : filterItem
        localStorage.setItem("fav",JSON.stringify(favItems))
        setIsFavRecipe(pre=>!pre)
    }
    return (
       <>
            <div className='card-container'>
                {
                    allRecipes?.map((item,index)=>{
                        return(
                            <div key={index} className='card'>
                                <img src={`http://127.0.0.1:9002/images/${item.coverImage}`} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                        <div className='icons'> 
                                            <div className='timer'><BsFillStopwatchFill />{item.time}</div>
                                            {(!path) ? <FaHeart onClick={()=>favRecipe(item)}
                                                style={{ color : (favItems.some(res=>res._id===item._id)) ? "red" : ""}}/> :
                                                <div className='action'>
                                                    <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                    <MdDelete onClick={()=>OnDelete(item._id)} className='deleteIcon'/>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                )
               })
           }
       </div>
    </>
  )
}
