import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = ({ data }) => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    // const getDetail = async () => {
    //   const res = await axios(`http://localhost:3000/api/v1/product`);
    //   setDetail(res.data[id-1]);
    // }
    const getDetail = () => {
      setDetail(data[id-1])
      console.log(data[id-1])
    }
    getDetail()
  })

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={`${data.name}`}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={`${data.price}`}/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={`${data.stock}`}/>
          <Input name="status" type="checkbox" label="Active" checked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;