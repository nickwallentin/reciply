import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { getFirebase } from "../firebase/firebase"
import { Sec, Wrap, Card, Form, Button } from "../components/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SignUpPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState(null)
  const firebase = getFirebase()

  const handleSignUp = (event, method) => {
    setError(null)
    event.preventDefault()
    if (firebase) {
      if (method === "email") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            res.user
              .updateProfile({
                displayName: username,
              })
              .then(() => console.log("Username updated"))
              .catch(err => console.log("Update username error:", err))
            return res.user
          })
          .then(user => {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .set({ displayName: username })
          })
          .then(() => {
            navigate("/account/profile")
          })
          .catch(err => setError(err.message))
      }
    }
  }

  return (
    <Layout page="Login">
      <SEO title="Become a foodie" />
      <Sec>
        <Wrap>
          <Card>
            <div className="card-header">
              <h4>Become a foodie</h4>
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
                    onInput={e => setUsername(e.target.value)}
                    type="text"
                    id="username"
                    placeholder="Username"
                  />
                </div>
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
                    onClick={e => handleSignUp(e, "email")}
                    full
                    cta
                    type="submit"
                  >
                    Create account
                  </Button>
                </div>
              </Form>

              <div className="separator">
                <span>Or</span>
              </div>
              <Button full className="google-signup">
                Sign up with Google
              </Button>
              <Button full className="google-signup">
                Sign up with Apple
              </Button>
            </div>
            <div className="card-footer">
              Already have an account? <Link to="/login">Log in</Link>.
            </div>
          </Card>
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default SignUpPage
