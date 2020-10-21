import React, { useState, useEffect } from 'react'

import FoodForm from './components/FoodForm/FoodForm'
import FoodList from './components/FoodList/FoodList'
import Axios from 'axios'

import './App.scss'

const App = () => {
  const 
    [ foodName, setFoodName ] = useState(''),
    [ days, setDays ] = useState(''),
    [ foodList, setFoodList ] = useState([]),
    [ newFoodName, setNewFoodName ] = useState(''),
    [ currentInput, setCurrentInput ] = useState(''),
    [ loading, setLoading ] = useState(true),
    [ error, setError ] = useState(false)

  const state = { 
    foodName, days, 
    foodList, newFoodName, 
    currentInput, loading, error 
  }

  const funcs = {
    saveFood: e => setFoodName(e.target.value),

    saveDays: e => setDays(e.target.value),

    saveNewFoodName: (e, index) => {
      setNewFoodName(e.target.value)
      setCurrentInput(index)
    },

    addToList: e => {
      if (!foodName || !days) return

      e.preventDefault()
  
      Axios.post(`/insert`, { foodName, days })
  
      setFoodName('')
      setDays('')
    },

    updateFoodName: (e, id) => {
      if (!newFoodName) return

      e.preventDefault()
  
      Axios.put(`/update`, { id, newFoodName })
      
      setNewFoodName('')
    },

    deleteFood: id => Axios.delete(`/delete/${id}`)
  }

  const dataReceived = data => {
    setLoading(false)
    setFoodList(data)
  }

  const onError = err => {
    console.error(err)

    setError(true)
    setLoading(false)
  }

  useEffect(() => {
    Axios.get(`/read`)
      .then(response => dataReceived(response.data))
      .catch(err => onError(err))
  })

  return (
    <div className="App">
      <FoodForm 
        state={ state }
        funcs={ funcs }
      />
      <FoodList 
        state={ state }
        funcs={ funcs }
      />
    </div>
  )
}

export default App