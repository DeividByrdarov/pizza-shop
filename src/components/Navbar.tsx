import React from "react"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Toolbar, AppBar, Typography, Button, Link } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

import { AppState } from "redux/reducers"
import { getAuthReducer } from "redux/selectors"
import * as AuthActions from "redux/actions/Auth"

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: getAuthReducer(state).isLoggedIn,
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

const Navbar: React.SFC<Props> = ({ isLoggedIn, logout, history }) => {
  const classes = useStyles()

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
