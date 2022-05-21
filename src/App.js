import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// styles
import './App.css';
import Navbar from './components/navbar/Navbar';
import OnlineUsers from './components/onlineusers/OnlineUsers';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';

// pages
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import MyTimeline from './pages/mytimeline/MyTimeline';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Switch>
              <Route exact path='/'>
                {!user && <Redirect to='/login' />}
                {user && <Dashboard />}
              </Route>
              <Route path='/create'>
                {!user && <Redirect to='/login' />}
                {user && <Create />}
              </Route>
              <Route path='/mytimeline'>
                {!user && <Redirect to='/mytimeline' />}
                {user && <MyTimeline />}
              </Route>
              <Route path='/projects/:id'>
                {!user && <Redirect to='/login' />}
                {user && <Project />}
              </Route>
              <Route path='/login'>
                {user && <Redirect to='/' />}
                {!user && <Login />}
              </Route>
              <Route path='/signup'>
                {user && user.displayName && <Redirect to='/' />}
                {!user && <Signup />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
