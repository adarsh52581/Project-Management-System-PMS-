const BlogList = ({blogs,title,bclick}) => {
    function refreshPage() {
        window.location.reload(false);
      }
    return (
        <div className="blog-list">
         <h2>{title}</h2>
        {blogs.map((blog)=>(<div className='blog-preview' key={blog.id}>
        <h2>{blog.taskname}</h2>
        <button onClick={()=>refreshPage()} style={{color:'white',backgroundColor:'#f1356D',borderRadius:'8px'}}>{bclick}</button>
     </div>))}
     </div>
      );
}
 
export default BlogList;