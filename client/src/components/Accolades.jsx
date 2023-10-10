import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { useParams } from 'react-router-dom';
import "./TaskStream.css"


function Accolades() {
    const { loading, data } = useQuery(GET_ME);
    const { gameId } = useParams();

    const user = data?.me || { savedGames: [] };
    const [game] = user.savedGames.filter(game => game._id === gameId);

    const [showAccolades, setShowAccolades] = useState(false);

    const toggleAccolades = () => {
        setShowAccolades(!showAccolades);
    };

    //Display list of completed tasks when button is clicked

    return (
        <div>
            <button className='accoladeButton' onClick={toggleAccolades}>
                {showAccolades ? 'Hide Accolades' : 'Show Accolades'}
            </button>
            {showAccolades && (
                <div>
                    <h3 className='accoladeHeader'>Accolades</h3>
                    <ul>
                        {game.accolades.map((accolade, index) => {
                            return (
                                <li className='accolades'>
                                    {accolade}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    );



}


export default Accolades;