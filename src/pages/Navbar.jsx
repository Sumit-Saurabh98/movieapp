import React, { useEffect } from 'react';
import { useState } from 'react';
import { BiMoviePlay, BiSolidSave } from "react-icons/bi";
import {MdFavorite, MdAccountCircle} from "react-icons/md";
import {useNavigate} from "react-router-dom"

function Navbar(props) {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [userDisplayName, setUserDisplayName] = useState(localStorage.getItem('userDisplayName') || null);

    const storedUserId = localStorage.getItem('userId');

    useEffect(() => {
        
        const storedUserDisplayName = localStorage.getItem('userDisplayName');
        if (storedUserId && storedUserDisplayName) {
            setUserId(storedUserId);
            setUserDisplayName(storedUserDisplayName);
        }
    }, [storedUserId]);

    return (
        <div>

            <div style={{backgroundColor:"#374151"}} className="fixed bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <button onClick={()=>navigate("/")} style={{color:"#9BA3AF"}} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <span style={{fontSize:"30px"}}><BiMoviePlay/></span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Movies</span>
                    </button>
                    <button onClick={()=>navigate("/favorite")} style={{color:"#9BA3AF"}} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <span style={{fontSize:"30px"}}><MdFavorite/></span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Favorites</span>
                    </button>
                    <button onClick={()=>navigate("/watchlist")} style={{color:"#9BA3AF"}} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <span style={{fontSize:"30px"}}><BiSolidSave/></span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Watchlist</span>
                    </button>
                    <button onClick={()=>navigate("/authentication")} style={{color:"#9BA3AF"}} type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <span style={{fontSize:"30px"}}><MdAccountCircle/></span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                            {userId === null ? "Login" : userDisplayName.split(" ")[0]}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
