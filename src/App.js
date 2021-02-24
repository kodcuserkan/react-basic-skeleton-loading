import { useState, useEffect } from "react";
import Post from "./components/post";
import MySkeleton from "./components/skeleton";
import Skeleton from "react-loading-skeleton";
function App() {
  const [posts, setposts] = useState([]);
  const [author, setauthor] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      const getPosts = async () => {
        const dataPosts = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1/comments"
        );
        const resPosts = await dataPosts.json();
        setposts(resPosts.slice(0, 10));
      };
      const getAuthor = async () => {
        const dataAuthor = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const resAuthor = await dataAuthor.json();
        setauthor(resAuthor[1]);
      };
      getPosts();
      getAuthor();
    }, 5000);
  }, []);

  // console.log(posts, author);

  return (
    <div className="App">
      <header>
        <h1>Skeleton Sample</h1>
      </header>
      <div className="content">
        <div className="left">
          {posts.length < 1 ? (
            <MySkeleton count={5} />
          ) : (
            posts.map((p, i) => <Post key={i} post={p} />)
          )}
        </div>
        <div className="right">
          <div className="single-post">
            {author?.title ? (
              <h2>{"Title: " + author.title} </h2>
            ) : (
              <Skeleton style={{height: '30px', marginBottom: '50px'}} />
            )}
            {author?.body ? (
              "Body: " + author.body.slice(0,70)
            ) : (
              <Skeleton count={2} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
