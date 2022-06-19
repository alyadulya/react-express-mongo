const Test = (data) => {
    return (
        <div>
            {data.map((d, i) => <div>{d.name}</div>)}
        </div>
    );
}

export default Test;