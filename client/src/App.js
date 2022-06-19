import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';
import Test from './pages/Test';

const App = () => {
  const [data, setData] = useState([]);
    
  useEffect(() => {
    const getData = () => {
      fetch('http://localhost:3000/api/v1/product')
        .then(result => result.json())
        .then(result => setData(result));
    }
    getData()
  })

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home data={data} />} />
          <Route path="/detail/:id" children={() => <Detail data={data} />} />
          <Route path="/edit/:id" children={() => <Edit data={data} />} />
          <Route path="/tambah" children={() => <Tambah data={data} />} />
          <Route path="/test" children={() => <Test data={data} />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;