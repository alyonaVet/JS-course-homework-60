import {useEffect, useState} from 'react';
import {MessageType} from '../../types';
import AddMessageForm from '../../components/AddMessageForm/AddMessageForm';
import {Backdrop, CircularProgress, Stack} from '@mui/material';
import Message from '../../components/Message/Message';


const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [preload, setPreload] = useState<boolean>(true);

  const getMessages = async (lastMessage?: MessageType) => {
    try {
      const lastMessageDatetime = !lastMessage ? '' : `?datetime=${lastMessage.datetime}`;
      const url = `http://146.185.154.90:8000/messages${lastMessageDatetime}`;

      const response = await fetch(url);
      if (response.ok) {
        const messagesData: MessageType[] = await response.json();
        const newMessages = messagesData.map((message) => ({
          _id: message._id,
          message: message.message,
          author: message.author,
          datetime: message.datetime,
        }));
        setMessages([...messages, ...newMessages]);
      }
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setPreload(false);
    }
  };

  useEffect(() => {
    void getMessages();
  }, []);

  useEffect(() => {
    const lastMessage: MessageType = messages[messages.length - 1];
    const interval = setInterval(() => getMessages(lastMessage), 3000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <>
      <AddMessageForm/>
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
      <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={preload}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </>
  );
};

export default Chat;