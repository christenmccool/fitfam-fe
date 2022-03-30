import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Picker from 'emoji-picker-react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

//From MUI docs
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/** Form for entering new results and deleting/editing results
 *
 * Fields for score and notes
 * Score field(s) depend on scoreType
 * Calls submitResult from ResultFormPage parent on submit
 * 
 * ResultFormPage -> {PostingHeader, ResultForm}
 */
const ResultForm = ({formType, submitResult, deleteResult, postId, initScore, initNotes}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [score, setScore] = useState(initScore || "");
  const [notes, setNotes] = useState(initNotes || "");
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setScore(score + emojiObject.emoji);
  };

  const handleScoreChange = (event) => {
    const {value} = event.target;
    setScore(value);
  };

  const handleNotesChange = (event) => {
    const {value} = event.target;
    setNotes(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (notes) {
      submitResult(score, notes);
    } else {
      submitResult(score);
    }
  };

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} mt={1} >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="score"
              name="score"
              label="Score"
              autoFocus
              onChange={handleScoreChange}
              value={score}
              InputProps={{
                inputProps: {
                  style: {fontSize: 35, textAlign: 'center'}
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Typography variant="body" color="secondary" align="center" sx={{ display:"block", width: "100%"}}>
                Score emoji picker
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Grid item xs={12}>
                <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
              </Grid>
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              id="notes"
              name="notes"
              label="Notes"
              onChange={handleNotesChange}
              value={notes}
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
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={deleteResult}
              >
                Delete
              </Button>
            </Grid>
            : null
          }
          <Grid item>
            <Button
              component={RouterLink}
              to={`/postings/${postId}`}
              type="button"
              size="large"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ResultForm;