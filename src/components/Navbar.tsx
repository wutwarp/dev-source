import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            {/* You can replace this with your logo */}
            <img src="https://source-th.com/wp-content/uploads/2017/10/logo-fav.png" alt="Logo" className="h-8 w-8 mr-2" />
            <Link href="/" className="text-xl font-bold text-gray-800">
              source-th
            </Link>
          </div>

          {/* Menu Items */}
          <div className="flex items-center">
            <Link href="/about" className="text-gray-600 hover:text-blue-500 px-3 py-2">
              About
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-500 px-3 py-2">
              Product
            </Link>
            {/* Cart menu */}
            <Link
              href="/cart"
              aria-label="ตะกร้าสินค้า"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 flex items-center"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 10-8 0v4M5 8h14l-1 12H6L5 8z"
                />
              </svg>
              <span className="ml-2">ตะกร้า</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
