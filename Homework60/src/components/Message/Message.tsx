import {Box, Typography} from '@mui/material';
import React from 'react';

interface Props {
  message: string;
  author: string;
  datetime: string;
}

const Message: React.FC<Props> = ({message, author, datetime}) => {
  return (
    <Box component="section" sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      padding: '16px',
      width: '660px',
    }}>
      <Typography variant="h6" component="p">
        {author}
      </Typography>
      <Typography variant="body2" component="p">
        {message}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
        {new Date(datetime).toLocaleString('ru-RU', {dateStyle: "medium", timeStyle: "medium"})}
      </Typography>
    </Box>
  );
};

export default Message;