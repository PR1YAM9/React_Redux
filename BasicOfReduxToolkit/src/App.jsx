import React from 'react'
import Todo from './containers/Todo'
import AddTodo from './containers/AddTodo'

const App = () => {
  return (
    <div>
      <AddTodo/>
      <Todo/>
    </div>
  )
}

export default App