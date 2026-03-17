'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StockItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  sku: string;
}

const SofaStockPage = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: 'Modern Sofa Set',
      price: '฿45,900',
      image: 'https://source-th.com/wp-content/uploads/2022/12/ATTIVO-sofa181_01-600x600.jpg',
      quantity: 12,
      sku: 'SOF-001'
    },
    {
      id: 2,
      name: 'Luxury Fabric Sofa',
      price: '฿52,500',
      image: 'https://source-th.com/wp-content/uploads/2022/12/ATTIVO-sofa181_01-600x600.jpg',
      quantity: 8,
      sku: 'SOF-002'
    },
    {
      id: 3,
      name: 'Classic Sofa Design',
      price: '฿38,900',
      image: 'https://source-th.com/wp-content/uploads/2022/12/ATTIVO-sofa181_01-600x600.jpg',
      quantity: 5,
      sku: 'SOF-003'
    },
    {
      id: 4,
      name: 'Premium Sofa Collection',
      price: '฿68,000',
      image: 'https://source-th.com/wp-content/uploads/2022/12/ATTIVO-sofa181_01-600x600.jpg',
      quantity: 3,
      sku: 'SOF-004'
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempQuantity, setTempQuantity] = useState<string>('');

  const handleIncrement = (id: number) => {
    setStockItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: number) => {
    setStockItems(prev => 
      prev.map(item => 
        item.id === id && item.quantity > 0 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const startEditing = (id: number, currentQuantity: number) => {
    setEditingId(id);
    setTempQuantity(currentQuantity.toString());
  };

  const saveQuantity = (id: number) => {
    const newQuantity = parseInt(tempQuantity);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setStockItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
    setEditingId(null);
    setTempQuantity('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTempQuantity('');
  };

  const getTotalStock = () => {
    return stockItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getLowStockCount = () => {
    return stockItems.filter(item => item.quantity < 5).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Link 
            href="/stock"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับไปหน้า Stock
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-light tracking-wider text-gray-800 mb-2">
                SOFA STOCK
              </h1>
              <p className="text-gray-600 font-light">
                จัดการสต็อกโซฟา
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-6 md:mt-0">
              <div className="bg-blue-50 px-6 py-3 rounded-lg">
                <div className="text-sm text-blue-600 font-light mb-1">สต็อกทั้งหมด</div>
                <div className="text-2xl font-light text-blue-700">{getTotalStock()}</div>
              </div>
              <div className="bg-orange-50 px-6 py-3 rounded-lg">
                <div className="text-sm text-orange-600 font-light mb-1">สินค้าใกล้หมด</div>
                <div className="text-2xl font-light text-orange-700">{getLowStockCount()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Items */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-light text-sm text-gray-600">
            <div className="col-span-1">รูปภาพ</div>
            <div className="col-span-3">ข้อมูลสินค้า</div>
            <div className="col-span-2">ราคา</div>
            <div className="col-span-2">SKU</div>
            <div className="col-span-2">จำนวน</div>
            <div className="col-span-2">จัดการ</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {stockItems.map((item) => (
              <div 
                key={item.id} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <div className="col-span-1 flex justify-center md:justify-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Product Info */}
                <div className="col-span-3 flex flex-col justify-center">
                  <h3 className="text-gray-800 font-light text-lg mb-1">{item.name}</h3>
                  <div className={`inline-flex items-center gap-2 text-sm ${
                    item.quantity < 5 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      item.quantity < 5 ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    {item.quantity < 5 ? 'สต็อกใกล้หมด' : 'สต็อกเพียงพอ'}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 flex items-center">
                  <span className="text-gray-800 font-light text-lg">{item.price}</span>
                </div>

                {/* SKU */}
                <div className="col-span-2 flex items-center">
                  <span className="text-gray-600 font-light font-mono">{item.sku}</span>
                </div>

                {/* Quantity Display/Edit */}
                <div className="col-span-2 flex items-center">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={tempQuantity}
                      onChange={(e) => setTempQuantity(e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      min="0"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-light text-gray-800">{item.quantity}</span>
                      <span className="text-sm text-gray-500">ชิ้น</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center gap-2">
                  {editingId === item.id ? (
                    <>
                      <button
                        onClick={() => saveQuantity(item.id)}
                        className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-2 bg-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        ยกเลิก
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="ลด"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                        title="เพิ่ม"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <button
                        onClick={() => startEditing(item.id, item.quantity)}
                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="แก้ไข"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SofaStockPage;