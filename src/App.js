import { useState } from "react";
import "./index.css";
function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([])

  function addItems(item) {
    setItems((items)=>[...items, item])
    
  }

  function handleDeletItem(id) {
    setItems((items)=> items.filter((item)=> item.id !==id))
    
  }

  function handleClear() {
    setItems([])
  }


  const initialTodo = [
    { id: 1, text: "Comb my hair" },
    { id: 2, text: "Cooking" },
  ];

  return (
    <div className="app">
      <Nav>Todo List</Nav>
      <Form input={input} setInput={setInput} onAddItem = {addItems}></Form>
      <Todo items={items} setItems={setItems} onDelete= {handleDeletItem}></Todo>
      <ClearList handleClear = {handleClear}></ClearList>
    </div>
  );
}

export default App;

function Nav({ children }) {
  return (
    <div className="nav">
      <h2>{children}</h2>
    </div>
  );
}

function Form({input, setInput, onAddItem}) {

  function onSubmitForm(e) {
    e.preventDefault();
    if (!input) return;

    const newTodo = { id: crypto.randomUUID(), text: input}
    onAddItem(newTodo)

    setInput('')
  }

  return (
    <div className="form">
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Add a Todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

function Todo({ items, setItems , onDelete}) {
  return (
    <div className="container">
      <div>
        <ul className="todo">
          {items.map((todoitem) => (
            <TodoList todoitem={todoitem} onDelete={onDelete} key={todoitem.id}></TodoList>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TodoList({ todoitem, onDelete }) {
  return (
    <li>
      <span>{todoitem.text}</span>

      <button onClick={()=>onDelete(todoitem.id)}>Remove</button>
    </li>
  );
}
function ClearList({handleClear}) {
  return (
    <div className="cl">
      <button onClick={handleClear}>Clear List</button>
    </div>
  );
}
