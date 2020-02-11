import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { getFirebase } from "../firebase/firebase"
import { Sec, Wrap, Grid, Card, Form, Button } from "../components/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const firebase = getFirebase()

  const handleSignIn = (event, method) => {
    event.preventDefault()
    if (firebase) {
      if (method === "email") {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(user => {
            console.log("Signed in!", user)
            navigate("/account/profile")
          })
          .catch(err => setError(err.message))
      }
    }
  }

  return (
    <Layout page="Login">
      <SEO title="Log in" />
      <Sec>
        <Wrap>
          <Card>
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-content">
              {error && (
                <small
                  style={{
                    color: "red",
                    marginBottom: "10px",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  {error}
                </small>
              )}
              <Form name="Login">
                <div className="input-group">
                  <input
                    onInput={e => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-group">
                  <input
                    onInput={e => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="input-group">
                  <Button
                    onClick={e => handleSignIn(e, "email")}
                    full
                    cta
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </Form>

              <div className="separator">
                <span>Or</span>
              </div>
              <Button full className="google-signup">
                Sign in with Google
              </Button>
              <Button full className="google-signup">
                Sign in with Apple
              </Button>
            </div>
            <div className="card-footer">
              Don't have an account? <Link to="/signup">Sign up</Link>.
            </div>
          </Card>
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default LoginPage
