import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


/** Form for creatng or editing comment
 *
 * CommentList -> {CommentCardList -> CommentCard, CommentForm}
 */
const CommentForm = ({handleComment, initialComment="", turnOffEditing}) => {
  const [content, setContent] = useState(initialComment);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    if (content !== "") {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [content])

  const handleChange = (event) => {
    const {value} = event.target;
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content === "") return;
    handleComment(content);
    setContent("");
  };

  const handleCancel = (event) => {
    if (turnOffEditing) turnOffEditing();
    setContent("");
  }

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
        <Grid container justifyContent="space-evenly" alignItems="center" spacing={1}>
          <Grid item xs={12} md={showSubmit ? 9 : 12}>
            <TextField
              fullWidth
              id="content"
              name="content"
              label="Comment"
              multiline
              autoFocus
              onChange={handleChange}
              value={content}
              InputProps={{
                inputProps: {
                  style: {fontSize: '20px', spellcheck:"false"}
                }
              }}
            />
          </Grid>
          {showSubmit ? 
            <Grid item xs={12} md={3}>
              <Grid container spacing={2} sx={{justifyContent: {xs: 'flex-end', md:"space-evenly"}}}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Post
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            :
            null
          }
        </Grid>
      </Box>
    </Box>
  )
}

export default CommentForm;