import React, {useState, useEffect} from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FitFamApi from '../api/api';
import PostingEditBar from '../postings/PostingEditBar';
import ResultDashboard from '../results/ResultDashboard';

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


/** Summary information about a posting
 * Includes ResultDashboard 
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 * Card links to PostingDetail
 */
const PostingCard = ({ id, familyId, woName, woDescription, maxHeight, postBy, isUserWo, startExpanded=true }) => {
  const [expanded, setExpanded] = useState(startExpanded);
  const [postByName, setPostByName] = useState();
  const [loaded, setLoaded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    async function getUserName() {
      try {
        const family = await FitFamApi.getFamily(familyId);
        const user = family.users.find(ele => ele.userId === postBy);
        if (user) {
          setPostByName(`${user.firstName} ${user.lastName}`);
        }
        setLoaded(true);
      } catch(err) {
        console.log(err)
      }
    }
    setLoaded(false);
    getUserName();
  }, [])

  if (!loaded) return <div>Loading</div>

  return (
    <Card 
      variant="outlined" 
      align="center" 
      sx={{maxHeight, p:1, borderRadius: '6px'}}
    >
      <CardContent sx={{ "&:last-child": {paddingBottom: 0}}}>
        {isUserWo ?
          <PostingEditBar
            postId={id}
          />
          : null
        }
        <CardActionArea 
          component={RouterLink} 
          to={`/postings/${id}`}
        >
          {woName ?
            <Typography 
              variant="h4" 
              color="secondary" 
            >
              {woName}
            </Typography>
            :
            <Typography 
              variant={woName ? "h6" : "h4"} 
              sx={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
            >
              {woDescription}
            </Typography>
          }
          {postByName ? 
            <Typography 
              variant="h6"
              color="text.secondary"
              sx={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
            >
              {postByName}
            </Typography>
            : null
          }
        </CardActionArea>

        <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: 0}}>
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
          <Box p={2}>
            {woName ?
              <CardActionArea
                component={RouterLink} 
                to={`/postings/${id}`}
              >
                <Typography 
                  variant={woName ? "h6" : "h4"} 
                  mb={3} 
                  sx={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
                >
                  {woDescription}
                </Typography>
              </CardActionArea>
              :
              null
            }
            <Box mt={2}>
              <ResultDashboard 
                postId={id}
              />
            </Box>
          </Box>
        </Collapse>

      </CardContent>
    </Card>
  )
}

export default PostingCard;
