import {useEffect, useState} from 'react';
import {MessageType} from '../../types';
import AddMessageForm from '../../components/AddMessageForm/AddMessageForm';
import {Stack} from '@mui/material';
import Message from '../../components/Message/Message';

const url = 'http://146.185.154.90:8000/messages';

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(url);
      if (response.ok) {
        const messagesData = await response.json() as MessageType[];
        const newMessages = messagesData.map((message) => ({
          _id: message._id,
          message: message.message,
          author: message.author,
          datetime: message.datetime,
        }));
        setMessages(newMessages);
      }
    };
    void getMessages();
  }, []);

  return (
    <>
      <AddMessageForm />
      <Stack spacing={2} sx={{minWidth: 12}} direction="column" alignItems="center" mt={5}>
        {messages.map((message: MessageType) => {
          return <Message
            key={message._id}
            message={message.message}
            author={message.author}
            datetime={message.datetime}
          />;
        })}
      </Stack>
    </>
  );
};

export default Chat;