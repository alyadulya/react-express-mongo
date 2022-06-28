import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainEdit from "./MainEdit";

const Edit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getDetail = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      setName(res.data.name);
      setPrice(parseInt(res.data.price));
      setStock(parseInt(res.data.stock));
      setStatus(JSON.parse(res.data.status));
      setTimeout(() => {
        setLoading(false);
      }, 500);
      console.log([res.data.name, res.data.price, res.data.stock, res.data.status])
    }
    getDetail()
  }, [id])

  return (
    <MainEdit isLoading={isLoading} name={name} price={price} stock={stock} status={status} id={id} setName={setName} setPrice={setPrice} setStock={setStock} setStatus={setStatus} />
  )
}

export default Edit;