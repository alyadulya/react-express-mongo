import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { thousandSeparator } from '../../helpers/utils';
import './index.scss';

const Detail = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  
  const getDetail = () => {
    fetch(`http://localhost:3000/api/v1/product/${id}`)
      .then(result => result.json())
      .then(result => setDetail(result));
    // if(detail.length < 1) {
    //   setDetail(res.data);
    // }
    // return
  }

  useEffect(() => {
    
    // const getDetail = () => {
    //   setDetail(data[id-1])
    //   console.log(data)
    // }
    getDetail()
    console.log(detail)
  }, [])

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