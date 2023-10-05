import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK, REMOVE_TASK } from '../utils/mutations'
import { GET_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';

function Tasks() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');

    const [addTaskMutation] = useMutation(ADD_TASK);
    const [removeTaskMutation, {error}] = useMutation(REMOVE_TASK);
    const { loading, data } = useQuery(GET_ME);

    console.log(data, "test")
    console.log(data?.me.savedGames[0].completionTasks)


    const user = data?.me;


    const addTask = (task) => {
        const newTask = {
            id: Math.random(),
            task: task,
            completed: false,
        };


        addTaskMutation({
            variables: {
                gameId: 5,
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
                    {user?.savedGames[0].completionTasks.map((task, index) => {
                        console.log(task.completed)
                        console.log(task)
                        return (
                            <li key={index}>
                                {task}
                                <button onClick={() => removeTask(user.savedGames[0].gameId, task)}>Done!</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}


export default Tasks;
