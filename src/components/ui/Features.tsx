import React from 'react';

const features = [
  {
    title: 'Fully On-Chain',
    description: 'All transactions are transparent, verifiable, and trustless.',
    
  },
  {
    title: 'Secure Smart Contracts',
    description: 'Your funds are protected by audited Solidity smart contracts.',
   
  },
  {
    title: 'Instant Liquidity',
    description: 'Borrow or lend assets anytime without middlemen.',
   
  },
  {
    title: 'Multi-Chain Support',
    description: 'Seamless integration with Ethereum, Polygon, and other EVM networks.',
   
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Key Features</h2>
        <p className="text-gray-600 mb-12">
          Discover what makes our decentralized lending platform unique and powerful.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition-shadow duration-300 bg-gray-50"
            >
             
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
