import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'SPX Gaulin Homogenizer Model 500',
    description: 'High-pressure industrial homogenizer designed for continuous operation in demanding environments. Perfect for medium to large scale production.',
    price: 75000,
    brand: 'SPX Gaulin',
    category: 'Homogenizers',
    image: 'https://images.pexels.com/photos/2996254/pexels-photo-2996254.jpeg',
    stock: 3,
    featured: true,
    specifications: {
      'Capacity': '500-3000 L/hr',
      'Max Pressure': '600 bar',
      'Power': '55 kW',
      'Weight': '1500 kg',
      'Dimensions': '2.5m x 1.2m x 1.8m'
    }
  },
  {
    id: '2',
    name: 'Bertoli Homogenizer X300',
    description: 'Compact and efficient homogenizer for small to medium production runs. Energy-efficient design with excellent reliability.',
    price: 48000,
    brand: 'Bertoli',
    category: 'Homogenizers',
    image: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg',
    stock: 5,
    featured: true,
    specifications: {
      'Capacity': '300-1500 L/hr',
      'Max Pressure': '400 bar',
      'Power': '30 kW',
      'Weight': '800 kg',
      'Dimensions': '1.8m x 1.0m x 1.5m'
    }
  },
  {
    id: '3',
    name: 'FBF Italia High Pressure Valve Assembly',
    description: 'Premium high-pressure valve assembly for homogenizers. Engineered for maximum durability and consistent performance.',
    price: 3200,
    brand: 'FBF Italia',
    category: 'Valves',
    image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg',
    stock: 12,
    specifications: {
      'Material': 'Stainless Steel 316L',
      'Max Pressure': '700 bar',
      'Connection': 'Tri-Clamp',
      'Weight': '5.2 kg'
    },
    compatibleWith: ['FBF Italia', 'SPX Gaulin', 'Bertoli']
  },
  {
    id: '4',
    name: 'TetraPak Piston Set (3-Pack)',
    description: 'Set of three precision-engineered pistons for TetraPak homogenizers. Made from wear-resistant ceramic materials.',
    price: 1850,
    brand: 'TetraPak',
    category: 'Pistons',
    image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg',
    stock: 8,
    specifications: {
      'Material': 'Ceramic',
      'Diameter': '50mm',
      'Stroke Length': '75mm',
      'Quantity': '3 pieces'
    },
    compatibleWith: ['TetraPak']
  },
  {
    id: '5',
    name: 'SPX Gaulin Crankshaft Assembly',
    description: 'Heavy-duty crankshaft assembly for SPX Gaulin homogenizers. Precision balanced for smooth operation and long service life.',
    price: 8500,
    brand: 'SPX Gaulin',
    category: 'Crankshaft Assemblies',
    image: 'https://images.pexels.com/photos/3846270/pexels-photo-3846270.jpeg',
    stock: 3,
    specifications: {
      'Material': 'Forged Steel',
      'Bearings': 'SKF Industrial',
      'Weight': '45 kg',
      'Lubrication': 'Pressurized'
    },
    compatibleWith: ['SPX Gaulin']
  },
  {
    id: '6',
    name: 'Niro Sovi O-Ring Kit',
    description: 'Complete set of high-performance O-rings for Niro Sovi homogenizers. FDA-approved materials suitable for food and pharmaceutical applications.',
    price: 450,
    brand: 'Niro Sovi',
    category: 'O-rings',
    image: 'https://images.pexels.com/photos/162568/oil-industry-pump-jack-sunset-162568.jpeg',
    stock: 25,
    specifications: {
      'Material': 'EPDM/Viton/PTFE',
      'Temperature Range': '-30°C to +200°C',
      'Certifications': 'FDA, USP Class VI',
      'Quantity': '25 pieces'
    },
    compatibleWith: ['Niro Sovi', 'Bertoli']
  },
  {
    id: '7',
    name: 'Digital Pressure Gauge 0-1000 Bar',
    description: 'High-precision digital pressure gauge for monitoring homogenizer operation. Features digital display and data logging capabilities.',
    price: 1200,
    brand: 'SPX Gaulin',
    category: 'Pressure Gauges',
    image: 'https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg',
    stock: 15,
    specifications: {
      'Range': '0-1000 bar',
      'Accuracy': '±0.5%',
      'Display': 'LCD Digital',
      'Connection': '1/2" BSP',
      'IP Rating': 'IP65'
    },
    compatibleWith: ['SPX Gaulin', 'Bertoli', 'FBF Italia', 'TetraPak', 'Niro Sovi']
  },
  {
    id: '8',
    name: 'FBF Italia Hydraulic Power Pack',
    description: 'Compact hydraulic power unit for homogenizer pressure control. Energy-efficient design with precise pressure regulation.',
    price: 5900,
    brand: 'FBF Italia',
    category: 'Hydraulic Parts',
    image: 'https://images.pexels.com/photos/2883040/pexels-photo-2883040.jpeg',
    stock: 4,
    specifications: {
      'Power': '7.5 kW',
      'Max Pressure': '250 bar',
      'Tank Capacity': '30 L',
      'Voltage': '380-400V 3Ph',
      'Noise Level': '<75 dB'
    },
    compatibleWith: ['FBF Italia']
  },
  {
    id: '9',
    name: 'Bertoli Gasket Set',
    description: 'Complete set of industrial gaskets for Bertoli homogenizers. Includes all necessary seals for a full maintenance service.',
    price: 680,
    brand: 'Bertoli',
    category: 'Gaskets',
    image: 'https://images.pexels.com/photos/10889639/pexels-photo-10889639.jpeg',
    stock: 18,
    specifications: {
      'Material': 'PTFE/Graphite/Metal',
      'Temperature Rating': 'Up to 250°C',
      'Pressure Rating': 'Up to 600 bar',
      'Quantity': '15 pieces'
    },
    compatibleWith: ['Bertoli']
  },
  {
    id: '10',
    name: 'TetraPak Homogenizer TP8000',
    description: 'State-of-the-art high capacity homogenizer for continuous production. Features advanced automation and control systems.',
    price: 120000,
    discountPrice: 105000,
    brand: 'TetraPak',
    category: 'Homogenizers',
    image: 'https://images.pexels.com/photos/4226869/pexels-photo-4226869.jpeg',
    stock: 2,
    featured: true,
    specifications: {
      'Capacity': '5000-12000 L/hr',
      'Max Pressure': '800 bar',
      'Power': '110 kW',
      'Weight': '3500 kg',
      'Dimensions': '3.2m x 1.8m x 2.1m',
      'Control System': 'PLC with Touch Screen'
    }
  }
];