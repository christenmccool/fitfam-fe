import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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

/** Shows information about a posting 
 * - Posting date
 * - Workout name and description
 * 
 * Used by PostingDetail and ResultDetail
 * 
 * PostingDetail -> PostingHeader -> ResultCardList -> ResultCard
 * ResultDetail -> PostingHeader -> ResultInfo -> {CommentCardList -> CommentCard, CommentForm} 
 *
 * Routed at /postings/:id
 */
const PostingHeader = ({ postDate, woName, woDescription }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Typography variant="h6" color="text.secondary" mb={1}>
        {postDate}
      </Typography>
      <Typography variant="h3" color="secondary" >
        {woName}
      </Typography>
      <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
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
        <Typography variant="h6" mb={3} style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>
          {woDescription}
        </Typography>
      </Collapse>
    </Box>
  )
}

export default PostingHeader;
