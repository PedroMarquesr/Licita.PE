const priceTotalCalculator = function (quantidade, price) {
  const totalPrice = quantidade * price
  return totalPrice.toFixed(4)
}

module.exports = priceTotalCalculator
