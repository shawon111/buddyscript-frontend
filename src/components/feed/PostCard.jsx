import React from 'react';
import PostHeader from './post/PostHeader';
import PostReactionPanel from './post/PostReactionPanel';
import CommentPanel from './post/CommentPanel';
import Image from 'next/image';
import { BaseUrl } from '@/utils/BaseUrl';
import { serverFetch } from '@/utils/serverFetch';

const PostCard = async({post}) => {
    const {text, image} = post; 
    const comments = await serverFetch(`${BaseUrl}/comments?postId=${post?._id}`, {
        method: "GET",
    });
    console.log("Comments for post", post?._id, ":", comments);
    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                <PostHeader author={post?.author} isPrivate={post?.isPrivate} createdAt={post?.createdAt} />
                <h4 className="_feed_inner_timeline_post_title">
                    {text}
                </h4>
                <div className="_feed_inner_timeline_image">
                    {
                        image ? <Image
                        src={image}
                        alt="Post Image"
                        width={588}
                        height={387}
                        className="_time_img"
                    /> : ""
                    }
                </div>
            </div>
            <PostReactionPanel likes={post?.likes} commentsCount={comments?.data?.length || 0} />
            <CommentPanel comments={comments?.data} />
        </div>
    );
};

export default PostCard;