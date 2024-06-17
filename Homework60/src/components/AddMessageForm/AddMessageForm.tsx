import React, {ChangeEvent, useState} from 'react';
import {Button, FormControl, OutlinedInput, TextField} from '@mui/material';

const url = 'http://146.185.154.90:8000/messages';

const postData = async (url: string, message: string, author: string) => {
  const data = new URLSearchParams();
  data.set('message', message);
  data.set('author', author);

  await fetch(url, {
    method: 'post',
    body: data,
  });
};

const AddMessageForm = () => {

  const [messageData, setMessageData] = useState({
    message: '',
    author: '',
  });

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setMessageData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await postData(url, messageData.message, messageData.author);

      setMessageData({
        message: '',
        author: '',
      });

    } catch (error) {
      console.error('Network Error:', error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}
          style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <FormControl sx={{width: '50ch', marginRight: '2rem'}}>
        <TextField
          name="message"
          fullWidth
          label="Enter your message"
          value={messageData.message}
          onChange={onFieldChange}
        />
      </FormControl>
      <FormControl sx={{width: '20ch', marginRight: '2rem'}}>
        <OutlinedInput
          name="author"
          placeholder="Name"
          value={messageData.author}
          onChange={onFieldChange}
          required/>
      </FormControl>
      <Button variant="contained" type="submit">Send</Button>
    </form>
  );
};

export default AddMessageForm;