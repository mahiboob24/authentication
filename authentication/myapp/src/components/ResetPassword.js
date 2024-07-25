import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4001/api/auth/reset-password/${token}`, {password});
      console.log('Response:', response.data);
      toast.success(response.data.msg);
      navigate('/login');
    } catch (err) {
      console.error('Error resetting password:', err.message);
      toast.error('Error resetting password!!!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Reset Password</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter new password"
                    required
                    autoComplete="new-password"
                  />
                </div>
                <button type="submit" className="btn mt-4 btn-primary btn-block">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
