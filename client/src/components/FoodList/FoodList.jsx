import React from 'react'

import { Button, Input, Paper } from '@material-ui/core'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import './FoodList.scss'

const FoodList = ({ state, funcs }) => {
  const foodListUi = state.foodList.map((val, key) => {
    return (
      <li key={ key }>
        <Paper elevation={ 3 }>
          <div>Food: { val.foodName }</div>
          <div>Days Since I Ate: { val.daysSinceIAte }</div>
          <form onSubmit={ e => funcs.updateFoodName(e, val._id) }>
            <Input 
              placeholder="Update Food" 
              onChange={ e => funcs.saveNewFoodName(e, key) }
              value={ key === state.currentInput ? state.newFoodName : '' }
              required
            />
          </form>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={ () => funcs.deleteFood(val._id) }
          >
            Delete
          </Button>
        </Paper>
      </li> 
    )
  })

  const 
    content = !(state.loading && state.error) ? <ul>{ foodListUi }</ul> : null,
    loading = state.loading ? <Spinner /> : null,
    error = state.error ? <Error /> : null

  return (
    <>
      <div className="title-box">
        <h2>Food List</h2>
      </div>
      { content }
      { loading }
      { error }
    </>
  )
}

export default FoodList