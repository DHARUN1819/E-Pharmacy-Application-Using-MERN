import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Select } from 'antd';
import toast from "react-hot-toast";



const PrescriptionUpload = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // You can add any initialization logic here
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const prescriptionData = new FormData();
      prescriptionData.append('photo', photo);
      prescriptionData.append('name', name);
      prescriptionData.append('phone', phone);
      prescriptionData.append('address', address);

      const { data } = axios.post('/api/v1/prescription/upload', prescriptionData);

      if (data?.success) {
        toast.error(data?.message)
        
      } else {
        toast.success("Prescription Uploaded Successfully");
        setTimeout(() => {
          navigate("/")
        }, 1000);
        
        
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Prescription Upload">
      <div class="area" >
      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
      <div className="form-container" style={{ minHeight: "90vh" }}>
            
              <form onSubmit={handleUpload}>
                <h4 className='title'>Prescription Upload</h4>
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
                  <label className="btn forgot-btn">
                    {photo ? photo.name : 'Upload Photo'}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="prescription_photo"
                        height={'200px'}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                  <button type="submit" className="btn btn-primary">
                    UPLOAD PRESCRIPTION
                  </button>

              </form>
            </div>
          </div>
    </Layout>
  );
};

export default PrescriptionUpload;
