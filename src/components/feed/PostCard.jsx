import React from 'react';
import PostHeader from './post/PostHeader';
import PostReactionPanel from './post/PostReactionPanel';
import CommentPanel from './post/CommentPanel';

const PostCard = () => {
    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <PostHeader />
                <h4 className="_feed_inner_timeline_post_title">
                    -Healthy Tracking App
                </h4>
                <div className="_feed_inner_timeline_image">
                    <img
                        src="/images/timeline_img.png"
                        alt=""
                        className="_time_img"
                    />
                </div>
            </div>
            <PostReactionPanel />
            <CommentPanel />
        </div>
    );
};

export default PostCard;