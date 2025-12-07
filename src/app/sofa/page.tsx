'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const SofaProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'ATTIVO Sofa 167', price: '฿24,500.00 - ฿51,600.00 ', image: 'https://source-th.com/wp-content/uploads/2022/12/ATTIVO-sofa181_01-600x600.jpg' },
    { id: 2, name: 'BIS LD One Arm Sofa 154 L', price: '฿52,500 - ฿68,500', image: 'https://source-th.com/wp-content/uploads/2018/04/BIS-LD-One-Arm-Sofa-154L__catalogue_1_resize-600x600.jpg' },
    { id: 3, name: 'BIS Ottoman', price: '฿38,900 - ฿45,500', image: 'https://source-th.com/wp-content/uploads/2018/04/BIS-Ottoman_catalogue_1_resize-600x600.jpg' },
    { id: 4, name: 'HIDA Sangyo - SEOTO Headrest', price: '฿68,000 - ฿80,500', image: 'https://source-th.com/wp-content/uploads/2023/11/KD13HQ_%E3%82%A2%E3%83%A9%E3%83%B3BE-1-600x600.jpg' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Form states
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (productName && productPrice && productImage) {
      const newProduct: Product = {
        id: products.length + 1,
        name: productName,
        price: productPrice,
        image: productImage,
      };
      setProducts([...products, newProduct]);
      
      // Reset form
      setProductName('');
      setProductPrice('');
      setProductImage(null);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-4">
              SOFA
            </h1>
            <div className="w-24 h-0.5 bg-gray-800 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-light">
              {products.length} Products Available
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                
                <div 
                  className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>

                <div 
                  className={`absolute inset-0 border-2 border-white m-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
              </div>

              <div className="text-center">
                <h3 className="text-gray-800 text-lg font-light tracking-wide mb-2 group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-base font-light">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Products Button */}
        <div className="text-center">
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-gray-800 text-sm tracking-widest font-light hover:bg-gray-800 hover:text-white transition-all duration-300 group"
          >
            ADD PRODUCTS
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-light tracking-wider text-gray-800">
                ADD NEW PRODUCT
              </h3>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setProductName('');
                  setProductPrice('');
                  setProductImage(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Image Upload */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                  PRODUCT IMAGE
                </label>
                <div className="flex items-center gap-4">
                  <label className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    {productImage ? (
                      <img src={productImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-sm text-gray-500">Upload Image</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                  PRODUCT NAME
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors text-gray-800"
                />
              </div>

              {/* Product Price */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                  PRICE
                </label>
                <input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Enter price (e.g., ฿45,900)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors text-gray-800"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setProductName('');
                  setProductPrice('');
                  setProductImage(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 text-sm tracking-wider font-light rounded-lg hover:bg-gray-50 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddProduct}
                disabled={!productName || !productPrice || !productImage}
                className="px-6 py-2 bg-gray-800 text-white text-sm tracking-wider font-light rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD PRODUCT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SofaProductsPage;