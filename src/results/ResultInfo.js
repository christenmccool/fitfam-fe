import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


/** Displays result information
 * Used by ResultCard and ResultDetail
 *
 * PostingDetail -> ResultCardList -> ResultCard -> {ResultInfo, CommentDashboard}
 * ResultDetail -> ResultInfo -> {CommentCardList -> CommentCard, CommentForm} 
 */
const ResultInfo = ({ userFirst, score, notes, size="normal" }) => {

  let fontSizing = size === "normal" ? "h5" : "h4";

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography 
          variant={fontSizing} 
          color="text.primary" 
        >       
          {userFirst}
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography 
        variant="h2"
        color="primary" 
      >
        {score}
      </Typography>
      </Grid>
      {notes ?
        <Grid item xs={12}>
          <Typography 
            variant={fontSizing} 
            color="text.secondary" 
            textAlign="center"
            style={{whiteSpace: "pre-line"}}
          >
            {notes}
          </Typography>
        </Grid>
        : null
      }
    </Grid>
  )
}

export default ResultInfo;