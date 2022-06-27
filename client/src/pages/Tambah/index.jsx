import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import './index.scss';

const Tambah = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/v1/product', {
      name: name,
      price: parseInt(price),
      stock: parseInt(stock),
      status: status
    })
    .then(res => console.log(res.data));
    history.push("/");
}

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={ addProduct }>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={ (e) => setPrice(e.target.value) }
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
            onChange={ (e) => setStock(e.target.value) }
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            checked={status}
            onChange={ (e) => setStatus(e.target.checked) }
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
          <Link to="/" className="btn btn-danger">Batal</Link>
        </form>
      </div>
    </div>
  )
}

export default Tambah;