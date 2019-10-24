// import React, { useEffect, useState } from "react";
// import "../App.css";
// const axios = require("axios");

// const BlogPost = ({ id, blog, editMode, date }) => {
//   const [blogBody, setBlogBody] = useState("");
//   const [editModeState, setEditModeState] = useState(false);

//   useEffect(() => {
//     getBlogPostBody();
//   }, [blogBody]);

//   // Get a blog post
//   // const getBlogPost = () => {
//   //   console.log("Getting single blog post");
//   //   axios
//   //     .get("http://localhost:8000/api/blogPosts")
//   //     .then(res => {
//   //       setBlogPost(res.data);
//   //     })
//   //     .catch(err => {
//   //       console.log("Error from blogPosts:SS " + err);
//   //     });
//   // };

//   const getBlogPostBody = () => {
//     setBlogBody(blog);
//     setEditModeState(editMode);
//   };

//   const onDeleteClick = id => {
//     console.log("delete clicked, ID: " + id);
//     axios
//       .delete("http://localhost:8000/api/blogHome/" + id)
//       .then(res => {
//         getBlogPostBody();
//       })
//       .catch(err => {
//         console.log("Error deleting blog post: " + err);
//       });
//   };

//   const onEditClick = id => {
//     console.log("Edit clicked, ID: " + id);

//     // const data = blogPosts.map(blogPost => {
//     //   if (blogPost._id === id) {
//     //     blogPost.editMode = true;
//     //     setCurrentBlogPostBody(blogPost.body);
//     //   }
//     //   return blogPost;
//     // });

//     setEditModeState(true);
//   };

//   const onCancelClick = id => {
//     console.log("Cancel clicked, ID: " + id);

//     // const data = blogPosts.map(blogPost => {
//     //   if (blogPost._id === id) {
//     //     blogPost.editMode = false;
//     //   }
//     //   return blogPost;
//     // });

//     // setBlogPost(data);
//   };

//   const onSaveEditClick = (id, blog, dateEdited) => {
//     console.log("Save edit clicked, ID: " + id);

//     // const data = { editMode: false, body: blog, dateEdited: dateEdited };

//     // axios
//     //   .put("http://localhost:8000/api/blogPosts/" + id, data)
//     //   .then(res => {
//     //     getBlogPost();
//     //   })
//     //   .catch(err => {
//     //     console.log("Error updating blog post: " + err);
//     //   });
//   };

//   const handleCurrentTextEdit = event => {
//     setBlogBody(event.target.value);
//   };

//   if (!editMode) {
//     return (
//       <div className="card-container">
//         <p>{blog}</p>
//         <div className="blog-post-options">
//           <div>
//             <button
//               className="btn btn-delete"
//               onClick={() => onDeleteClick(id)}
//             >
//               Delete
//             </button>
//             <button className="btn btn-edit" onClick={() => onEditClick(id)}>
//               Edit
//             </button>
//           </div>
//           <div id="post-date">
//             <span>{"Posted: " + new Date(date).toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="card-container">
//         <textarea
//           name="body"
//           cols="50"
//           rows="1"
//           value={blogBody}
//           onChange={handleCurrentTextEdit}
//         />
//         <div>
//           <button
//             className="btn btn-delete"
//             onClick={() => onSaveEditClick(id, blogBody, date)}
//           >
//             Save
//           </button>
//           <button className="btn btn-edit" onClick={() => onCancelClick(id)}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }
// };

// export default BlogPost;
