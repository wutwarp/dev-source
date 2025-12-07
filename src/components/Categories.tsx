'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Categories = () => {
  const categories: Category[] = [
    { id: 1, name: 'SOFA', image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/sofa.png', count: 45 },
    { id: 2, name: 'CHAIR', image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/chair.png', count: 32 },
    { id: 3, name: 'BED', image: 'https://www.source-th.com/wp-content/uploads/2023/12/bed.png', count: 58 },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState<string | null>(null);

  const handleCategoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        price: parseFloat(productPrice),
        image: productImage,
      };
      setProducts([...products, newProduct]);
      setProductName('');
      setProductPrice('');
      setProductImage(null);
    }
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSubmit = () => {
    // ตรงนี้จะเป็นการส่งข้อมูลไปยัง backend
    console.log({
      categoryName,
      categoryImage,
      products,
    });
    // Reset form
    setShowModal(false);
    setCategoryName('');
    setCategoryImage(null);
    setProducts([]);
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-4">
            CATEGORIES
          </h2>
          <div className="w-24 h-0.5 bg-gray-800 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Explore our curated collection of furniture and interior goods
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categoryItem = (
              <div
                key={category.id}
                className="group cursor-pointer flex flex-col items-center"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-square w-40 md:w-48 bg-gray-100 overflow-hidden rounded-full mb-6 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 rounded-full"></div>
                  
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : null}
                  </div>

                  <div 
                    className={`absolute inset-0 bg-black/30 z-20 transition-opacity duration-300 rounded-full ${
                      hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  ></div>

                  <div 
                    className={`absolute inset-0 border-2 border-white z-40 m-3 transition-opacity duration-300 rounded-full ${
                      hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  ></div>
                </div>

                <div className="text-center">
                  <h3 className="text-gray-800 text-2xl font-light tracking-widest mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                    {category.name}
                  </h3>
                  <span className="text-gray-600 text-sm font-light">
                    {category.count} Products
                  </span>
                </div>
              </div>
            );

            if (category.name === 'SOFA') {
              return <Link key={category.id} href="/sofa">{categoryItem}</Link>;
            }
            return categoryItem;
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-gray-800 text-sm tracking-widest font-light hover:bg-gray-800 hover:text-white transition-all duration-300 group"
          >
            ADD NEW CATEGORY
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-2xl font-light tracking-wider text-gray-800">
                  ADD NEW CATEGORY
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Category Image Upload */}
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                    CATEGORY IMAGE
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                      {categoryImage ? (
                        <img src={categoryImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-xs text-gray-500">Add Image</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleCategoryImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Category Name */}
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-3 tracking-wider">
                    CATEGORY NAME
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors text-gray-900 font-light"
                  />
                </div>

                {/* Products Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-light text-gray-800 mb-4 tracking-wider">
                    ADD PRODUCTS
                  </h4>

                  {/* Product Form */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Product Image */}
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">
                          Product Image
                        </label>
                        <label className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                          {productImage ? (
                            <img src={productImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <>
                              <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <span className="text-xs text-gray-500">Upload</span>
                            </>
                          )}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleProductImageUpload}
                          />
                        </label>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="Enter product name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors text-gray-800 font-light"
                        />
                      </div>

                      {/* Product Price */}
                      <div>
                        <label className="block text-xs font-light text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          placeholder="Enter price"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 transition-colors text-gray-800 font-light"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleAddProduct}
                      className="w-full py-2 bg-gray-800 text-white text-sm tracking-wider font-light rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      ADD PRODUCT
                    </button>
                  </div>

                  {/* Products List */}
                  {products.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-light text-gray-700 mb-3">Products Added ({products.length})</h5>
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <p className="font-light text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.price}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 text-sm tracking-wider font-light rounded-lg hover:bg-gray-50 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-gray-800 text-white text-sm tracking-wider font-light rounded-lg hover:bg-gray-700 transition-colors"
                >
                  SAVE CATEGORY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;