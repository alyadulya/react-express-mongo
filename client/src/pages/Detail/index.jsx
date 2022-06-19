import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { thousandSeparator } from '../Home';
import './index.scss';

const Detail = ({ data }) => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    // const getDetail = async () => {
    //   const res = await axios(`http://localhost:3000/api/v1/product`);
    //   setDetail(res.data[id-1]);
    // }
    const getDetail = () => {
      setDetail(data[id-1])
    }
    getDetail()
  })

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {detail.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {thousandSeparator(detail.price)}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {detail.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;