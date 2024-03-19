import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Select } from 'antd';
import toast from 'react-hot-toast';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [months, setMonths] = useState(1); // Defaulting to 1 month

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const subscriptionData = {
        name,
        phone,
        address,
        months
      };

      const response = await axios.post('/api/v1/subscription/subscribe', subscriptionData);

      if (response.status === 200) {
        toast.success('Subscription Uploaded Successfully');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('You have already subscribed');
      } else {
        console.error(error);
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <Layout title="Membership Subscription">
      <div className="area">
        <ul className="circles">
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        <div className="form-container" style={{ minHeight: '90vh' }}>
          <form onSubmit={handleUpload}>
            <h4 className="title">Care Plan</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="mb-3">
              <select
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="form-control"
                required
              >
                <option value={1}>1 Month</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
