import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  BarChart2, 
  Clock,
  AlertCircle
} from 'lucide-react';

function AdminDashboardPage() {
  useEffect(() => {
    document.title = 'Admin Dashboard | Microcon Systems';
  }, []);

  return (
    <div className="container py-8 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div>
          <span className="text-sm text-secondary-600">Last updated: Today at 10:45 AM</span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-500 font-medium">Total Products</h3>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Package size={20} className="text-primary-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold">126</p>
          <p className="text-sm text-secondary-500 mt-2">
            <span className="text-success-500">↑ 12%</span> from last month
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-500 font-medium">Orders</h3>
            <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
              <ShoppingBag size={20} className="text-accent-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold">37</p>
          <p className="text-sm text-secondary-500 mt-2">
            <span className="text-success-500">↑ 8%</span> from last month
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-500 font-medium">Customers</h3>
            <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
              <Users size={20} className="text-secondary-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold">243</p>
          <p className="text-sm text-secondary-500 mt-2">
            <span className="text-success-500">↑ 5%</span> from last month
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-500 font-medium">Revenue</h3>
            <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-success-600" />
            </div>
          </div>
          <p className="text-3xl font-semibold">$42,856</p>
          <p className="text-sm text-secondary-500 mt-2">
            <span className="text-success-500">↑ 17%</span> from last month
          </p>
        </div>
      </div>

      {/* Sales chart and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Sales Overview</h2>
            <select className="border border-secondary-300 rounded-md text-sm p-1">
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
            </select>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-secondary-50">
            <BarChart2 size={64} className="text-secondary-300" />
            <span className="ml-4 text-secondary-500">Sales chart would be rendered here</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
          
          <div className="space-y-4">
            <div className="border-b border-secondary-100 pb-4">
              <div className="flex justify-between">
                <span className="font-medium">Order #53412</span>
                <span className="badge badge-success">Shipped</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">SPX Gaulin Pistons (3)</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>John Smith</span>
                <span className="text-secondary-500">2 hours ago</span>
              </div>
            </div>
            
            <div className="border-b border-secondary-100 pb-4">
              <div className="flex justify-between">
                <span className="font-medium">Order #53411</span>
                <span className="badge badge-primary">Processing</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">Bertoli Homogenizer X300</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Sarah Johnson</span>
                <span className="text-secondary-500">5 hours ago</span>
              </div>
            </div>
            
            <div className="border-b border-secondary-100 pb-4">
              <div className="flex justify-between">
                <span className="font-medium">Order #53410</span>
                <span className="badge badge-accent">Pending</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">FBF Italia Valve Set</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Michael Chen</span>
                <span className="text-secondary-500">Yesterday</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between">
                <span className="font-medium">Order #53409</span>
                <span className="badge badge-success">Shipped</span>
              </div>
              <p className="text-sm text-secondary-500 mt-1">TetraPak O-Rings (20)</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Lisa Williams</span>
                <span className="text-secondary-500">Yesterday</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="/admin/orders" 
              className="text-primary-600 text-sm hover:text-primary-700"
            >
              View all orders →
            </Link>
          </div>
        </div>
      </div>

      {/* Low stock and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Low Stock Items</h2>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-error-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">SPX Gaulin Crankshaft Assembly</p>
                  <p className="text-sm text-secondary-500">Only 3 left in stock</p>
                </div>
              </div>
              <Link 
                to="/admin/products" 
                className="text-primary-600 text-sm hover:text-primary-700"
              >
                Restock
              </Link>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-error-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">TetraPak Homogenizer TP8000</p>
                  <p className="text-sm text-secondary-500">Only 2 left in stock</p>
                </div>
              </div>
              <Link 
                to="/admin/products" 
                className="text-primary-600 text-sm hover:text-primary-700"
              >
                Restock
              </Link>
            </div>
            
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-warning-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Bertoli Gasket Set</p>
                  <p className="text-sm text-secondary-500">Only 5 left in stock</p>
                </div>
              </div>
              <Link 
                to="/admin/products" 
                className="text-primary-600 text-sm hover:text-primary-700"
              >
                Restock
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="/admin/products" 
              className="text-primary-600 text-sm hover:text-primary-700"
            >
              View all inventory →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Upcoming Tasks</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock size={20} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Update product pricing</p>
                <p className="text-sm text-secondary-500">Due in 2 days</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={20} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Review pending orders</p>
                <p className="text-sm text-secondary-500">Due today</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={20} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Check inventory status</p>
                <p className="text-sm text-secondary-500">Due tomorrow</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock size={20} className="text-secondary-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Plan monthly sales report</p>
                <p className="text-sm text-secondary-500">Due in 5 days</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="#" 
              className="text-primary-600 text-sm hover:text-primary-700"
            >
              View all tasks →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;