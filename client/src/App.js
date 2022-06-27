import axios from 'axios';
import { useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';
import Tambah from './pages/Tambah';

const App = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
      await axios.get('http://localhost:3000/api/v1/product')
        .then(res => setData(res.data))
        .catch((e) => console.log(e));
    }
    
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/detail/:id" children={() => <Detail data={data} />} />
          <Route path="/edit/:id" children={() => <Edit data={data} />} />
          <Route path="/tambah" children={() => <Tambah />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;