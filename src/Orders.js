import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { ORDERS_QUERY } from "./queries";
import gql from "graphql-tag";

const ORDER_STATUS = gql`
  subscription orderStatusChange($id: ID!) {
    onOrderStatusChange(id: $id) {
      id
      status
    }
  }
`;

export function OrderItem({ order }) {
  const { data } = useSubscription(ORDER_STATUS, {
    variables: { id: order.id }
  });
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>
            <h1 className="display-5">{order.product.name}</h1>
          </CardTitle>
          <CardText>
            ${order.product.price} x {order.quantity}{" "}
          </CardText>
          <CardText>Total: ${order.product.price * order.quantity}</CardText>
          <CardText>Status: {order.status}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default function Orders() {
  const { loading, data } = useQuery(ORDERS_QUERY);
  if (loading) {
    return <div>loading...</div>;
  }
  if (data.orders.length === 0) {
    return <h1>No orders</h1>;
  }
  return (
    <div>
      <h1>Orders</h1>
      {data.orders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
}
