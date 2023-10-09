import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK, REMOVE_TASK } from '../utils/mutations'
import { GET_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';
import Accolades from './Accolades';
import { useParams } from 'react-router-dom';
import "../pages/SingleGame.css"


function Tasks() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');
    const [addTaskMutation] = useMutation(ADD_TASK);
    const [removeTaskMutation, {error}] = useMutation(REMOVE_TASK);
    const { loading, data } = useQuery(GET_ME);
    const { gameId } = useParams();


    const user = data?.me || {savedGames: []};

    //retrieves single game ID
    const [game] = user.savedGames.filter(game => game._id === gameId )

  

    const addTask = (task) => {
        const newTask = {
            id: Math.floor(Math.random()*1000),
            task: task,
            completed: false,
        };

        //adds task to completionTasks array
        addTaskMutation({
            variables: {
                gameId: game.gameId,
                completionTasks: [...game.completionTasks, newTask.task]
            },
        });

        setList([...game.completionTasks, newTask]);
        setInput('');
    };

    //removes task from completionTasks array
    const removeTask = (gameId, task) => {
        removeTaskMutation({
          variables: {
            gameId: gameId,
            taskCompleted: task,
          },
          refetchQueries: [{ query: GET_ME }],
        });
      };

      
      return (
          <div>
            <h3 className='taskHeader'>Completion Tasks</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className='addTaskButton' onClick={() => addTask(input)}>Add Task</button>
            <div>
                <ul>
                    {game.completionTasks.map((task, index) => {
                        return (
                            <li className='taskList'>
                                {task}
                                <button className='taskButton' onClick={() => removeTask(game.gameId, task)}>Done!</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Accolades />
        </div>
        
        );
}


export default Tasks;
