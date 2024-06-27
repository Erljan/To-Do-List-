import { useEffect, useState } from "react"
import axios from "axios"


// const apiUrl = "http://127.0.0.1:8001/tasks"

function TodoList(){
    const [todo, setTodo] = useState("")
    const [tasks, setTask] = useState([])

    useEffect(() => {
        fetchTask()
    }, [])

    const fetchTask = async() => {
        const response = await axios.get("http://127.0.0.1:8001/tasks")
        setTask(response.data)
    }

    const addTodo = (e) => {
        setTodo(e.target.value)
    }


    const addToList = async(e) => {
        e.preventDefault()
        if(todo.trim()){
            const response = await axios.post("http://127.0.0.1:8001/tasks", { text: todo})
            setTask([...tasks, response.data])
            }
        setTodo("")
            // console.log(tasks)
    }
            
    const toggleTask = async(id) =>{
        const task = tasks.filter(task => task.id === id)
        const updatedTask = {...task, completed: !task.completed}
        await axios.put(`http://127.0.0.1:8001/tasks/${id}`, updatedTask)

        // setTask(tasks.map(task => task.id === id ? updatedTask : task))
    }   
    
    const toggle = (idx) => {
        const task = tasks.map((task , i) => {
            if (idx === i){
                return {...task, completed: !task.completed}
            } else {
                return task
            }
        })
        setTask(task)
    }
    //     console.log(task)

    const deleteTask = async(id) => {
        await axios.delete(`http://127.0.0.1:8001/tasks/${id}`)     
        setTask(tasks.filter((task) => task.id !== id))
    }






return (
    <>
            <div className="container" id="container">
                <h1>
                    To Do List
                </h1>
                <form onSubmit={addToList}>
                    <input type="text" id="input" value={todo} onChange={addTodo} placeholder="Enter something to do"/>
                    <button type="submit" id="btn" >Add</button>
                </form>
                <div className="list-container">
                    <ul id="ul">
                        {tasks.map((task, idx) => (
                            <li key={task.id} className={task.completed ? 'completed' : ''} onClick={() => toggle(idx)}>
                                <span className="remove" onClick={() => toggleTask(task.id)}>{task.text}</span>
                                <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
    </>
    )

}
    
export default TodoList




        // const addList = (e) =>{
        //     e.preventDefault()
        //     const input = document.getElementById("input")
        //     const ul = document.querySelector("ul")
        //     let value = input.value
        
        //     const li = document.createElement("li")
        //     li.innerHTML = `${value} <span class="close-btn">&times;</span>`
        
        //     ul.append(li)
        
        //     document.getElementById("ul").addEventListener("click", (e)=>{
        //         if(e.target.classList.contains("close-btn")){
        //             const listItem = e.target.parentNode
        //             listItem.remove(listItem)
        //         }
        //     })