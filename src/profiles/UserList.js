import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/** Shows list of users
 *  
 * FamilyProfile -> FamilyDetails -> Users
 */
const UserList = ({ users }) => {
  return (
    <Stack spacing={1} >
      {users.map(user => (
        <Button 
          component={RouterLink}
          to={`/users/${user.userId}`}
          key={user.userId} 
          sx={{textTransform: 'none'}}
        >
          <Typography 
            variant="h6" 
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Button> 
        )
      )}
    </Stack>
  )
}

export default UserList;