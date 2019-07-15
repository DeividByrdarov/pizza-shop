import React, { useMemo } from "react"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Toolbar, AppBar, Typography, Button, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons"

import { AppState } from "redux/reducers"
import { getAuthReducer, getCartReducer } from "redux/selectors"
import * as AuthActions from "redux/actions/Auth"
import { Product } from "types/Product"

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: getAuthReducer(state).isLoggedIn,
  user: getAuthReducer(state).user,
  items: getCartReducer(state).items,
})

const mapDispatchToProps = {
  logout: AuthActions.logout,
}

type Props = ReturnType<typeof mapStateToProps> &
  RouteComponentProps & {
    logout: () => Promise<void>
  }

const useStyles = makeStyles({
  link: {
    color: "white",
    cursor: "pointer",
  },
})

const Navbar: React.SFC<Props> = ({
  isLoggedIn,
  items,
  user,
  logout,
  history,
}) => {
  const classes = useStyles()

  const cartLength = useMemo(
    () => items.reduce((acc: number, item: Product) => acc + item.quantity, 0),
    [items]
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          onClick={() => history.push("/")}
          className={classes.link}
          underline="none"
        >
          <Typography variant="h4" color="inherit">
            Pizza Shop
          </Typography>
        </Link>
        <div className="ml-auto">
          {isLoggedIn && user ? (
            <>
              <Button
                className={`${classes.link} mr-2`}
                onClick={() => history.push("/cart")}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  size="lg"
                  icon={faShoppingCart}
                />
                {cartLength}
              </Button>
              <Button
                onClick={() => history.push("/user")}
                className={`${classes.link} mr-2`}
              >
                <FontAwesomeIcon className="mr-2" size="lg" icon={faUser} />
                {user.username}
              </Button>
              <Button
                onClick={() => {
                  logout()
                  history.push("/")
                }}
                className={classes.link}
                variant="text"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => history.push("/login")}
                className={classes.link}
                variant="text"
              >
                Login
              </Button>
              <Button
                onClick={() => history.push("/register")}
                className={classes.link}
                variant="text"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
)
