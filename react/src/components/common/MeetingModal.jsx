import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const MeetingModal = () => {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(roomCode);
        navigate(`/room/${roomCode}`);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-40">
            <form onSubmit={handleFormSubmit}>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Enter Room Code</h1>
                    <input
                        type='text'
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="Room code"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type='submit'
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Enter Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MeetingModal;
