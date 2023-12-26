import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { AiFillLike, AiOutlineComment, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { AuthContext } from '../AuthContext/AuthProvider';
import Comment from './Comment';

const Post = ({ post, handleShow, setEditPost, setReload, reload }) => {
    const { user } = useContext(AuthContext)
    const [commentRealod, setCommentRealod] = useState(false);
    const [comments, setComments] = useState([]);
    const { _id, postData, postedTime, userName } = post;
    const timePosted = new Date(postedTime).toLocaleString("en-GB")
    const handleDelete = (id) => {
        if (window.confirm()) {
            fetch(`https://atg-globe-server.vercel.app/delete-post/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    setReload(!reload)
                    toast.success("Post deleted successfully")
                })
                .catch(err => console.log(err.message))
        }
    }
    const handleUpdatePost = () => {
        setEditPost(post)
        handleShow()
    }
    const handleComment = (e) => {
        e.preventDefault()
        if (!user) {
            return toast.error("please login first to comment")
        }
        if (!e.target.comment.value) {
            return toast.error("Please write something")
        }
        const email = user?.email;
        const name = user?.displayName
        const postId = post?._id;
        const comment = e.target.comment.value;
        const commentTime = new Date().getTime()
        const commentData = { email, postId, comment, commentTime, name }
        console.log(commentData)
        fetch('https://atg-globe-server.vercel.app/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(data => {
                e.target.reset()
                setCommentRealod(!commentRealod)
                toast.success("Comment shared successfully")
            })
            .catch(err => console.log(err.message))

    }
    useEffect(() => {
        fetch(`https://atg-globe-server.vercel.app/comments?id=${_id}`)
            .then(res => res.json())
            .then(data => {
                return setComments(data)
            })
            .catch(err => console.log(err.message))
    }, [commentRealod])

    const hanldeLike = () => {
        const userEmail = user?.email;
        const likedMail = { userEmail }


        fetch(`https://atg-globe-server.vercel.app/like?id=${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(likedMail)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.exist) {
                    setReload(!reload)

                } else {
                    setReload(!reload)


                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='single-post border px-3 py-4 border-1 my-2 rounded'>
            <div cl className="fw-bolder position-relative">
                <span className="position-absolute" style={{ right: '-10px', top: '-20px' }}>

                    {user && user?.email === post?.userMail && <div className="d-flex">
                        <div><AiOutlineEdit onClick={handleUpdatePost} style={{ cursor: 'pointer' }} className="fs-4 text-success userhandleicon"></AiOutlineEdit></div>
                        <div>
                            <MdOutlineDelete style={{ cursor: 'pointer' }} onClick={() => handleDelete(_id)} className="fs-4 ms-2 text-danger userhandleicon"></MdOutlineDelete>
                        </div>

                    </div>}

                </span>
                <p className="fw-bolder">
                    {postData}
                </p>

                <div className="d-flex text-muted">
                    <div>
                        Posted By: {userName}
                    </div>
                    <div className="ms-3">
                        Posted On: {timePosted}
                    </div>
                </div>

                <div className="d-flex fs-4 gap-3 mt-2">
                    <div>
                        {user && <p className='mb-0 fw-light fs-6'>
                            {(post?.like.length)} liked this
                        </p>}
                        {!post?.like.includes(user?.email) ? <>
                            <AiOutlineLike style={{ cursor: 'pointer' }} className='text-success' onClick={hanldeLike}></AiOutlineLike>
                        </> : ''}
                        {post?.like.includes(user?.email) ? <AiFillLike style={{ cursor: 'pointer' }} className='text-success'></AiFillLike> : ''}

                    </div>

                </div>
                <p className="fs-4">
                    <span className="text-success fw-bold">
                        All comments ({comments?.length})
                    </span>
                </p>
                {comments && <>
                    <div className="ms-4 mt-3 fw-light">

                        {comments?.map(sinleComment => <Comment key={sinleComment?._id} sinleComment={sinleComment}></Comment>)}
                    </div>
                </>}
                <><div className='mt-3'>
                    Write a Comment
                </div>
                    <form onSubmit={handleComment}>
                        <div className="mt-2">
                            <textarea name='comment' className="form-control" placeholder="Write your comment..." id="floatingTextarea"></textarea>
                            <button type="submit" className="btn mt-3 py-2 px-4 rounded-5 fw-bold btn-success">Comment</button>
                        </div>
                    </form></>

            </div>
        </div>
    );
};

export default Post;