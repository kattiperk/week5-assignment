import './App.css';
import CharacterList from './components/CharacterList';
import Character from './components/Character';
import Gif from './components/Gif';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Router>
        <Nav />

        <Switch>
          <Route exact path="/" component={CharacterList} />
          <Route path="/gif" component={Gif} />
          <Route exact path="/:id" component={Character} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
