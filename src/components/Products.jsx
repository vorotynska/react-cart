import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/cart.jsx';
import Cart from './Cart.jsx';

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [productsPerPage] = useState(8); // Количество продуктов на странице
  const { cartItems, addToCart } = useContext(CartContext);

  const toggle = () => {
    setShowModal(!showModal);
  };

  // Получение продуктов с API
  async function getProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Расчет продуктов для текущей страницы
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Изменение текущей страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-between items-center px-20 py-5 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl uppercase font-bold text-gray-900 dark:text-white mt-10 mb-10">Shop</h1>
        {!showModal && (
          <button
            className="px-4 py-2 bg-gray-800 shadow-gray-300 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Cart ({cartItems.length})
          </button>
        )}
      </div>

      {/* Отображение продуктов для текущей страницы */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 m-2 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded-md h-48 w-full object-cover"
            />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                {product.description.slice(0, 40)}...
              </p>
              <p className="mt-2 text-gray-900 dark:text-gray-200">
                ${product.price}
              </p>
            </div>
            <button
              className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <div className="flex justify-center mt-10">
        <nav>
          <ul className="flex">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
              <li key={pageNumber} className="mx-1">
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`px-4 py-2 border ${
                    currentPage === pageNumber
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-800'
                  } hover:bg-gray-700 hover:text-white focus:outline-none`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Cart showModal={showModal} toggle={toggle} />
    </div>
  );
}

/*
    
            <div className="mt-4">
              <h1 className="text-lg upperark:text-whitecase font-bold text-gray-900 d">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                {product.description.slice(0, 40)}...
              </p>
              <p className="mt-2 text-gray-900 dark:text-gray-200">
                ${product.price}
              </p>
            </div>

    
            <div className="mt-6 flex justify-between items-center">
              <button className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

      

           
   
*/