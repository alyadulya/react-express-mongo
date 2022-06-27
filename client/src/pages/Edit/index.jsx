import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = ({ data }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      setName(res.data.name);
      setPrice(parseInt(res.data.price));
      setStock(parseInt(res.data.stock));
      setStatus(JSON.parse(res.data.status));
      console.log([res.data.name, res.data.price, res.data.stock, res.data.status])
    }
    getDetail()
  }, [id])

  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/v1/product/${id}`, {
      name: name,
      price: price,
      stock: stock,
      status: status
    })
    history.push("/");
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={ updateProduct }>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            name="Stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <Input
            name="status"
            id="status"
            type="checkbox"
            label="Active"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
          <Link to="/" className="btn btn-danger">Batal</Link>
        </form>
      </div>
    </div>
  )
}

export default Edit;