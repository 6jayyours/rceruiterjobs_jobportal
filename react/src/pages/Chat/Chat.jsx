import React, { useEffect, useRef, useState } from 'react';
import Contacts from '../../components/message/Contacts';
import Person from '../../components/message/Person';
import Message from '../../components/message/Message';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { over } from "stompjs";
import { useLocation } from 'react-router';

const Chat = () => {
  const [history, setHistory] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedContact, setSelectedContact] = useState(null); // State to hold selected contact information
  const id = useSelector((state) => state.auth.id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const toId = queryParams.get("userId");



  const stompClient = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    const connect = () => {
      const socket = new SockJS("https://recruiterjobs.online/ws");
      stompClient.current = over(socket);
      stompClient.current.connect({}, onConnected, onError);
    };

    connect();

    // Cleanup function to disconnect on unmount
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (toId) {
      axios
        .get(`https://recruiterjobs.online/api/ws/messages/${id}/${toId}`)
        .then((res) => {
          setHistory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [toId]);

  const onConnected = () => {
    console.log("Connected to WebSocket");

    stompClient.current.subscribe(
      `/user/${id}/queue/messages`,
      onMessageReceived
    );
  };

  const onError = () => {
    console.error("Error connecting to WebSocket");
  };

  const onMessageReceived = (payload) => {
    console.log("recieved");
    console.log("Message received", payload);
    const message = JSON.parse(payload.body);
    console.log("passing the condition ");
    setHistory((prev) => [...prev, message]);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (messageInput && stompClient) {
      const chatMessage = {
        senderId: id,
        receiverId: toId,
        content: messageInput,
        timestamp: new Date(),
      };
      stompClient.current.send("/app/chat", {}, JSON.stringify(chatMessage));
      setHistory((prev) => [...prev, chatMessage]);
      setMessageInput("");
    }
  };



  return (
    <div className="flex h-[69vh] overflow-hidden mt-24 p-2">
      <div className="w-1/4 h-full border border-gray-300">
        <Contacts to={toId} />
      </div>
      <div className="flex flex-col w-3/4 h-full">
        <div className="border border-gray-300">
         <Person to={toId}/>
        </div>
        <div className="flex-grow overflow-y-auto overflow-hidden border border-gray-300">
          <Message handleSend={handleSend} messageInput={messageInput} setMessageInput={setMessageInput} history={history}  to={toId} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
