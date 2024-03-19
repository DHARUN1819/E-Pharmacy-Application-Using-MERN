// SubscribersList.jsx

import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("/api/v1/subscription/list");
      setSubscribers(data.subscribers);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Subscribers List</h1>
          <div className="d-flex flex-wrap">
            {subscribers.map((subscriber) => (
              <div className="card m-2" style={{ width: "18rem" }} key={subscriber._id}>
                <div className="card-body">
                {/*<h5 className="card-title">UserName: {subscriber.userId}</h5>*/}
                  <h5 className="card-title">Name: {subscriber.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Phone: {subscriber.phone}</h6>
                  <p className="card-text">Address: {subscriber.address}</p>
                  <h5 className="card-title">Months:{subscriber.months}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscribersList;
