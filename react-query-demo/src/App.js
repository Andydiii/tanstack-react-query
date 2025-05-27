import './App.css';
import PostsTraditional from './components/PostTraditional';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsRQ from './components/PostsRQ';
import Home from './components/Home';
import {PostDetailsRQ} from './components/PostDetailsRQ'
import PaginatedQueries from './components/PaginatedQueries';
import { InfiniteFruits } from './components/InfiniteFruits';
import { InfiniteFruitsScroll2 } from './components/InfiniteFruitsScroll2';
import PostsRQMutation1 from './components/PostsRQMutation1';
function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        {/* this tells us what url coressponds to what component */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostsTraditional />} />
          <Route exact path='/rq-posts' element={<PostsRQ />} />
          {/* :postId means postId is a parameter, /rq-posts/1 -> postId = 1 */}
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ/>}></Route>
          <Route exact path='/paginated-fruits' element={<PaginatedQueries />}></Route>
          <Route exact path='/infinite-fruits-scroll1' element={<InfiniteFruits />}></Route>
          <Route exact path='/infinite-fruits-scroll2' element={<InfiniteFruitsScroll2 />}></Route>
          <Route exact path='/rq-posts-mutation1' element={<PostsRQMutation1 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;