import React, {useState, useEffect, useContext} from "react";

import Box from '@mui/material/Box';

import FitFamApi from "../api/api"; 
import UserContext from "../auth/UserContext";
import CommentCardList from "./CommentCardList";
import CommentForm from './CommentForm';

/** Shows list of a comments on a given result 
 * 
 * On mount, loads comments from API
 * 
 * CommentList -> {CommentCardList -> CommentCard, CommentForm}
 */
const CommentList = ({resultId}) => {
  const [comments, setComments] = useState();
  const {user} = useContext(UserContext);

  useEffect(() => {
    async function getComments() {
      try {
        const comments = await FitFamApi.getComments(resultId);
        setComments(comments);
      } catch(err) {
        console.log(err);
      }
    }

    getComments();
  }, []);

  async function createComment (content) {
    const newComment = await FitFamApi.createComment(resultId, user.id, content);
    setComments([...comments, newComment]);
  }

  async function editComment(commentId, content) {
    const editedComment = await FitFamApi.editComment(commentId, content);
    const filteredComments = comments.filter(ele => ele.id !== commentId);
    setComments([...filteredComments, editedComment]);
  }

  async function deleteComment(commentId) {
    const deletedId = await FitFamApi.deleteComment(commentId);
    const remainingComments = comments.filter(ele => ele.id !== +deletedId);
    setComments([...remainingComments]);
  }

  if (!comments) return <div>Loading</div>;

  return (
    <Box mt={4}>
      {comments.length ? 
        <CommentCardList 
          comments={comments}
          editComment={editComment}
          deleteComment={deleteComment}
        />
        :
        null
      }
      <Box mt={3}>
        <CommentForm 
          handleComment={createComment}
        />
      </Box>
    </Box>
  )
}

export default CommentList;