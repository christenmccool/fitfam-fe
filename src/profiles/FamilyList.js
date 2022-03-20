import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


/** Shows list of families, with primary family highlighted
 * 
 *  UserProfile -> UserDetails -> FamilyList
 */
const FamilyList = ({ families }) => {
  const primaryFamilyId = families.find(ele => ele.primaryFamily === true).familyId;

  return (
    <Stack >
      {families.map(family => (
        <Button 
          component={RouterLink}
          to={`/families/${family.familyId}`}
          key={family.familyId} 
          sx={{textTransform: 'none'}}
        >
          <Typography 
            variant="h6" 
            sx={{
              my: family.familyId===primaryFamilyId ? '5px' : '0px',
              px: 2, 
              py: '3px',
              display: 'inline-block', 
              bgcolor: family.familyId===primaryFamilyId ? 'secondary.main' : 'none', 
              borderRadius: '5px'
            }}
          >
            {family.familyName}
          </Typography>
        </Button> 
        )
      )}
    </Stack>
  )
}

export default FamilyList;