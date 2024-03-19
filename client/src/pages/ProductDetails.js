import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Dropdown, Menu } from "antd";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [rating, setRating] = useState(0); // State for star rating
  const [review, setReview] = useState(""); // State for review text
  

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  const handleRatingSelect = ({ key }) => {
    setRating(parseInt(key));
  };

  const ratingMenu = (
    <Menu onClick={handleRatingSelect}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <Menu.Item key={rating}>{rating}</Menu.Item>
      ))}
    </Menu>
  );
  

  const handleSubmitReview = async () => {
    try {     
      if (userReview) {
        toast.error("You have already submitted a review for this product.");
        return;
      }
      const response = await axios.post("/api/v1/product/add-review", {
        productId: product._id,
        rating,
        review,
      });

      if (response.status === 201) {
        toast.success("Review submitted successfully");
        setReview("");
        setRating(0);
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <div className="star-rating">
            <span>Rating:</span>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < rating ? "star-filled" : "star-empty"}
                value={rating}
                onClick={() => setRating(index + 1)}
              >
                {index < rating ? "⭐" : "☆"}
              </span>
            ))}
            
          </div>
          <div className="mb-3">
                <textarea
                  type="text"
                  value={review}
                  placeholder="write a review"
                  className="form-control"
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
          <div className="button-container">
            <button className="btn btn-primary" onClick={handleSubmitReview}>
              Submit Review
            </button>
            <button className="btn btn-secondary ms-2" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
  