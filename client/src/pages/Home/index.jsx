import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { thousandSeparator } from '../../helpers/utils';
import './index.scss';

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);

  const getData = async () => {
    await axios.get('http://localhost:3000/api/v1/product')
      .then(res => setData(res.data))
      .catch((e) => console.log(e));
  }
    
  useEffect(() => {
    getData()
  }, [])

  const deleteProduct = async (id) => {
    if (window.confirm("Anda yakin akan menghapus data ini?") === true) {
      await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
      getData();
      alert("Data telah dihapus");
    } else {
      alert("Batal menghapus data");
    }
  }
  
  const searchHandler = (e) => {
    var query = e.target.value.toLowerCase();
    console.log(query);
    axios.get('http://localhost:3000/api/v1/product', {params: {query: query}})
      .then(res => res.data.length !== 0
                    ? setSearch([...res.data])
                    : null)
      .catch((e) => {
        console.log(e);
      })
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" onChange={searchHandler} placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((d, i) => 
              <tr key={i}>
                <td>{i+1}</td>
                <td>{d.name}</td>
                <td className="text-right">RP. {thousandSeparator(d.price)}</td>
                <td className="text-center">
                  <Link to={`/detail/${d._id}`} className="btn btn-sm btn-info">Detail</Link>
                  <Link to={`/edit/${d._id}`} className="btn btn-sm btn-warning">Edit</Link>
                  <button onClick={() => deleteProduct(d._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;