import { Sidebar, Chat } from './components';
import './app.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login/Login';
import { useStateValue } from './StateProvider'

function App() {

    const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
  <div className="appBody">
        <Router>
        <Sidebar/>
          <Switch>

          
           
            
            <Route path="/rooms/:roomId">
            <Chat />
            </Route>

            <Route path="/rooms">
              <Chat />
            </Route>
          </Switch>
          
        </Router>
        
      </div>
      )}
      
    
    </div>
  );
}

export default App;
