import { Link } from "react-router-dom";
import { thousandSeparator } from "../../helpers/utils";
import Loader from "../Loader";

const MainDetail = ({ isLoading, detail, data, id }) => {
    return isLoading ? (
        <Loader />
    ) : (
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

export default MainDetail;