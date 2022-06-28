import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }

    return (
        <div style={style}>
            <ThreeCircles color="#ee5253" height={80} width={80} />
        </div>
    )
}

export default Loader;