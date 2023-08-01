import React, { useState } from 'react';
import axios from 'axios';
import Body from '../Body/Body'

const Form = ({ access_token }) => {
    const [query, setQuery] = useState('');
    const [tracks, set_tracks] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleClick = () => {
        if (tracks) {
            set_tracks([])
        }
        try {
            let url = 'https://api.spotify.com/v1/search?q=' + query + '&type=track,artist';
            axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
            })
                .then(res => {
                    set_tracks(res.data.tracks.items);
                })
        } catch (err) {
            console.error(err);
        } finally {
            console.log(tracks);
        }
    }

    return (
        <>
            <div className='flex'>
                <input
                    onChange={handleChange}
                    value={query}
                    type="text"
                    className="bg-white px-2 py-1 rounded-bl rounded-tl w-80 mb-3"
                    placeholder="Silahkan masukkan artis ...."
                />
                <button
                    onClick={handleClick}
                    className="bg-[#b3b3b3] hover:bg-gray-600 px-2 py-2 mb-3 text-black rounded-br rounded-tr"
                >
                    <svg
                        role="img"
                        height="24px"
                        width="24px"
                        aria-hidden="true"
                        className="text-black" // Use the CSS class for white icon
                        viewBox="0 0 24 24"
                        data-encore-id="icon"
                    >
                        <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
                    </svg>
                </button>
            </div>
            <Body tracks={tracks} />
        </>
    );
};

export default Form;