import React, { useMemo } from "react"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Toolbar, AppBar, Typography, Button, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

import { AppState } from "redux/reducers"
import { getAuthReducer, getCartReducer } from "redux/selectors"
import * as AuthActions from "redux/actions/Auth"

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: getAuthReducer(state).isLoggedIn,
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

const Navbar: React.SFC<Props> = ({ isLoggedIn, items, logout, history }) => {
  const classes = useStyles()

  const cartLength = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
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
          {isLoggedIn ? (
            <>
              <Button
                className={`${classes.link} mr-2`}
                onClick={() => history.push("/cart")}
              >
                <FontAwesomeIcon size="lg" icon={faShoppingCart} />
                &nbsp;&nbsp;&nbsp;{cartLength}
              </Button>
              <Button
                onClick={() => logout()}
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
