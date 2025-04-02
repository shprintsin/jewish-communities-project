'use client';
import data from './gazzeter.json'
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

export default function GazzeterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gazetteerData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [copiedId, setCopiedId] = useState(null);

  const fuse = useMemo(() => {
    const options = {
      keys: ['name', 'District', 'region'],
      threshold: 0.3,
      includeScore: true,
    };
    return new Fuse(gazetteerData, options);
  }, [gazetteerData]);

  const searchResults = useMemo(() => {
    if (!searchQuery) return gazetteerData.map(item => ({ item, matches: null }));
    return fuse.search(searchQuery).map(result => ({
      item: result.item,
      matches: result.matches
    }));
  }, [searchQuery, fuse, gazetteerData]);

  // Helper function to highlight text
  const highlightText = (text, matches) => {
    if (!matches || !searchQuery) return text;
    
    const match = matches.find(m => m.key === 'name' || m.key === 'District' || m.key === 'region');
    if (!match) return text;
    
    const indices = match.indices;
    let result = '';
    let lastIndex = 0;
    
    indices.forEach(([start, end]) => {
      result += text.slice(lastIndex, start);
      result += `<mark class="bg-yellow-200 dark:bg-yellow-800">${text.slice(start, end + 1)}</mark>`;
      lastIndex = end + 1;
    });
    
    result += text.slice(lastIndex);
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Pagination logic
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyToClipboard = (location) => {
    const text = `שם: ${location.name}
מחוז: ${location.District}
אזור: ${location.region}
קואורדינטות: ${location.geometry}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(`${location.name}-${location.District}`);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              חיפוש קהילות
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
גזטר היסטורי של יישובים
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="חיפוש לפי שם, מחוז או אזור..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 text-lg rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">פריטים בעמוד</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    שם
                  </th>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    מחוז
                  </th>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    אזור
                  </th>
                  <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    קואורדינטות
                  </th>
                  <th className="w-16 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedResults.map(({ item: location, matches }) => (
                  <tr key={`${location.name}-${location.District}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white text-right truncate">
                      {highlightText(location.name, matches)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-right truncate">
                      {highlightText(location.District, matches)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-right truncate">
                      {highlightText(location.region, matches)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-right truncate">
                      {location.geometry}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <button
                        onClick={() => copyToClipboard(location)}
                        className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors relative group"
                        title="העתק ללוח"
                      >
                        {copiedId === `${location.name}-${location.District}` ? (
                          <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500 animate-fade-in" />
                        ) : (
                          <ClipboardDocumentIcon className="h-5 w-5" />
                        )}
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          העתק ללוח
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                הקודם
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                הבא
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  מציג <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> עד{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, searchResults.length)}
                  </span>{' '}
                  מתוך <span className="font-medium">{searchResults.length}</span> תוצאות
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 