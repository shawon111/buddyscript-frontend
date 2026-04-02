import React from 'react';
import WriteComment from './WriteComment';
import Comment from './Comment';

const CommentPanel = () => {
    return (
        <>
            <div className="_feed_inner_timeline_cooment_area">
                <WriteComment />
            </div>

            <div className="_timline_comment_main">
                <div className="_previous_comment">
                    <button type="button" className="_previous_comment_txt">
                        View 4 previous comments
                    </button>
                </div>
                <Comment />
            </div>
        </>
    );
};

export default CommentPanel;