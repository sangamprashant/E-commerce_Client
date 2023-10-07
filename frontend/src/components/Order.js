import React, { useContext, useEffect, useState } from "react";
import { Center } from "./CSSEXPORT";
import { Link, useLocation, useParams } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const { orderDatas } = location.state;
  console.log(orderDatas)

  return <Center>
  <div class="container">
    <article class="card">
        <header class="card-header"> Order ID: {orderDatas._id} </header>
        <div class="card-body">
            <h6>Email: {orderDatas.email}</h6>
            <article class="card">
                <div class="card-body row">
                    <div class="col"> <strong>Estimated Delivery time:</strong> <br/>29 nov 2019 </div>
                    <div class="col"> <strong>Shipping Address:</strong> <br/> {orderDatas.street} | {orderDatas.city} | {orderDatas.postalCode}</div>
                    <div class="col"> <strong>Shipping TO:</strong> <br/> {orderDatas.name} | <i class="fa fa-phone"></i> {orderDatas.phone} | {orderDatas.APhone} </div>
                    <div class="col"> <strong>Status:</strong> <br/> Picked by the courier <br/><button className="btn btn-danger w-full">Cancel</button> </div>
                </div>
            </article>
            <div class="track">
                <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Order confirmed</span> </div>
                <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Picked by courier</span> </div>
                <div class="step active"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> On the way </span> </div>
                <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for pickup</span> </div>
            </div>
            <hr/>
            <ul class="row">
                {orderDatas.line_items.map(order=>(<li class="col-md-4">
                    <figure class="itemside mb-3">
                        <div class="aside"><img src={order.priceData.product_data?.image} class="img-sm border "/></div>
                        <figcaption class="info align-self-center">
                            <p class="title">{order?.priceData.product_data?.name} <br/> {order.quantity}</p> <span class="text-muted">₹{order?.priceData.unit_amount} </span>
                        </figcaption>
                    </figure>
                </li>))}
                
            </ul>
            <hr/>
            <div className="d-flex justify-between items-center">
            <Link to="/myorder" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</Link>
            <p >Order Amount: ₹{orderDatas.total}</p>
            </div>
        </div>
    </article>
</div>
  
  </Center>;
};

export default Order;
