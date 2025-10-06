import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-2xl font-bold text-gray-900">
          LendMe
        </div>
        <div className="flex gap-6 text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
            Twitter
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
            Discord
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
            GitHub
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} LendMe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
