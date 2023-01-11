const roundNr = (x, d) => {
  return x ? parseFloat(x.toFixed(d)) : x;
}

export default roundNr;