import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from '../redux/postsSlice';
function Posts() {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');

   const [updatedTitle, setUpdateTitle] = useState('');
   const [updateDescription, setUpdateDescription] = useState('');

   const [isEdit, setIsEdit] = useState(false);
   const [id, setId] = useState(null);

   const posts = useSelector((state) => state.posts.items);

   const dispatch = useDispatch();
   return (
      <div>
         <div className="form">
            <input
               type="text"
               value={title}
               placeholder="Enter Post Title"
               onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
               type="text"
               value={description}
               placeholder="Enter Post Desc"
               onChange={(e) => setDescription(e.target.value)}
            ></input>
            <button
               onClick={() => {
                  dispatch(addPost({ id: posts.length + 1, title: title, description: description }));
                  setTitle('');
                  setDescription('');
               }}
            >
               ADD Post
            </button>
         </div>
         <div className="posts">
            {posts.length > 0
               ? posts.map((post, index) => (
                    <div className="post" key={index}>
                       <h2>{post.title}</h2>
                       <p>{post.description}</p>
                       <button
                          onClick={() => {
                             setIsEdit(true);
                             setId(post.id);
                          }}
                       >
                          Edit
                       </button>
                       <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                       <br />
                       {isEdit && id == post.id && (
                          <>
                             <input
                                type="text"
                                placeholder="updated Title"
                                onChange={(e) => setUpdateTitle(e.target.value)}
                             />
                             <input
                                type="text"
                                placeholder="updated Desc"
                                onChange={(e) => setUpdateDescription(e.target.value)}
                             />
                             <button
                                onClick={() => {
                                   dispatch(
                                      updatePost({
                                         id: post.id,
                                         title: updatedTitle,
                                         description: updateDescription,
                                      }),
                                   );
                                   setIsEdit(false);
                                }}
                             >
                                Update
                             </button>
                          </>
                       )}
                    </div>
                 ))
               : 'There is no Posts'}
         </div>
      </div>
   );
}

export default Posts;
