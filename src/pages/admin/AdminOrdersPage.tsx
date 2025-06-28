import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar,
  ChevronLeft, 
  ChevronRight,
  X,
  Download,
  Eye
} from 'lucide-react';

// Mock orders data
const orders = [
  {
    id: '53412',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    date: '2023-06-10',
    total: 2840,
    status: 'Shipped',
    items: 3
  },
  {
    id: '53411',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    date: '2023-06-10',
    total: 48000,
    status: 'Processing',
    items: 1
  },
  {
    id: '53410',
    customer: 'Michael Chen',
    email: 'mchen@example.com',
    date: '2023-06-09',
    total: 3200,
    status: 'Pending',
    items: 1
  },
  {
    id: '53409',
    customer: 'Lisa Williams',
    email: 'lwilliams@example.com',
    date: '2023-06-09',
    total: 950,
    status: 'Shipped',
    items: 2
  },
  {
    id: '53408',
    customer: 'Robert Davis',
    email: 'rdavis@example.com',
    date: '2023-06-08',
    total: 7600,
    status: 'Delivered',
    items: 5
  },
  {
    id: '53407',
    customer: 'Emily Martinez',
    email: 'emartinez@example.com',
    date: '2023-06-08',
    total: 1200,
    status: 'Shipped',
    items: 1
  },
  {
    id: '53406',
    customer: 'David Wilson',
    email: 'dwilson@example.com',
    date: '2023-06-07',
    total: 6300,
    status: 'Delivered',
    items: 4
  },
  {
    id: '53405',
    customer: 'Jennifer Lee',
    email: 'jlee@example.com',
    date: '2023-06-07',
    total: 4200,
    status: 'Cancelled',
    items: 2
  },
  {
    id: '53404',
    customer: 'Carlos Rodriguez',
    email: 'crodriguez@example.com',
    date: '2023-06-06',
    total: 3950,
    status: 'Delivered',
    items: 3
  },
  {
    id: '53403',
    customer: 'Anna Nguyen',
    email: 'anguyen@example.com',
    date: '2023-06-06',
    total: 8700,
    status: 'Delivered',
    items: 2
  },
  {
    id: '53402',
    customer: 'William Brown',
    email: 'wbrown@example.com',
    date: '2023-06-05',
    total: 1850,
    status: 'Delivered',
    items: 1
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = '';
  
  switch (status) {
    case 'Shipped':
      colorClass = 'bg-primary-100 text-primary-700';
      break;
    case 'Processing':
      colorClass = 'bg-accent-100 text-accent-700';
      break;
    case 'Pending':
      colorClass = 'bg-warning-100 text-warning-700';
      break;
    case 'Delivered':
      colorClass = 'bg-success-100 text-success-700';
      break;
    case 'Cancelled':
      colorClass = 'bg-error-100 text-error-700';
      break;
    default:
      colorClass = 'bg-secondary-100 text-secondary-700';
  }
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

function AdminOrdersPage() {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const ordersPerPage = 10;

  // Get unique statuses
  const statuses = Array.from(new Set(orders.map(order => order.status)));

  useEffect(() => {
    document.title = 'Manage Orders | Microcon Systems Admin';
  }, []);

  // Filter orders based on search and filters
  useEffect(() => {
    let result = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        order => 
          order.id.includes(lowerCaseSearch) ||
          order.customer.toLowerCase().includes(lowerCaseSearch) ||
          order.email.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply status filter
    if (selectedStatus) {
      result = result.filter(order => order.status === selectedStatus);
    }
    
    // Apply date range filter
    if (dateRange) {
      // In a real app, you would implement date filtering logic here
      // For this demo, we'll just keep all orders
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedStatus, dateRange]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setDateRange('');
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container py-8 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Manage Orders</h1>
        <div>
          <button className="btn btn-secondary btn-md inline-flex items-center">
            <Download size={18} className="mr-2" />
            Export Orders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-secondary-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by order #, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn btn-secondary btn-md inline-flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters {(selectedStatus || dateRange) && '(Active)'}
            </button>

            {/* Filters (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Date Range"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                />
                <Calendar 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                />
              </div>
              
              {(selectedStatus || dateRange) && (
                <button
                  onClick={resetFilters}
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                >
                  <X size={14} className="mr-1" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile filters (collapsible) */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-secondary-50 rounded-md">
              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-status" className="block text-sm font-medium text-secondary-700 mb-1">
                    Status
                  </label>
                  <select
                    id="mobile-status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mobile-date" className="block text-sm font-medium text-secondary-700 mb-1">
                    Date Range
                  </label>
                  <div className="relative">
                    <input
                      id="mobile-date"
                      type="text"
                      placeholder="Select dates"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                    />
                    <Calendar 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Orders table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700">Order ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700 hidden md:table-cell">Date</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-secondary-700">Total</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-secondary-700">Status</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-secondary-700 hidden md:table-cell">Items</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-secondary-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {currentOrders.map(order => (
                <tr key={order.id} className="hover:bg-secondary-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-primary-600">#{order.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-secondary-900">{order.customer}</div>
                      <div className="text-sm text-secondary-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell text-secondary-600">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    {order.items}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <button className="text-primary-600 hover:text-primary-700">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-secondary-500">
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="p-4 border-t border-secondary-200 flex items-center justify-between">
            <div className="text-sm text-secondary-600">
              Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-secondary-300 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) {
                    pageNum = totalPages - (4 - i);
                  }
                }
                
                return (
                  pageNum > 0 && pageNum <= totalPages && (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'border border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-secondary-300 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;