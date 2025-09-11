import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            {/* You can replace this with your logo */}
            <svg className="h-8 w-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
