import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from './DataTable';
import './index.scss';

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    const res = await axios(`http://localhost:3000/api/v1/product?name=${query}`);
    setData(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
    
  useEffect(() => {
    getData()
  }, [query])
  
  const searchHandler = (e) => {
    var query = e.target.value.toLowerCase();
    console.log(query);
    setLoading(true);
    setQuery(query);
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" onChange={searchHandler} placeholder="Masukan kata kunci..."/>
      </div>
      <DataTable isLoading={isLoading} data={data} getData={getData} setLoading={setLoading} />
    </div>
  )
}

export default Home;