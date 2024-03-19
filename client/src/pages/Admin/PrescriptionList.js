// PrescriptionList.jsx

import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await axios.get("/api/v1/prescription/list");
      setPrescriptions(data.prescriptions);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);
  console.log(prescriptions);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Prescription List</h1>
          <div className="d-flex flex-wrap">
          {prescriptions?.map((pre) => (
           
          <div className="card m-2" style={{ width: "18rem" }}>
            <img
              src={`/api/v1/prescription/list/${pre._id}`}
              //alt={`Prescription ${pre._id}`}
              className="card-img-top"
            />
            <div className="card-body">
                    <h5 className="card-title">{pre.name}</h5>
                    <h5 className="card-text">{pre.phone}</h5>
                    <h5 className="card-text">{pre.address}</h5>
                    
                  </div>
                 
                
              
          </div>
          
          ))}


          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionList;
