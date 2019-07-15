import React, { useMemo } from "react"
import { connect } from "react-redux"
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core"
import { red } from "@material-ui/core/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import * as CartActions from "redux/actions/Cart"
import * as OrderActions from "redux/actions/Order"
import { AppState } from "redux/reducers"
import { getCartReducer, getAuthReducer } from "redux/selectors"
import { Product } from "types/Product"
import { User } from "types/User"

const mapStateToProps = (state: AppState) => ({
  items: getCartReducer(state).items,
  user: getAuthReducer(state).user,
})

const mapDispatchToProps = {
  removeFromCart: CartActions.removeFromCart,
  createOrder: OrderActions.createOrder,
}

type Props = ReturnType<typeof mapStateToProps> & {
  removeFromCart: (id: number) => void
  createOrder: (order: {
    total: number
    items: Product[]
    user: User
  }) => Promise<void>
}

const Cart: React.SFC<Props> = ({
  items,
  user,
  removeFromCart,
  createOrder,
}) => {
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  )

  return (
    <>
      <Typography className="mb-4" variant="h3">
        Cart
      </Typography>
      {items.length > 0 ? (
        <>
          <Typography variant="subtitle1">
            Total: {Number(total).toFixed(2)} $
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>@</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{Number(item.price).toFixed(2)} $</TableCell>
                  <TableCell>
                    {Number(item.price * item.quantity).toFixed(2)} $
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      style={{ backgroundColor: red[800] }}
                    >
                      <FontAwesomeIcon color="white" icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-3">
            <Button
              color="primary"
              className="ml-auto"
              variant="contained"
              onClick={() => {
                if (user) {
                  createOrder({ total, items, user })
                }
              }}
            >
              Submit order
            </Button>
          </div>
        </>
      ) : (
        <Typography variant="h5">No items in the cart</Typography>
      )}
    </>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
