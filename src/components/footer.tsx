export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50"></div>
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Novasyra
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Designed and built by <a href="https://kayodeolowo.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Kayode Olowo</a> • © 2025 Novasyra
          </p>
          
         
        </div>
      </div>
    </footer>
  );
}