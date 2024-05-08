import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import styles from "./Chart.module.scss";

import { useSelector } from "react-redux";
import { selectOrders } from "../../redux/features/product/orderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrders);

  // Create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4, q5, q6] = [
    "Đang chờ",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);
  const completed = getOrderCount(array, q5);
  const cancelled = getOrderCount(array, q6);

  const data = {
    labels: ["Đang chờ", "Đã xác nhận", "Đang vận chuyển", "Đã giao hàng", "Hoàn thành", "Đã hủy"],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: [placed, processing, shipped, delivered, completed, cancelled],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Biểu đồ trạng thái đơn hàng</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
