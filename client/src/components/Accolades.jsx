import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { useParams } from 'react-router-dom';



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
            <button onClick={toggleAccolades}>
                {showAccolades ? 'Hide Accolades' : 'Show Accolades'}
            </button>
            {showAccolades && (
                <div>
                    <h3>Accolades</h3>
                    <ul>
                        {game.accolades.map((accolade, index) => {
                            return (
                                <li>
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