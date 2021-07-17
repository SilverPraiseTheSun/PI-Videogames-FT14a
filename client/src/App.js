import './App.css';
import Error from './views/Error.jsx'
import Home from './views/Home.jsx'
import Detail from './views/Detail.jsx'
import Create from './views/Create';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home/:search?" component={Home}/>
        <Route path="/videogame/game=:id" component={Detail}/>
        <Route path="/videogame/add/" component={Create}/>
        <Route component={Error}/>
      </Switch>
    </div>
  );
}
export default App;
