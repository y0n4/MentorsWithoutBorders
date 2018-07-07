import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.findUserInfo = this.findUserInfo.bind(this);
  }

  componentDidMount() {
    this.findUserInfo();
  }

  findUserInfo() {
    const { setIsUserOn } = this.props;
    axios.get('/home')
      .then((res) => {
        if (res.data.status === 'cookie') {
          setIsUserOn(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <a href="/auth/google">
          <button value="Sign In" type="button" className="login-btn">
            Sign In
          </button>
        </a>
        <br />
        <br />
        <div className="login-descrip">
Sign up and join to become a mentor/mentee and meet amazing people over the world who love to share their knowledge in our growing community!
        </div>
      </div>
    );
  }
}

export default Login;
