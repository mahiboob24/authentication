import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/auth/login', formData);

      console.log('Login Response token=>', response.data.token);

      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        toast.success('User logged in successfully'); // Use Toastify for success message
        navigate('/');
      } else {
        console.error('Token not found in response');
        toast.error('Token not found in response'); // Use Toastify for error message
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login Error'); // Use Toastify for error message
      console.error('Login Error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor='email'>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor='password'>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn mt-4 btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
