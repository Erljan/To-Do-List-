import { useState } from "react"


function TodoList(){
    const [todo, setTodo] = useState("")
    const [tasks, setTask] = useState([])

    const addTodo = (e) => {
        setTodo(e.target.value)
    }


    const addToList = (e) => {
        e.preventDefault()
        if(todo.trim()){
            setTask([...tasks, {"todo": todo, "completed": false}])
            }
        setTodo("")
            // console.log(tasks)
    }
            
    const toggleTask = (idx) =>{
        const newTask = tasks.map((task,i) => {
            if(i === idx){
                return {...task, completed: !task.completed}
            } else {
                return task
            }
        })
        setTask(newTask)
    }
                    
    //     console.log(task)

    const deleteTask = (idx) => {
        const newTasks = tasks.filter((_, i) => i !== idx)
        setTask(newTasks)
    }
    
    // const scratchTask = () => {
    //     const newTasks = tasks.map((task, idx) => {
    //         if
    //     })
    // }





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
                            <li key={idx} className={task.completed ? 'completed' : ''}>
                                <span className="remove" onClick={() => toggleTask(idx)}>{task.todo}</span>
                                <button className="delete" onClick={() => deleteTask(idx)}>Delete</button>
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