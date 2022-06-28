import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './index.scss';
import MainDetail from './MainDetail';

const Detail = ({ data }) => {
  const { id } = useParams();

  const [detail, setDetail] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios(`http://localhost:3000/api/v1/product/${id}`);
      setDetail(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    getDetail()
  }, [id])

  return (
      <MainDetail isLoading={isLoading} detail={detail} data={data} id={id} />
  )
}

export default Detail;