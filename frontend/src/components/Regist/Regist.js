import React, { useState } from 'react';
import './Regist.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LogIn } from '../../redux/action';

function Regist(props) {
  const [cookies, setCookie] = useCookies(['userName']);
  const [error, setError] = useState('');
  const { LogIn } = props;


  function PutData(event) {
    event.preventDefault();
    const { nick: { value: nickname }, mail: { value: email }, pasword: { value: password } } = event.target;
    axios.post('http://localhost:4000/users/registration', {
      nickname,
      email,
      password,
    }).then((response) => {
      if (response.data.success) {
        LogIn(response.data.id, nickname);
        setCookie('userName', response.data.id);
      } else {
        setError(response.data.err);
        setTimeout(setError, 2000, '');
      }
    }).catch(() => { setError('Неизвестная Ошибка регистрации'); setTimeout(setError, 2000, ''); });
  }


  return (
    <>
      {cookies.userName
        ? <Redirect to="/profile" />
        : (
          <div>
            <form onSubmit={PutData}>
              <h1 className="segment">Create Account</h1>
              <label>
                <input name="nick" type="text" placeholder="NickName" required />
              </label>
              <label>
                <input name="mail" type="email" placeholder="Email Address" required />
              </label>
              <label>
                <input name="pasword" type="password" placeholder="Password" minLength="5" required />
              </label>
              <div style={{ color: 'red', textAlign: 'center' }}>
                {error}
                {' '}
                <br />
                {' '}
              </div>
              <button className="red" type="submit">Create</button>
              <br />
              <Link to="/login"><button className="green">LogIn</button></Link>
            </form>
          </div>
        )}
    </>
  );
}


const mapDispatchToProps = (dispatch) => ({
  LogIn: (id, nickname, profileId) => dispatch(LogIn(id, nickname, profileId)),
});


export default connect(null, mapDispatchToProps)(Regist);
