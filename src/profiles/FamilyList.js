import React from 'react';
import moment from 'moment';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


/** Shows list of families, with primary family highlighted
 */
const FamilyList = ({ families }) => {
  const primaryFamilyId = families.find(ele => ele.primaryFamily === true).familyId;

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      {families.map(family => (
        <Box key={family.familyId} sx={{display: 'inline-block'}}>
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
        </Box> 
        )
      )}
    </Box>
  )
}

export default FamilyList;