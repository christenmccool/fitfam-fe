import React, {useState} from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Alert from '../common/Alert';

/** Form for posting a new workout or editing an existing workout posting
 * 
 * date and famName supplied by the parent
 * when editing, woName and woDescription are supplied from the parent PostingEditPage 
 * 
 * PostingNewPage -> {CustomPostingForm, AddWoPostingForm}
 * PostingEditPage -> CustomPostingForm
 */
const CustomPostingForm = ({formType="create", date, famName, submitPostForm, woName, woDescription, deleteWoPost}) => {
  const navigate = useNavigate();

  const initialState = {
    woName: woName || "",
    woDescription: woDescription || ""
  }
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleChange =  async (event) => {
    const {name, value} = event.target;
    setFields({...fields, [name]:value})
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const result = await submitPostForm(fields);

    if (result.success) {
      navigate(`/postings/${result.postId}`);
    } else {
      setErrors(result.err);
    } 
  }

  const handleDelete = () => {
    deleteWoPost();
    navigate(`/?date=${date}`);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} mt={1} >
      <Grid container spacing={2} justifyContent="center">
        {formType === "edit" ?
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="date"
                name="date"
                label="Workout Post Date"
                value={date}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="famName"
                name="famName"
                label="Family name"
                value={famName}
                disabled
              />
            </Grid>
          </>
        : null
        }
        <Grid item xs={12}>
            <TextField
              fullWidth
              id="woName"
              name="woName"
              label="Workout Name (optional)"
              onChange={handleChange}
              value={fields.woName}
              InputProps={{
                inputProps: {
                  style: {fontSize: 20, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
                }
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            multiline
            minRows={2}
            id="woDescription"
            name="woDescription"
            label="Workout Description"
            onChange={handleChange}
            value={fields.woDescription}
            InputProps={{
              inputProps: {
                style: {fontSize: 20, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
              }
            }}
          />
        </Grid>
      </Grid>
    
      <Grid container mt={2} spacing={2} justifyContent="center">
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </Grid>
        {formType === "edit" ?
          <>
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={RouterLink}
                to={`/?date=${date}`}
                type="button"
                size="large"
              >
                Cancel
              </Button>
            </Grid>
          </>
          : null
        }
      </Grid>

      {errors.length ?
        <Alert messages={errors} />
        : null
      } 
    </Box>
  )
}

export default CustomPostingForm;