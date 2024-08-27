import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import axios from 'axios';

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState({ labels: [], values: [] });
  const [barChartData, setBarChartData] = useState({ labels: [], values: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], values: [] });
  const [filterUserId, setFilterUserId] = useState('all');
  const [sortOption, setSortOption] = useState('asc');

  const getRandomData = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        let data = response.data;

        if (filterUserId !== 'all') {
          data = data.filter(item => item.userId === parseInt(filterUserId));
        }

        data.sort((a, b) => (sortOption === 'asc' ? a.id - b.id : b.id - a.id));

        const labels = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
        const lineValues = getRandomData(10);
        const barValues = getRandomData(10);
        const pieValues = getRandomData(3);

        setLineChartData({ labels, values: lineValues });
        setBarChartData({ labels, values: barValues });
        setPieChartData({ labels: labels.slice(0, 3), values: pieValues });
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, [filterUserId, sortOption]);

  return (
    <div className="dashboard">

      <div className="filters">
        <div className="filter">
          <label>Filter by UserId: </label>
          <select value={filterUserId} onChange={(e) => setFilterUserId(e.target.value)}>
            <option value="all">All</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        </div>

        <div className="filter">
          <label>Sort by ID: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container1">
          <h3>Line Chart: User Data Over Time</h3>
          <LineChart data={lineChartData} />
        </div>
        <div className="chart-container">
          <h3>Bar Chart: Post IDs</h3>
          <BarChart data={barChartData} />
        </div>
        <div className="chart-container">
          <h3>Pie Chart: User Distribution</h3>
          <PieChart data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
