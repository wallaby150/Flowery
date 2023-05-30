import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import axios from "axios";
interface DateInfo {
  startDate: any;
  endDate: any;
}

const DoughnutChart: React.FC<DateInfo> = (props) => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const myStoreId = useRecoilValue(storeId);
  const myatk = sessionStorage.getItem("atk");

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://host 명/api/sales/flowers",
        {
          params: {
            storeId: myStoreId,
            startDate: startDate.toISOString().split("T")[0] + "T00:00:00",
            endDate: endDate.toISOString().split("T")[0] + "T00:00:00",
          },
          headers: {
            Authorization: `bearer ${sessionStorage.getItem("atk")}`,
          },
        }
      );
      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const labels = chartData.map((item) => item[0]);
  const dataValues = chartData.map((item) => item[1]);
  const backgroundColors = chartData.map(
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1.0)`
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
    hoverOffset: 4,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
