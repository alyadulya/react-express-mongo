import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Input from "../../components/Input";
import Loader from "../Loader";

const MainEdit = ({ isLoading, name, price, stock, status, id, setName, setPrice, setStock, setStatus }) => {
    const history = useHistory();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/api/v1/product/${id}`, {
            name: name,
            price: price,
            stock: stock,
            status: status
        })
        history.push("/");
        swal({
            title: "Data berhasil diubah!",
            icon: "success"
        });
    }

    return isLoading ? (
        <Loader />
    ) : (
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

export default MainEdit;