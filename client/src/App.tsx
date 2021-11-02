import { Router, Route, Switch } from 'react-router-dom';
import history from './helpers/history';
import HomePage from './pages/Home';
import ShipmentPage from './pages/Shipment';

function App() {
  return (
    <div className='container mt-5'>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/shipments/:shipmentId' exact component={ShipmentPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
