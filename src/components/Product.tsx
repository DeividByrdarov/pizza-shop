import React from "react"
import { connect } from "react-redux"
import { Card, CardContent, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { red, green } from "@material-ui/core/colors"

import { Product as ProductType } from "types/Product"
import * as CartActions from "redux/actions/Cart"

const mapDispatchToProps = {
  addToCart: CartActions.addToCart,
}

interface Props {
  product: ProductType
  addToCart: (product: ProductType) => void
}

const useStyles = makeStyles({
  card: {},
})

const Product: React.SFC<Props> = ({ product, addToCart }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className="mb-3" variant="h4">
          {product.name.toUpperCase()}
        </Typography>
        <Typography className="mb-1" variant="subtitle1">
          Price: {product.price} Quantity: {product.quantity} Status:{" "}
          <FontAwesomeIcon
            size="lg"
            color={product.status ? green[600] : red[600]}
            icon={product.status ? faCheckCircle : faTimesCircle}
          />
        </Typography>
        {product.status && (
          <Button variant="outlined" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Product)
