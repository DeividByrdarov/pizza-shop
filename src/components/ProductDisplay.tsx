import React, { useEffect } from "react"
import { connect } from "react-redux"

import * as ProductActions from "redux/actions/Products"
import { AppState } from "redux/reducers"
import { getProductsReducer } from "redux/selectors"

const mapStateToProps = (state: AppState) => ({
  products: getProductsReducer(state).products,
})

const mapDispatchToProps = {
  getProducts: ProductActions.getProducts,
}

type Props = ReturnType<typeof mapStateToProps> & {
  getProducts: () => Promise<void>
}

const ProductDisplay: React.SFC<Props> = ({ getProducts }) => {
  useEffect(() => {
    getProducts()
  }, [getProducts])
  return <div>ProductDisplay</div>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDisplay)
