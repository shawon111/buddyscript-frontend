import React from 'react';
import WriteComment from './WriteComment';
import Comment from './Comment';

const CommentPanel = ({ comments }) => {
    return (
        <>
            <div className="_feed_inner_timeline_cooment_area">
                <WriteComment />
            </div>

            <div className="_timline_comment_main">
                {comments?.length > 0 ? (
                    comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))
                ) : (
                    <p>No comments available.</p>   
                )}
            </div>
        </>
    );
};

export default CommentPanel;