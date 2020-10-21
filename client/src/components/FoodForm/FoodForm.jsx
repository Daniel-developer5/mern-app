import React from 'react'

import { Button } from '@material-ui/core'

import './FoodForm.scss'

const FoodForm = ({ state, funcs }) => {
    return (
        <>
            <div className="title-box">
                <h1>CRUD App with MERN</h1> 
            </div>
            <form onSubmit={ funcs.addToList }>
                <div>
                <input 
                    type="text" 
                    placeholder="Food" 
                    className="form-control" 
                    onChange={ funcs.saveFood }
                    value = { state.foodName }
                    required
                />
                <input 
                    type="number" 
                    placeholder="Days after You ate it" 
                    className="form-control" 
                    onChange={ funcs.saveDays }
                    value = { state.days }
                    required
                />
                <Button 
                    variant="contained"
                    type="submit"
                    color="primary"
                >
                    Submit
                </Button>
                </div>
            </form>
        </>
    )
}

export default FoodForm