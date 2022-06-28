import axios from "axios"
import { Link } from "react-router-dom"
import { thousandSeparator } from "../../helpers/utils"
import Loader from "../Loader/index"
import swal from 'sweetalert';


const DataTable = ({ isLoading, data, getData, setLoading }) => {
    const deleteProduct = (id) => {
        swal({
            title: "Anda yakin akan menghapus data ini?",
            icon: "warning",
            buttons: ["Tidak", "Ya"],
            dangerMode: true
        })
        .then(async (willDelete) => {
            if (willDelete) {
                await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
                getData();
                swal("Data telah dihapus!", {
                    icon: "success",
                });
                setLoading(true);
            } else {
                swal("Batal menghapus data!");
            }
        });
    }

    return isLoading ? (
        <Loader />
    ) : (
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
    )
}

export default DataTable;