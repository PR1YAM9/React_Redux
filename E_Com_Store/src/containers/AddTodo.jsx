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