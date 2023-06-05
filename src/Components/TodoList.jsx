import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";


export const TodoList = () => {

  const [todos, setTodos] = useState([]);
  const [friends, setFriends] = useState([]);
  const refInput = useRef("");
  const navigate = useNavigate();

  const TODOS_KEY = 'toodosKey'
  
  // Set up the proper usage of useQuery hook
  const url = `https://jsonplaceholder.typicode.com/posts/`;
    const usersQuery = useQuery(`posts`, async()=> await axios.get(url),{
        refetchOnWindowFocus: false,
        enabled: false
    })

    if (usersQuery.isFetched && todos ===""){
      setTodos(usersQuery.data.data.title)
    }

  useEffect(() => {
    // Load todos (if any) from localStorage
    const todos =JSON.parse(localStorage.getItem(TODOS_KEY))
    // parse through the stored to-do's and set them in state
    setTodos(todos)
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem(TODOS_KEY,JSON.stringify());
    
  }, [todos]);

  const handleAddTodo = () => {
      // access the input and update the state variable "todos"
      let text = refInput.vurrent.value;
      setTodos(text)
  };


  const handleFetchFriends = async () => {
    // refetch your implementation of the useQuery hook
    await usersQuery.refetch();
    
    // extract data into a new array and extract only the names from this array of objects
    const newArray = todos;

    const result = newArray.filter(name => todos.name);
    
    console.log(result);
    
    //setFriends(friendsNamesArray);
    setFriends(friends)
  }

  const handleDeleteTodo = (index) => {
    // filter out the todo that was deleted from the array - hint: keep the rest of the todos in an array
    const newArray = todos;
    const result = newArray.filter(name => todos.name);
    const filteredArray = result.filter(index=> {
      return index.id !== index.JSONid;
    });

    console.log(result);
    // update todos array
    setTodos(filteredArray);
  };
  
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("TODOS_KEY")
    // route user back to sign in page
    navigate("/")
  };

  return (
    <div>
      <input ref={refInput}
        type="text"
      />
      <button onClick={handleAddTodo}>Add to your list</button>
      <h3>To do:</h3>
      <ul id="todo-list">
        {/* Use map to return the todos here :) */
         todos?.map((todos, index) => {
          return(
            <li key={index}>
              {todos}
            </li>
          )
        })
        }
      </ul>
      <button id="get-friends-btn" onClick={handleFetchFriends}>Get friends list</button>
      <h3>Your active friends: </h3>
      <ul id="friends-list">
        {friends?.map((friend, index) => {
          return(
            <li key={index}>
              {friend}
            </li>
          )
        })}
      </ul>
      {/* Add delete Button */}
      <button id="delete-btn" onClick={handleDeleteTodo}>
        Delete
      </button>
      <button id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
