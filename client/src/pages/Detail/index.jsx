import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { thousandSeparator } from '../../helpers/utils';
import './index.scss';

const Detail = ({ data }) => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      await axios.get(`http://localhost:3000/api/v1/product/${id}`)
        .then(res => setDetail(res.data))
        .catch((e) => console.log(e));
    }
    getDetail()
  }, [id])

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {data.map(d => d._id).indexOf(id) + 1}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {detail.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {detail.length < 1 ? 0 : thousandSeparator(detail.price)}</td>
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