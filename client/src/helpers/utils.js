const thousandSeparator = (x) => {
    console.log(x, typeof x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

module.exports = {
    thousandSeparator
};