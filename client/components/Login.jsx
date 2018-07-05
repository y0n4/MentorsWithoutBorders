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
      </div>
    );
  }
}

export default Login;
