import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  HiOutlineUsers, 
  HiOutlineCurrencyDollar, 
  HiOutlineShoppingCart, 
  HiOutlineChartBar 
} from 'react-icons/hi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [3000, 3500, 3200, 4000, 4500, 4200],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Electronics', 'Clothing', 'Food', 'Books'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          'rgba(254, 215, 226, 0.8)',
          'rgba(254, 231, 214, 0.8)',
          'rgba(229, 231, 235, 0.8)',
          'rgba(209, 250, 229, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value="1,257"
          icon={<HiOutlineUsers className="w-8 h-8 text-pink-400" />}
          color="bg-pink-100"
        />
        <StatCard
          title="Revenue"
          value="$45,850"
          icon={<HiOutlineCurrencyDollar className="w-8 h-8 text-orange-400" />}
          color="bg-orange-100"
        />
        <StatCard
          title="Products Sold"
          value="2,359"
          icon={<HiOutlineShoppingCart className="w-8 h-8 text-blue-400" />}
          color="bg-blue-100"
        />
        <StatCard
          title="Conversion Rate"
          value="3.5%"
          icon={<HiOutlineChartBar className="w-8 h-8 text-green-400" />}
          color="bg-green-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Sales Overview">
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
        <ChartCard title="Product Categories">
          <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </ChartCard>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h3>
        <ol className="relative border-l border-gray-200">
          <ActivityItem
            title="New user registered"
            time="2 hours ago"
            description="John Doe created an account"
          />
          <ActivityItem
            title="New order placed"
            time="3 hours ago"
            description="Jane Smith placed an order for $250"
          />
          <ActivityItem
            title="Product restocked"
            time="5 hours ago"
            description="iPhone 12 Pro is back in stock (20 units)"
          />
          <ActivityItem
            title="Customer support ticket resolved"
            time="1 day ago"
            description="Ticket #1234 has been closed"
          />
        </ol>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-lg shadow-md p-6 flex items-center`}>
    <div className="mr-4">{icon}</div>
    <div>
      <h5 className="text-2xl font-bold text-gray-800">{value}</h5>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

const ActivityItem: React.FC<{ title: string; time: string; description: string }> = ({ title, time, description }) => (
  <li className="mb-6 ml-4">
    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
    <time className="mb-1 text-sm font-normal leading-none text-gray-500">{time}</time>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-base font-normal text-gray-600">{description}</p>
  </li>
);

export default Dashboard;