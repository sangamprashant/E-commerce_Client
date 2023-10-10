import React, { useContext, useEffect, useState } from "react";
import { Center } from "./CSSEXPORT";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Article = styled.article`
 box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
`;

const Order = () => {
  const location = useLocation();
  const { orderDatas } = location.state;

  return <Center>
  <div className="container pt-12">
    <Article className="card rounded">
        <header className="card-header"> Order ID: {orderDatas._id} </header>
        <div className="card-body">
            <h6>Email: {orderDatas.email}</h6>
            <article className="card">
                <div className="card-body row">
                    <div className="col"> <strong>Estimated Delivery time:</strong> <br/>29 nov 2019 </div>
                    <div className="col"> <strong>Shipping Address:</strong> <br/> {orderDatas.street} | {orderDatas.city} | {orderDatas.postalCode}</div>
                    <div className="col"> <strong>Shipping TO:</strong> <br/> {orderDatas.name} | <i className="fa fa-phone"></i> {orderDatas.phone} | {orderDatas.APhone} </div>
                    {((orderDatas.status==="delivered"||orderDatas.status==="canceled"))&&<div className="col"> <strong>Status:</strong> <br/> {orderDatas.status}</div>}
                    {(orderDatas.status==="confirm"||orderDatas.status==="packing"||orderDatas.status==="packed"||orderDatas.status==="shipping"||orderDatas.status==="out to deliver")&&<div className="col"> <strong>Cancel:</strong><br/><button className="btn btn-danger w-full">Cancel</button> </div>}
                </div>
            </article>
            {((orderDatas.status!=="delivered"&&orderDatas.status!=="canceled"))&&<div className="track">
                <div className={`step ${(orderDatas.status==="confirm"||orderDatas.status==="packing"||orderDatas.status==="packed"||orderDatas.status==="shipping"||orderDatas.status==="out to deliver")?"active":""}`}> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Order confirmed</span> </div>
                <div className={`step ${(orderDatas.status==="packing"||orderDatas.status==="packed"||orderDatas.status==="shipping"||orderDatas.status==="out to deliver")?"active":""}`}> <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text"> Packing</span> </div>
                <div className={`step ${(orderDatas.status==="packed"||orderDatas.status==="shipping"||orderDatas.status==="out to deliver")?"active":""}`}> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text"> Packed</span> </div>
                <div className={`step ${(orderDatas.status==="shipping"||orderDatas.status==="out to deliver")?"active":""}`}> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text">Shipping</span> </div>
                <div className={`step ${(orderDatas.status==="out to deliver")?"active":""}`}> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Out to deliver</span> </div>
                <div className="step"> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Delivered</span> </div>
            </div>}
            <hr/>
            <ul className="row">
                {orderDatas.line_items.map((order,index)=>(<li className="col-md-4" key={index}>
                    <figure className="itemside mb-3">
                        <div className="aside"><img src={order.price_data.product_data?.images[0]} className="img-sm border "/></div>
                        <figcaption className="info align-self-center">
                            <p className="title">{order?.price_data.product_data?.name} <br/> {order.quantity}</p> <span className="text-muted">₹{order?.price_data.unit_amount} </span>
                        </figcaption>
                    </figure>
                </li>))} 
            </ul>
            <hr/>
            <div className="d-flex justify-between items-center">
            <Link to="/myorder" className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left"></i> Back to orders</Link>
            <p >Order Amount: ₹{orderDatas.total}</p>
            </div>
        </div>
    </Article>
</div>
  
  </Center>;
};

export default Order;
