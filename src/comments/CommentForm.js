import React, {useState, useEffect, useRef} from 'react';
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

/** Form for creatng or editing comment
 *
 * CommentList -> {CommentCardList -> CommentCard, CommentForm}
 */
const CommentForm = ({formType, handleComment, initialComment="", toggleEditing}) => {
  const [content, setContent] = useState(initialComment);
  const [showSubmit, setShowSubmit] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const contentRef = useRef(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //with help from stackoverflow https://stackoverflow.com/questions/66261433/add-emojis-to-input
  const onEmojiClick = (event, emojiObject) => {
    const cursor = contentRef.current.selectionStart;
    const newContent = content.slice(0, cursor) + emojiObject.emoji + content.slice(cursor);
    setContent(newContent);
    const newCursor = cursor + emojiObject.emoji.length;
    setTimeout(() => contentRef.current.setSelectionRange(newCursor, newCursor), 10);
  };

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

  const handleCancel = () => {
    if (formType === "edit") toggleEditing();
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
              inputRef={contentRef}
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
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Typography variant="body" color="text.secondary" align="center" sx={{ display:"block", width: "100%"}}>
                Choose comment emoji
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon color="text.secondary" />
              </ExpandMore>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Grid item xs={12}>
                <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default CommentForm;