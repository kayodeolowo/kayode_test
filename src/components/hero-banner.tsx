'use client';

import { FaBook, FaStar, FaUsers, FaFire } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: FaBook, label: 'Books Available', value: '10M+', color: 'from-cyan-400 to-blue-500' },
    { icon: FaStar, label: 'User Reviews', value: '5M+', color: 'from-yellow-400 to-orange-500' },
    { icon: FaUsers, label: 'Active Readers', value: '2M+', color: 'from-pink-400 to-red-500' },
  ];

  return (
    <div className="relative overflow-hidden mb-12">
      <div 
        className="absolute inset-0 rounded-3xl bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: 'url(/bookbg.jpg)' }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-indigo-600/30 to-cyan-600/30 rounded-3xl"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full mb-6 backdrop-blur-sm">
            <FaFire className="text-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">Trending Now</span>
          </div> */}

          <h1 className={`text-4xl md:text-6xl font-black mb-6 transition-all duration-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Discover Your Next
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Explore millions of books across every genre. Find bestsellers, hidden gems, and personalized recommendations.
          </p>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
                  }}></div>
                  
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}