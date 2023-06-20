import { createEl } from "../scripts/utils/utils.js"

export async function getOrders() {
  const reqA = await fetch("/orders/availableIds");
  const resA = await reqA.json();
  
  const ordersCon = createEl("div", { className: "orders-con" });

  resA.forEach(async (data) => {
    const reqB = await fetch(`/orders/${data}`);
    const resB = await reqB.json();
    console.log(resB)
    Object.entries(resB).forEach(([key, value]) => {
      const orderCard = createEl("div", { className: "order-card" });
      const orderData = createEl("p", { className: "order-data", innerHTML: value.date });
      const orderId = createEl("p", { className: "order-id", innerHTML: JSON.stringify(value.id) });
      const customer = createEl("div", { className: "customer" });
      customer.append(orderData);
      orderCard.append(orderId, customer);
      ordersCon.append(orderCard);
    });
    
  });

  return ordersCon;
}
