import React,{useState, useEffect} from "react";

function ToDolist(){
    const [todolists, setTodolists] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
    });

    useEffect(() => {
        fetch('http://localhost:3000/to_do_lists/')
           .then((response) => response.json())
           .then((data) => setTodolists(data))
           .catch((error) => console.error('Error fetching posts:', error));
           }, []);

    const createTodo = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/to_do_lists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        })
           .then((response) => response.json())
           .then((data) => {
                setTodolists((prevTodos) => {
                    const updatedTodos = Array.isArray(prevTodos)? prevTodos : [];
                    return [data,...updatedTodos];
                });
                setNewTodo({title: ''});
            })
           .catch((error) => console.error('Error creating Todo:', error));
    };
    const deleteTodo = (id) => {
        fetch(`http://localhost:3000/to_do_lists/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                setTodolists((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            } else {
                console.error('Error deleting Todo');
            }
        })
        .catch((error) => console.error('Fetch error:', error));
    };
    
    return (
        <div>
            <h2>To-Do List</h2>
            <form onSubmit={createTodo}>
                <input type="text" placeholder="Add a new task" value={newTodo.title} onChange={(e) => setNewTodo({...newTodo, title: e.target.value})} 
                required />
                <button type="submit">Add Task</button>
            </form>
          
            <div>
                <h3>Completed Tasks:</h3>
                <ul>
                {todolists.map((todo, index) => (
                    <li key={index}>{todo.title}
                    <button onClick={() => deleteTodo(todo.id)}>X</button>
                    </li>
                    
                  
                ))}
                 </ul>
                <ul>
            
                </ul>
            </div>
        </div>
    );
}

export default ToDolist;