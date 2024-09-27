import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


export default function SearchProduct({ products, onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState(''); // Строка поиска
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced значение

  // Debouncing: обновляем строку поиска через 300 мс после последнего ввода
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Задержка 300 мс

    return () => {
      clearTimeout(handler); // Очищаем таймер, если пользователь продолжает ввод
    };
  }, [searchTerm]);

  // Поиск по debounced значению
  useEffect(() => {
    if (debouncedSearchTerm === '') {
      onSearchResults(products); // Если строка поиска пуста, возвращаем все продукты
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      onSearchResults(filtered); // Возвращаем отфильтрованные результаты
    }
  }, [debouncedSearchTerm, products, onSearchResults]);

  return (
    <div className="relative flex flex-1 px-10 mb-4">
      <label className="sr-only">Search</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 pl-9 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
      />
      <MagnifyingGlassIcon className="absolute left top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />


    </div>
  );
}



