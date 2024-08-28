import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/authSlice";
import moment from 'moment';

const Message = ({ handleSend, messageInput, setMessageInput, history, to }) => {
  const id = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [senderImg, setSenderImg] = useState(null);
  const [receiverImg, setReceiverImg] = useState(null);

  useEffect(() => {
    if (to) {
      dispatch(getUser(to))
        .then((response) => {
          console.log(response.payload.profileImageUrl)
          setSenderImg(response.payload.profileImageUrl);
        })
        .catch((error) => {
          console.error('Error fetching sender profile image:', error);
        });
    }
    if (id) {
      dispatch(getUser(id))
        .then((response) => {
          console.log(response.payload.profileImageUrl)
          setReceiverImg(response.payload.profileImageUrl);
        })
        .catch((error) => {
          console.error('Error fetching receiver profile image:', error);
        });
    }
  }, [dispatch, id, to]);

  const chatContainerRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setSelectedAudio(event.target.files[0]);
  };

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.files[0]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const isSender = (messageSenderId) => {
    return messageSenderId === id;
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white rounded-lg shadow-md">
      <div
        ref={chatContainerRef}
        className="mt-4 h-72 overflow-y-auto hide-scrollbar"
      >
        {history.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              isSender(message.senderId) ? "justify-end" : "justify-start"
            }`}
          >
            {!isSender(message.senderId) && (
              <img src={senderImg} alt="" className="w-10 h-10 rounded-full mr-3" />
            )}
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-semibold mr-2"></span>
              </div>
              <div className="mt-1 text-gray-700">{message.content}</div>
              <span className="text-xs text-gray-500">
              {moment(message.timestamp).format('HH:mm')}
              </span>
            </div>
            {isSender(message.senderId) && (
              <img
                src={receiverImg}
                alt=""
                className="w-10 h-10 rounded-full ml-3"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message"
        />
        {/* <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="hidden"
          id="file-input"
        /> */}
        {/* <label
          htmlFor="file-input"
          className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        >
          📷
        </label>
        <input
          type="file"
          onChange={handleAudioChange}
          accept="audio/*"
          className="hidden"
          id="audio-input"
        />
        <label
          htmlFor="audio-input"
          className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        >
          🎵
        </label>
        <input
          type="file"
          onChange={handleDocumentChange}
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          id="document-input"
        />
        <label
          htmlFor="document-input"
          className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        >
          📄
        </label> */}
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
