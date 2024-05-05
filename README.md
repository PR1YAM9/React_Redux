
# Redux Boiler Plate




## Store
An object that holds the state of an application, including actions and reducers.

ConfigureStore is used to setup the store and we have to mention all the reducers, So that the store knows which functions can access the store

```javascript
import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './features/todo/todoSlice'

export const store = configureStore({
    reducer: todoReducer
})
```
## Reducer
A function that take the current state of an application and an action as arguments, and return a new state based on the action.

initialState stores the format of the data as well as the initialState

We need createSlice to create a reducer that will do some action on the current state of the data present in the store
nanoId is same as uuid 

Slice has 3 things: 1. name 2. initial state 3. reducers which is an object that stores all the reducers

reducerFuntions have two things state and action, state gives access to the current state and action provides the unique data, everything that we send from react is stored in the actionPayload

Exporting: we have to individually export all the reducers to use in the react and the reducer for the store to access the reducers

```javascript 
import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
    }
})

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer
```

## useDispatch

useDispatch is used to change the state in store / send data to the store
useDispatch is a fn of the react-redux and not reactToolkit

we need to have the reducerFunction/ reducerSlice to tell what the dispatch has to do

```javascript
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from '../redux/features/todo/todoSlice'


const AddTodo = () => {

    const [input,setInput] = useState('')
    const dispatch = useDispatch();

    const addTodohandler=(e)=>{
        e.preventDefault();
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <form onSubmit={addTodohandler}>
        <input placeholder='Text input' type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
        <button>Add todo</button>
    </form>
  )
}

export default AddTodo
```
## useSelector

useSelector allows us to select data from the store

gives access to state which has all the objects



``` javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../redux/features/todo/todoSlice'

const Todo = () => {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch();

    return (
        <div>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
                </li>
            ))}
        </div>
    )
}

export default Todo
```
