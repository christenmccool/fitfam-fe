import React from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import FamilyList from '../families/FamilyList';

/** Shows details of a user's profile, including list of families
 * 
 *  UserProfile -> UserDetails -> FamilyList
 */
const UserDetails = ({ user }) => {

  return (
    <Box m={2} py={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Avatar sx={{ width: 150, height: 150 }} src={user.imageUrl} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h3" textAlign="center"  color="primary" gutterBottom >
              {`${user.firstName} ${user.lastName}`}
          </Typography>

          <Typography variant="h5" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
            {user.bio}
          </Typography>

          <Typography variant="h6" color="text.secondary" mb={1}>
            {`Member since:  ${moment(user.createDate).format("MMMM Do, YYYY")}`}
          </Typography>
        </Grid>
      </Grid>
      <Box mt={8}>
        <hr />
        <Typography variant="h4" textAlign="center" color="secondary" gutterBottom mt={2} >
          {user.families.length > 1 ? "Families:" : "Family:"}
        </Typography>
        <FamilyList families={user.families} />
      </Box>
    </Box>
  )
}

export default UserDetails;