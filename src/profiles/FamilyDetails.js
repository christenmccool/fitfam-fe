import React from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import UserList from './UserList';

/** Shows details of family profile, including list of users
 *  FamilyProfile -> FamilyDetails -> Users
 */
const FamilyDetails = ({ family }) => {

  return (
    <Box m={2} py={5}>
      <Grid container spacing={2} justifyContent="center">
        {family.imageUrl ?
          <Grid item xs={12}>
            <Box
              component="img"
              sx={{ maxWidth: { xs: 300, md: 450 } }}
              alt="Family image"
              src={family.imageUrl}
            />
          </Grid>
          :
          null
        }
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center"  color="primary" gutterBottom >
              {family.familyName}
          </Typography>

          <Typography variant="h4" textAlign="center"  color="text.primary" >
              Join code:
          </Typography>
          <Typography variant="h3" textAlign="center"  color="secondary" gutterBottom >
              {family.joinCode}
          </Typography>

          <Typography variant="h5" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
            {family.bio}
          </Typography>

          <Typography variant="h6" color="text.secondary" mb={1}>
            {`FitFam since:  ${moment(family.createDate).format("MMMM Do, YYYY")}`}
          </Typography>
        </Grid>
      </Grid>
      <Box mt={8}>
        <hr />
        <Typography variant="h4" textAlign="center" gutterBottom mt={2} >
          {family.users.length > 1 ? "Family members:" : "Family member:"}
        </Typography>
        <UserList users={family.users} />
      </Box>
    </Box>
  )
}

export default FamilyDetails;