import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

/** Form to update user profile
 *  
 * Routed at /profile/update
 */
const FamilySelect = ({ families, familyId, changeFamilyId }) => {
  const [famId, setFamId] = useState(familyId)

  const familyOptions = families.map(ele => (
     {
       value: ele.familyId,
       label: ele.familyName
      }
    )
  )

  const handleChange =  async (event) => {
    const {value} = event.target;
    setFamId(value);
    changeFamilyId(value);
  }

  return (
      <Box>
        <TextField
          id="primFamId"
          select
          label="Select FitFam"
          value={famId}
          onChange={handleChange}
          sx={{backgroundColor: "#FFF", minWidth: 260}}
          InputProps={{style: {fontSize: '20px'}}}
        >
          {familyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}> 
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </Box>
  )
}

export default FamilySelect;