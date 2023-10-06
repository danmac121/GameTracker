import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK, REMOVE_TASK } from '../utils/mutations'
import { GET_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

function Tasks() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');
    const [addTaskMutation] = useMutation(ADD_TASK);
    const [removeTaskMutation, {error}] = useMutation(REMOVE_TASK);
    const { loading, data } = useQuery(GET_ME);
    const { gameId } = useParams();


    const user = data?.me || {savedGames: []};

    const [game] = user.savedGames.filter(game => game._id === gameId )

    console.log("!!!", game)


    const addTask = (task) => {
        const newTask = {
            id: Math.random(),
            task: task,
            completed: false,
        };


        addTaskMutation({
            variables: {
                gameId: game.gameId,
                completionTasks: [...list, newTask].map((task) => task.task),
            },
        });

        setList([...list, newTask]);
        setInput('');
    };


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
            <h3>Completion Tasks</h3>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => addTask(input)}>Add Task</button>
            <div>
                <ul>
                    {game.completionTasks.map((task, index) => {
                        console.log(task.completed)
                        console.log(task)
                        return (
                            <li>
                                {task}
                                <button onClick={() => removeTask(game.gameId, task)}>Done!</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}


export default Tasks;
