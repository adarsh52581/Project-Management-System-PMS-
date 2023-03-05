import { useState } from "react";
import BlogList from "./BlogList";
import { useEffect } from "react";
import './index.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Home = () => {
    const [blogs,setBlogs]=useState(null);
    const [ctasks,setCtasks]=useState(null);
    const [itasks,setItasks]=useState(null);
    const [wtasks,setWtasks]=useState(null);
    const [prog,setProg]=useState(null);

    useEffect(() => {
          fetch('http://localhost:3000/task')
            .then(res => {
              return res.json();
            })
            .then(data => {
              setBlogs(data);
            })
        fetch('http://localhost:3000/completed')
          .then(res => {
            return res.json();
          })
          .then(data => {
            setCtasks(data);
          })

          fetch('http://localhost:3000/incomplete')
            .then(res => {
              return res.json();
            })
            .then(data => {
              setItasks(data);
            })
            
            fetch('http://localhost:3000/inprogress')
              .then(res => {
                return res.json();
              })
              .then(data => {
                setWtasks(data);
              })
            
            fetch('http://localhost:3000/progress')
              .then(res => {
                return res.json();
              })
              .then(data => {
                setProg(data);
              })
            
      }, [])
     
    return (
        <div className='homedev'>
             {/* {blogs && <BlogList blogs={blogs} title='All tasks'/>} */}
             <div className="d1">{blogs && <BlogList blogs={itasks} title='Incomplete Tasks' bclick='Start'/>}</div>
             <div className="d1">{blogs && <BlogList blogs={wtasks} title=' Tasks in progresss' bclick='Done' /> } </div>  
             <div className="d1">{blogs && <BlogList blogs={ctasks} title='Completed Tasks' bclick='ok' />}</div>
             <div className="d2"><CircularProgressbar value={prog} text={`${prog}%`} />;</div>
        </div>
      );
}
 
export default Home;