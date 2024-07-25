import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({username: '',email: '',password: '',});
  const navigate = useNavigate(); 
  const { username, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4001/api/auth/register', formData);
      toast.success('User registered successfully');
      navigate('/login')
    }
     catch (err) {
      toast.error(err.response?.data?.message || 'Registration Error');
      console.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor='username'>Username </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Username"
                    autoComplete='username'
                  />
                 
                </div>
                <div className="form-group">
                  <label htmlFor='email'>Email    </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Email"
                  />
              
                </div>
                <div className="form-group">
                  <label htmlFor='password'>Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Password"
                  />
                  
                </div>
                <button type="submit" className="btn mt-4 btn-primary btn-block">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
