import React from "react"
import { connect } from "react-redux"
import { Typography } from "@material-ui/core"

import ProductDisplay from "components/ProductDisplay"
import { AppState } from "redux/reducers"
import { getAuthReducer } from "redux/selectors"

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: getAuthReducer(state).isLoggedIn,
})

type Props = ReturnType<typeof mapStateToProps> & {}

const Home: React.SFC<Props> = ({ isLoggedIn }) => {
  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn ? (
        <ProductDisplay />
      ) : (
        <Typography variant="h5">
          Login to see products and create orders
        </Typography>
      )}
    </div>
  )
}

export default connect(mapStateToProps)(Home)
