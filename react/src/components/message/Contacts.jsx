import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReceiverIdsBySenderId, getUser, getUsersByIds } from '../../redux/slice/authSlice';

const Contacts = ({ toId }) => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.auth.id);
  const role = useSelector(state => state.auth.role);
  const [allReceivers, setAllReceivers] = useState([]);
  
  useEffect(() => {
    dispatch(fetchReceiverIdsBySenderId(id))
      .then((response) => {
        console.log(response);
        if (response.payload.length === 0 && toId) {
          return dispatch(getUser(toId)).then((newUserResponse) => {
            const newUser = newUserResponse.payload;
            setAllReceivers([newUser]);
          });
        } else {
          const receiverIds = response.payload;
          return dispatch(getUsersByIds(receiverIds)).then((usersResponse) => {
            setAllReceivers(usersResponse.payload);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching receiver data:', error);
      });
  }, [dispatch, id, toId]);

  const handleSendMessage = (user) => {
    const queryString = `userId=${encodeURIComponent(user)}`;
    window.location.href = `/message/${role === 'USER' ? 'user' : 'recruiter'}?${queryString}`;
  };

  return (
    <div className="w-full h-full bg-white p-4 overflow-y-auto shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Contacts</h2>
      {allReceivers.length > 0 ? (
        <ul>
          {allReceivers.map(contact => (
            <li
              key={contact.id}
              onClick={() => handleSendMessage(contact.id)}
              className="flex items-center mb-4 p-2 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors duration-300 ease-in-out"
            >
              <img
                src={contact.profileImageUrl}
                alt={contact.firstName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-gray-600">
                {contact.firstName} {contact.lastName}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No contacts available.</p>
      )}
    </div>
  );
};

export default Contacts;
