import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Post from "./components/post";
import MySkeleton from "./components/skeleton";
import Skeleton from "react-loading-skeleton";
function App() {
  const [posts, setposts] = useState([]);
  const [author, setauthor] = useState([]);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  console.log("isUserAuthenticated", isUserAuthenticated);

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
  const CreatedSkeleton = () => {
    return (
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
              <Skeleton style={{ height: "30px", marginBottom: "50px" }} />
            )}
            {author?.body ? (
              "Body: " + author.body.slice(0, 70)
            ) : (
              <Skeleton count={2} />
            )}
          </div>
        </div>
      </div>
    );
  };

  const Home = () => {
    return (
      <div className="home">
        <h1>Home</h1>
      </div>
    );
  };

  const SignIn = () => {
    return (
      <div className="sign-in">
        <h1>Sign In</h1>
        <input type="text" placeholder="Your email" /> <hr />
        <input type="password" placeholder="Your password" /> <hr />
        <button onClick={() => setIsUserAuthenticated((prev) => !prev)}>
          Sign in
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <header>
          <h1>Skeleton Sample</h1>
          <ul className="nav">
            <li>
              <Link to="/">"/"</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/skeleton">Skeleton</Link>
            </li>
            <li>
              <Link to="/sign-in">Sign in</Link>
            </li>
          </ul>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return isUserAuthenticated ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/sign-in" />
              );
            }}
          />
          <Route exact path="/home" component={Home} />
          <Route exact path="/skeleton" component={CreatedSkeleton} />
          <Route exact path="/sign-in" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
