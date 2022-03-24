import React, {useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';


/** Form for new user to select FitFam option or existing user to join/create a family
 * User can join an existing FitFam with its join code, or create a new FitFam
 * For new user, option to join no family other than Team FitFam
 * 
 * Signupform -> FamilySignupFormWrapper -> FamilySignupForm
 * AddFamilyForm -> FamilySignupForm
 */
const FamilySignupForm = ({ signupFamily, includeNone=false, afterFormCompleted }) => {
  const options = [
    {
      value: 'join',
      label: 'Join an existing FitFam',
      label2: 'Enter join code'
    },
    {
      value: 'create',
      label: 'Create a new FitFam',
      label2: 'Enter new FitFam name (spaces okay)'
    }
  ]

  if (includeNone) {
    options.push({
        value: 'none',
        label: 'Team FitFam only for now'
    });
  }

  const [famOption, setFamOption] = useState("join");
  const [famData, setFamData] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFamOptChange =  async (event) => {
    const {value} = event.target;
    setFamOption(value);
    setFamData("");
    setErrors([]);
  }

  const handleFamDataChange =  async (event) => {
    const {value} = event.target;
    setFamData(value);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    if (includeNone && famOption === "none") {
      afterFormCompleted();
    } else {
      const result = await signupFamily(famOption, famData);
      if (result.success) {
        afterFormCompleted(famOption, result.familyId);
      } else {
        setErrors(result.err);
      } 
    }
  }

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Box>
          <TextField
            margin="normal"
            id="famOption"
            select
            label="Select FitFam option"
            value={famOption}
            onChange={handleFamOptChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        
        {famOption  !=="none" ?
          <TextField
            margin="normal"
            fullWidth
            required
            id={famOption}
            name={famOption}
            label={options.find(ele => ele.value === famOption).label2}
            onChange={handleFamDataChange}
            value={famData}
          />
          : null
        }

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>

      {errors.length ?
        <Alert messages={errors} />
        : null
      }
    </Box>
  )
}

export default FamilySignupForm;