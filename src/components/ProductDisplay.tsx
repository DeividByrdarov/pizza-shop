import React, { useEffect } from "react"
import { connect } from "react-redux"

import Product from "components/Product"
import * as ProductActions from "redux/actions/Products"
import { AppState } from "redux/reducers"
import { getProductsReducer } from "redux/selectors"
import { Product as ProductType } from "types/Product"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"

const mapStateToProps = (state: AppState) => ({
  products: getProductsReducer(state).products,
})

const mapDispatchToProps = {
  getProducts: ProductActions.getProducts,
}

type Props = ReturnType<typeof mapStateToProps> & {
  getProducts: () => Promise<void>
}

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: 20,
  },
})

const ProductDisplay: React.SFC<Props> = ({ getProducts, products }) => {
  const classes = useStyles()

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <>
      <Typography className="mb-5" variant="h3">
        Products
      </Typography>
      <div className={classes.grid}>
        {products.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDisplay)
