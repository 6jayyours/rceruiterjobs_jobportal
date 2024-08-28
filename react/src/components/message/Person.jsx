import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slice/authSlice';

const Person = ({to}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (to) {
      dispatch(getUser(to))
        .then((response) => {
          setName(response.payload.firstName+" "+response.payload.lastName)
          setImg(response.payload.profileImageUrl);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, [dispatch, to]);

  return (
    <div className="flex items-center p-6 bg-indigo-100">
      <img src={img} alt="" className="w-16 h-16 rounded-full   mr-6 shadow-sm" />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
       
      </div>
    </div>
  );
};

export default Person;
