import {MessageType} from '../../types';
import React, {ChangeEvent, useState} from 'react';
import {Button, FormControl, OutlinedInput, TextField} from '@mui/material';

interface AddMessageProps {
  onSubmit: (message: MessageType) => void;

}

const AddMessageForm: React.FC<AddMessageProps> = ({onSubmit}) => {

  const [messageData, setMessageData] = useState({
    message: '',
    author: '',
    datetime: '',
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

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const message: MessageType = {
      ...messageData,
      id: Math.random().toString(),
      datetime: new Date().toLocaleString('ru-RU', {dateStyle: "medium", timeStyle: "medium"}),
    };
    onSubmit(message);
    setMessageData({
      message: '',
      author: '',
      datetime: ''
    });
  };

  return (
    <form onSubmit={onFormSubmit} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <FormControl sx={{width: '50ch', marginRight: '2rem'}}>
        <TextField name="message" fullWidth label="Enter your message" onChange={onFieldChange}/>
      </FormControl>
      <FormControl sx={{width: '20ch', marginRight: '2rem'}}>
        <OutlinedInput name="author" placeholder="Name" onChange={onFieldChange} required/>
      </FormControl>
      <Button variant="contained" type="submit">Send</Button>
    </form>
  );
};

export default AddMessageForm;