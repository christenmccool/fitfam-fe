import React, {useState, useRef} from 'react';
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
  const [score, setScore] = useState(initScore || "");
  const [notes, setNotes] = useState(initNotes || "");
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const scoreRef = useRef(null);
  const notesRef = useRef(null);

  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  //with help from stackoverflow https://stackoverflow.com/questions/66261433/add-emojis-to-input
  const onScoreEmojiClick = (event, emojiObject) => {
    const cursor = scoreRef.current.selectionStart;
    const newScore = score.slice(0, cursor) + emojiObject.emoji + score.slice(cursor);
    setScore(newScore);
    const newCursor = cursor + emojiObject.emoji.length;
    setTimeout(() => scoreRef.current.setSelectionRange(newCursor, newCursor), 10);
  };

  const onNotesEmojiClick = (event, emojiObject) => {
    const cursor = notesRef.current.selectionStart;
    const newNotes = notes.slice(0, cursor) + emojiObject.emoji + notes.slice(cursor);
    setNotes(newNotes);
    const newCursor = cursor + emojiObject.emoji.length;
    setTimeout(() => notesRef.current.setSelectionRange(newCursor, newCursor), 10);
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
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="score"
              name="score"
              label="Score"
              inputRef={scoreRef}
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
              <Typography variant="body" color="text.secondary" align="center" sx={{ display:"block", width: "100%"}}>
                Choose score emoji
              </Typography>
              <ExpandMore
                expand={expanded1}
                onClick={handleExpandClick1}
                aria-expanded={expanded1}
                aria-label="show more"
              >
                <ExpandMoreIcon color="text.secondary" />
              </ExpandMore>
            </Box>
            <Collapse in={expanded1} timeout="auto" unmountOnExit>
              <Grid item xs={12}>
                <Picker onEmojiClick={onScoreEmojiClick} pickerStyle={{ width: '100%' }} />
              </Grid>
            </Collapse>
          </Grid>

          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              id="notes"
              name="notes"
              label="Notes"
              inputRef={notesRef}
              onChange={handleNotesChange}
              value={notes}
              InputProps={{
                inputProps: {
                  style: {fontSize: 20, textAlign: 'center', spellcheck:"false", lineHeight: "normal"}
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Typography variant="body" color="text.secondary" align="center" sx={{ display:"block", width: "100%"}}>
                Choose notes emoji
              </Typography>
              <ExpandMore
                expand={expanded2}
                onClick={handleExpandClick2}
                aria-expanded={expanded2}
                aria-label="show more"
              >
                <ExpandMoreIcon color="text.secondary" />
              </ExpandMore>
            </Box>
            <Collapse in={expanded2} timeout="auto" unmountOnExit>
              <Grid item xs={12}>
                <Picker onEmojiClick={onNotesEmojiClick} pickerStyle={{ width: '100%' }} />
              </Grid>
            </Collapse>
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