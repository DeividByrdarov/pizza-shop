import React from "react"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"
import {
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
} from "@material-ui/core"

import * as AuthActions from "redux/actions/Auth"
import { useStateForInput } from "hooks"

const mapDispatchToProps = {
  register: AuthActions.register,
}

type Props = RouteComponentProps & {
  register: (user: AuthActions.AuthBody) => Promise<void>
}

const Register: React.SFC<Props> = ({ register, history }) => {
  const [username, setUsername] = useStateForInput("")
  const [password, setPassword] = useStateForInput("")

  return (
    <Card raised>
      <CardHeader title="Register" titleTypographyProps={{ variant: "h3" }} />
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault()
            register({ username, password }).then(() => history.push("/"))
          }}
        >
          <TextField
            id="username"
            label="Username"
            margin="normal"
            variant="outlined"
            value={username}
            onChange={setUsername}
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={password}
            onChange={setPassword}
            fullWidth
          />
          <Button disableRipple type="submit" variant="contained">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
