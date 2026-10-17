import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Printer,
  Plus,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ChevronDown,
  ArrowUpDown,
  Download,
  ShieldCheck,
  FileText,
  User,
  Zap,
  Tag,
  Building
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus, PaymentStatus, OrderItem } from '../../types';

interface AdminOrdersTabProps {
  showToast?: (msg: string) => void;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({ showToast }) => {
  const {
    orders,
    products,
    updateOrderStatus,
    updateOrderPaymentStatus,
    updateOrderCourier,
    deleteOrder,
    createManualOrder,
    brandConfig
  } = useStore();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest_amount'>('newest');

  // Modal States
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);
  const [orderForCourierModal, setOrderForCourierModal] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState('Steadfast Courier');
  const [courierTrackingNo, setCourierTrackingNo] = useState('');
  const [isManualOrderModalOpen, setIsManualOrderModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  // Manual Order Form State
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualCustomerPhone, setManualCustomerPhone] = useState('');
  const [manualCustomerAddress, setManualCustomerAddress] = useState('');
  const [manualCustomerDistrict, setManualCustomerDistrict] = useState('Dhaka');
  const [manualPaymentMethod, setManualPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'bank_transfer' | 'emi'>('cod');
  const [manualSelectedProductId, setManualSelectedProductId] = useState<string>(products[0]?.id || '');
  const [manualQuantity, setManualQuantity] = useState<number>(1);
  const [manualNotes, setManualNotes] = useState('');
  const [manualFormError, setManualFormError] = useState<string | null>(null);

  // Metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'pending').length;
    const processing = orders.filter((o) => o.status === 'processing').length;
    const shipped = orders.filter((o) => o.status === 'shipped').length;
    const delivered = orders.filter((o) => o.status === 'delivered').length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return { total, pending, processing, shipped, delivered, totalRevenue };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        // Status filter
        if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;

        // Payment filter
        if (selectedPayment !== 'all' && order.paymentMethod !== selectedPayment) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesId = order.id.toLowerCase().includes(q);
          const matchesName = order.customer.name.toLowerCase().includes(q);
          const matchesPhone = order.customer.phone.toLowerCase().includes(q);
          const matchesAddress = order.customer.address.toLowerCase().includes(q);
          const matchesDistrict = (order.customer.district || '').toLowerCase().includes(q);
          const matchesItems = order.items.some((item) =>
            item.productName.toLowerCase().includes(q)
          );
          if (!matchesId && !matchesName && !matchesPhone && !matchesAddress && !matchesDistrict && !matchesItems) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'highest_amount') {
          return b.totalAmount - a.totalAmount;
        }
        return 0;
      });
  }, [orders, selectedStatus, selectedPayment, searchQuery, sortBy]);

  // Status Styling Helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending Intake',
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400'
        };
      case 'processing':
        return {
          label: 'Processing / Packing',
          bg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
          dot: 'bg-blue-400'
        };
      case 'shipped':
        return {
          label: 'Shipped / In Transit',
          bg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          dot: 'bg-purple-400'
        };
      case 'delivered':
        return {
          label: 'Delivered & Completed',
          bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          dot: 'bg-rose-400'
        };
      default:
        return {
          label: status,
          bg: 'bg-neutral-800 text-neutral-300 border-neutral-700',
          dot: 'bg-neutral-400'
        };
    }
  };

  const getPaymentBadge = (method: string, status: PaymentStatus) => {
    const isPaid = status === 'paid';
    return (
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 uppercase tracking-wider ${
          isPaid
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : method === 'cod'
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-neutral-800 text-neutral-300 border-neutral-700'
        }`}
      >
        <CreditCard className="w-3 h-3" />
        <span>{method.replace('_', ' ')}</span>
        <span>•</span>
        <span>{status}</span>
      </span>
    );
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (showToast) {
      showToast(`Order ${orderId} status changed to ${newStatus.toUpperCase()}`);
    }
  };

  const handleSaveCourier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForCourierModal || !courierTrackingNo.trim()) return;
    updateOrderCourier(orderForCourierModal.id, courierName, courierTrackingNo.trim());
    // Auto advance to shipped if currently pending or processing
    if (orderForCourierModal.status === 'pending' || orderForCourierModal.status === 'processing') {
      updateOrderStatus(orderForCourierModal.id, 'shipped', `Dispatched via ${courierName} (#${courierTrackingNo.trim()})`);
    }
    if (showToast) {
      showToast(`Courier details attached to ${orderForCourierModal.id}`);
    }
    setOrderForCourierModal(null);
    setCourierTrackingNo('');
  };

  const handleCreateManualOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualFormError(null);
    if (!manualCustomerName.trim() || !manualCustomerPhone.trim() || !manualCustomerAddress.trim()) {
      const err = 'Please enter complete customer delivery information.';
      setManualFormError(err);
      if (showToast) showToast(err);
      return;
    }

    const targetProduct = products.find((p) => p.id === manualSelectedProductId) || products[0];
    if (!targetProduct) {
      const err = 'Please select a valid product.';
      setManualFormError(err);
      if (showToast) showToast(err);
      return;
    }

    const qty = Math.max(1, manualQuantity);
    const subtotal = targetProduct.price * qty;
    const deliveryFee = subtotal > 50000 ? 0 : 450;
    const totalAmount = subtotal + deliveryFee;

    const item: OrderItem = {
      productId: targetProduct.id,
      productName: targetProduct.name,
      productImage: targetProduct.images?.[0] || '',
      price: targetProduct.price,
      quantity: qty,
      totalPrice: subtotal
    };

    const newOrder: Order = {
      id: `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: manualCustomerName.trim(),
        phone: manualCustomerPhone.trim(),
        address: manualCustomerAddress.trim(),
        district: manualCustomerDistrict,
        customerType: 'regular'
      },
      items: [item],
      subtotal,
      deliveryFee,
      discountAmount: 0,
      totalAmount,
      paymentMethod: manualPaymentMethod,
      paymentStatus: manualPaymentMethod === 'cod' ? 'cod' : 'paid',
      status: 'pending',
      customerNotes: manualNotes.trim() || 'Manual order intake by sales desk.',
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'Direct manual phone/walk-in order recorded by Admin.'
        }
      ]
    };

    createManualOrder(newOrder);
    if (showToast) {
      showToast(`Manual Order ${newOrder.id} created successfully!`);
    }

    setIsManualOrderModalOpen(false);
    setManualCustomerName('');
    setManualCustomerPhone('');
    setManualCustomerAddress('');
    setManualQuantity(1);
    setManualNotes('');
  };

  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'Address',
      'District',
      'Products',
      'Total Amount (BDT)',
      'Payment Method',
      'Payment Status',
      'Order Status',
      'Courier',
      'Tracking Number'
    ];

    const rows = filteredOrders.map((ord) => [
      `"${ord.id}"`,
      `"${new Date(ord.createdAt).toLocaleDateString()}"`,
      `"${ord.customer.name.replace(/"/g, '""')}"`,
      `"${ord.customer.phone}"`,
      `"${ord.customer.address.replace(/"/g, '""')}"`,
      `"${ord.customer.district || ''}"`,
      `"${ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ').replace(/"/g, '""')}"`,
      ord.totalAmount,
      `"${ord.paymentMethod}"`,
      `"${ord.paymentStatus}"`,
      `"${ord.status}"`,
      `"${ord.courierTracking?.courierName || ''}"`,
      `"${ord.courierTracking?.trackingNumber || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `solarstock-orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintInvoice = (order: Order) => {
    setSelectedOrderForView(order);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] tracking-tight flex items-center gap-2">
                <span>Customer Orders & Invoices</span>
                {metrics.pending > 0 && (
                  <span className="bg-amber-400 text-neutral-950 text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse shadow-sm">
                    {metrics.pending} Pending
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Real-time regional order intake, dispatch fulfillment, courier tracking & official invoices
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsManualOrderModalOpen(true)}
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Manual Order</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export filtered orders as CSV file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Total Orders */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold mb-1">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {metrics.total}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">All time logged</div>
        </div>

        {/* Pending Action */}
        <div className={`border rounded-2xl p-4 ${
          metrics.pending > 0
            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
            : 'bg-neutral-900/80 border-neutral-800'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-amber-400">
            <span>Pending Intake</span>
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
          </div>
          <div className="text-2xl font-black font-['Outfit',sans-serif] text-amber-400">
            {metrics.pending}
          </div>
          <div className="text-[11px] text-amber-300/80 mt-0.5">Needs phone/stock confirm</div>
        </div>

        {/* Processing */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold mb-1">
            <span>Processing</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {metrics.processing}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Depo packing & QC</div>
        </div>

        {/* Shipped */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-semibold mb-1">
            <span>In Transit</span>
            <Truck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-['Outfit',sans-serif]">
            {metrics.shipped}
          </div>
          <div className="text-[11px] text-neutral-500 mt-0.5">Courier highway dispatch</div>
        </div>

        {/* Gross Revenue */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-emerald-950/30 to-neutral-900/80 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold mb-1">
            <span>Total Sales</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit',sans-serif]">
            ৳ {metrics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-500/80 mt-0.5">Gross order value</div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. SS-2026-8941), customer name, phone, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Payment Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Payment Methods</option>
              <option value="cod">Cash on Delivery</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
              <option value="bank_transfer">Bank Wire</option>
              <option value="emi">0% EMI</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest_amount">Highest Amount</option>
            </select>
          </div>
        </div>

        {/* Status Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 border-t border-neutral-800/60 text-xs">
          {[
            { id: 'all', label: 'All Orders', count: metrics.total },
            { id: 'pending', label: 'Pending', count: metrics.pending, alert: metrics.pending > 0 },
            { id: 'processing', label: 'Processing', count: metrics.processing },
            { id: 'shipped', label: 'Shipped', count: metrics.shipped },
            { id: 'delivered', label: 'Delivered', count: metrics.delivered },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter((o) => o.status === 'cancelled').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                selectedStatus === tab.id
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedStatus === tab.id
                    ? 'bg-neutral-950 text-amber-400'
                    : tab.alert
                    ? 'bg-amber-400 text-neutral-950 font-black'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Orders List Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto text-neutral-500">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No matching customer orders found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {searchQuery || selectedStatus !== 'all' || selectedPayment !== 'all'
              ? 'Try adjusting your search criteria or clearing filters.'
              : 'New orders placed on the storefront will appear here automatically.'}
          </p>
          {(searchQuery || selectedStatus !== 'all' || selectedPayment !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedPayment('all');
              }}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 sm:p-5 transition-all shadow-md space-y-4"
              >
                {/* Top Row: Invoice ID, Date, Status Pill, and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-3.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono font-black text-amber-400 text-sm bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>

                    <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="text-neutral-600">•</span>
                      <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${statusConfig.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                      <span>{statusConfig.label}</span>
                    </span>

                    {order.customer.customerType === 'corporate_b2b' && (
                      <span className="text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        <span>Corporate B2B</span>
                      </span>
                    )}
                  </div>

                  {/* Actions & Status Quick Selector */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* One-Click Quick Workflow Action */}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'processing')}
                        className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer hover:scale-[1.02]"
                        title="Accept order intake and move to warehouse packing"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Accept & Receive</span>
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        onClick={() => {
                          setOrderForCourierModal(order);
                          setCourierName(order.courierTracking?.courierName || 'Steadfast Courier');
                          setCourierTrackingNo(order.courierTracking?.trackingNumber || '');
                        }}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        title="Dispatch parcel via Bangladeshi Courier"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatch Courier</span>
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        title="Mark goods safely delivered to customer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Delivered</span>
                      </button>
                    )}

                    {/* Status Select */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="bg-neutral-950 border border-neutral-700 text-white rounded-xl text-xs font-semibold px-2.5 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                        title="Update order processing stage"
                      >
                        <option value="pending">Mark Pending</option>
                        <option value="processing">Mark Processing</option>
                        <option value="shipped">Mark Shipped</option>
                        <option value="delivered">Mark Delivered</option>
                        <option value="cancelled">Mark Cancelled</option>
                      </select>
                    </div>

                    {/* Courier Button */}
                    <button
                      onClick={() => {
                        setOrderForCourierModal(order);
                        setCourierName(order.courierTracking?.courierName || 'Steadfast Courier');
                        setCourierTrackingNo(order.courierTracking?.trackingNumber || '');
                      }}
                      className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Attach or edit courier tracking"
                    >
                      <Truck className="w-3.5 h-3.5 text-purple-400" />
                      <span className="hidden md:inline">Courier</span>
                    </button>

                    {/* View Invoice */}
                    <button
                      onClick={() => setSelectedOrderForView(order)}
                      className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="View full order details & invoice"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Details</span>
                    </button>

                    {/* Print Slip */}
                    <button
                      onClick={() => handlePrintInvoice(order)}
                      className="bg-neutral-950 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/80 px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Print official packing invoice"
                    >
                      <Printer className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="hidden sm:inline">Print</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setOrderToDelete(order)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete order record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Middle Grid: Customer & Delivery Info vs Items Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Customer Information (4 cols) */}
                  <div className="lg:col-span-4 bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs font-bold flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>{order.customer.name}</span>
                      </strong>
                      {order.customer.district && (
                        <span className="text-[10px] font-bold bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                          {order.customer.district}
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-neutral-400 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-neutral-500" />
                        <a
                          href={`tel:${order.customer.phone}`}
                          className="text-amber-400 hover:underline font-mono font-medium"
                        >
                          {order.customer.phone}
                        </a>
                      </div>

                      {order.customer.email && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                          <span className="truncate">{order.customer.email}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-1.5 pt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2 text-[11px] text-neutral-300">
                          {order.customer.address}
                        </span>
                      </div>
                    </div>

                    {order.customerNotes && (
                      <div className="pt-1 border-t border-neutral-850 text-[10px] text-neutral-400 italic">
                        "{order.customerNotes}"
                      </div>
                    )}
                  </div>

                  {/* Order Items List (5 cols) */}
                  <div className="lg:col-span-5 space-y-1.5">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Purchased Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
                    </div>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar pr-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-950/40 border border-neutral-800/60 text-xs"
                        >
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-10 h-10 rounded-lg object-cover bg-neutral-800 shrink-0 border border-neutral-700/60"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0">
                              <Package className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-white text-xs truncate">
                              {item.productName}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                              <span className="text-amber-400 font-bold">Qty: {item.quantity}</span>
                              <span>•</span>
                              <span>৳ {item.price.toLocaleString()} each</span>
                              {item.capacity && (
                                <>
                                  <span>•</span>
                                  <span className="text-neutral-300">{item.capacity}</span>
                                </>
                              )}
                            </div>
                            {item.carePlanName && (
                              <div className="text-[10px] text-emerald-400 font-medium">
                                + {item.carePlanName} (৳ {item.carePlanPrice?.toLocaleString()})
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-bold text-white text-xs">
                              ৳ {item.totalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Courier Status (3 cols) */}
                  <div className="lg:col-span-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-3 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span>Payment:</span>
                        {getPaymentBadge(order.paymentMethod, order.paymentStatus)}
                      </div>

                      <div className="mt-2 pt-2 border-t border-neutral-800/80 flex items-baseline justify-between">
                        <span className="text-xs text-neutral-400">Grand Total:</span>
                        <span className="text-base font-black text-amber-400 font-['Outfit',sans-serif]">
                          ৳ {order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Courier Tracking Summary if present */}
                    {order.courierTracking ? (
                      <div className="p-2 bg-purple-950/20 border border-purple-800/40 rounded-lg text-[10px] space-y-0.5">
                        <div className="flex items-center justify-between text-purple-300 font-bold">
                          <span>{order.courierTracking.courierName}</span>
                          <span className="text-purple-400">In Transit</span>
                        </div>
                        <div className="text-neutral-400 font-mono">
                          Trk: <strong className="text-white">{order.courierTracking.trackingNumber}</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] text-neutral-500 text-center italic">
                        No courier dispatched yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Detailed Order & Printable Invoice Modal */}
      {selectedOrderForView && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto text-neutral-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black">
                  <Zap className="w-6 h-6 fill-neutral-950" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-['Outfit',sans-serif]">
                    Invoice & Consignment #{selectedOrderForView.id}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    SolarStock Regional Energy Platform • Official Order Record
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForView(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Customer & Order Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              <div className="space-y-1">
                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider block">
                  Delivery Destination
                </span>
                <strong className="text-white text-sm block">
                  {selectedOrderForView.customer.name}
                </strong>
                <p className="text-neutral-300">{selectedOrderForView.customer.address}</p>
                <p className="text-neutral-400">District: {selectedOrderForView.customer.district || 'Dhaka'}</p>
                <p className="text-amber-400 font-mono font-bold">
                  Hotline Contact: {selectedOrderForView.customer.phone}
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-neutral-800 sm:pl-4">
                <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider block">
                  Order Processing Status
                </span>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-xs font-black capitalize text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md">
                    {selectedOrderForView.status}
                  </span>
                  <span className="text-neutral-400">
                    {selectedOrderForView.paymentMethod.toUpperCase()} (
                    {selectedOrderForView.paymentStatus})
                  </span>
                </div>
                <p className="text-neutral-400 text-[11px] pt-1">
                  Placed Date: {new Date(selectedOrderForView.createdAt).toLocaleString()}
                </p>
                {selectedOrderForView.courierTracking && (
                  <p className="text-purple-300 font-medium text-[11px]">
                    Courier: {selectedOrderForView.courierTracking.courierName} (
                    {selectedOrderForView.courierTracking.trackingNumber})
                  </p>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Itemized Manifest
              </span>
              <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950/60">
                <table className="w-full text-xs text-left">
                  <thead className="bg-neutral-800 text-neutral-300 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-3">Equipment</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Unit Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-200">
                    {selectedOrderForView.items.map((item, i) => (
                      <tr key={i} className="hover:bg-neutral-900/40">
                        <td className="p-3">
                          <div className="font-bold text-white">{item.productName}</div>
                          {item.capacity && (
                            <div className="text-[10px] text-neutral-400">Spec: {item.capacity}</div>
                          )}
                          {item.carePlanName && (
                            <div className="text-[10px] text-emerald-400 font-medium">
                              Includes {item.carePlanName}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-amber-400">
                          {item.quantity}
                        </td>
                        <td className="p-3 text-right font-mono text-neutral-300">
                          ৳ {item.price.toLocaleString()}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-white">
                          ৳ {item.totalPrice.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1.5 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span>Equipment Subtotal:</span>
                <span className="font-mono text-white">
                  ৳ {selectedOrderForView.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Regional Freight / Delivery:</span>
                <span className="font-mono text-white">
                  {selectedOrderForView.deliveryFee === 0
                    ? 'FREE (Subsidized)'
                    : `৳ ${selectedOrderForView.deliveryFee.toLocaleString()}`}
                </span>
              </div>
              {selectedOrderForView.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promotional / B2B Discount:</span>
                  <span className="font-mono">
                    - ৳ {selectedOrderForView.discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-black text-amber-400">
                <span>Total Amount Due:</span>
                <span className="font-['Outfit',sans-serif] text-base">
                  ৳ {selectedOrderForView.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Status History Timeline */}
            {selectedOrderForView.statusHistory && selectedOrderForView.statusHistory.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Audit & Dispatch Timeline
                </span>
                <div className="space-y-2 border-l-2 border-amber-400/40 pl-3 ml-2 text-xs">
                  {selectedOrderForView.statusHistory.map((h, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-white capitalize font-semibold">{h.status}</strong>
                        <span className="text-[10px] text-neutral-500">
                          {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                          {new Date(h.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      {h.note && <p className="text-neutral-400 text-[11px]">{h.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Warranty Notice Footer */}
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected by SolarStock Bangladesh Official 100% Genuine Equipment Guarantee</span>
              </span>
              <span className="font-mono text-neutral-500 text-[10px]">
                {brandConfig.hotlineHeader || '09613-765270'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Courier Tracking Modal */}
      {orderForCourierModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Dispatch Courier Tracking
                </h3>
              </div>
              <button
                onClick={() => setOrderForCourierModal(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-400">
              Attach logistics tracking details to Order{' '}
              <strong className="text-amber-400 font-mono">{orderForCourierModal.id}</strong> ({orderForCourierModal.customer.name}).
            </p>

            <form onSubmit={handleSaveCourier} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Courier / Logistics Partner
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Steadfast Courier">Steadfast Courier (Nationwide Express)</option>
                  <option value="Sundarban Courier Service">Sundarban Courier Service</option>
                  <option value="RedX Logistics">RedX Logistics</option>
                  <option value="Pathao Logistics">Pathao Logistics</option>
                  <option value="SA Paribahan">SA Paribahan</option>
                  <option value="SolarStock Direct Fleet">SolarStock Direct Heavy Fleet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Tracking / Consignment Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ST-DH-849201"
                  value={courierTrackingNo}
                  onChange={(e) => setCourierTrackingNo(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save & Mark Dispatched</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderForCourierModal(null)}
                  className="px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Create Manual Order Modal */}
      {isManualOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                    Record Manual / Phone Order
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Record walk-in showroom, WhatsApp, or telephone customer orders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsManualOrderModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {manualFormError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{manualFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateManualOrderSubmit} className="space-y-4">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Select Equipment / Package
                </label>
                <select
                  value={manualSelectedProductId}
                  onChange={(e) => setManualSelectedProductId(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ৳ {p.price.toLocaleString()} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={manualQuantity}
                  onChange={(e) => setManualQuantity(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariqul Anam"
                    value={manualCustomerName}
                    onChange={(e) => setManualCustomerName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712-345678"
                    value={manualCustomerPhone}
                    onChange={(e) => setManualCustomerPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House, road, area..."
                    value={manualCustomerAddress}
                    onChange={(e) => setManualCustomerAddress(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    District / Region
                  </label>
                  <select
                    value={manualCustomerDistrict}
                    onChange={(e) => setManualCustomerDistrict(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Bogura', 'Gazipur', 'Cumilla'].map(
                      (d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Payment Method
                </label>
                <select
                  value={manualPaymentMethod}
                  onChange={(e) => setManualPaymentMethod(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="bkash">bKash Merchant Pay</option>
                  <option value="nagad">Nagad Digital Pay</option>
                  <option value="bank_transfer">Bank Wire / Cheque</option>
                  <option value="emi">0% EMI Credit Card</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Order / Technician Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Walk-in customer at Motijheel showroom. Requested inverter testing before delivery."
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="submit"
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Issue Order & Generate Invoice</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsManualOrderModalOpen(false)}
                  className="px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Delete Confirmation Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Order Record?</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Are you sure you want to remove Order <strong className="text-white font-mono">{orderToDelete.id}</strong> ({orderToDelete.customer.name})?
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  deleteOrder(orderToDelete.id);
                  if (showToast) showToast(`Order ${orderToDelete.id} removed`);
                  setOrderToDelete(null);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
              <button
                onClick={() => setOrderToDelete(null)}
                className="px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold py-2 rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
