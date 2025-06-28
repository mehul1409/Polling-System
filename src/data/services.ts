export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: '1',
    title: 'On-Site Maintenance',
    description: 'Our expert technicians will visit your facility to perform maintenance, repairs, and upgrades on your homogenization equipment with minimal disruption to your operations.',
    image: 'https://images.pexels.com/photos/3760807/pexels-photo-3760807.jpeg',
    features: [
      'Emergency breakdown response within 24-48 hours',
      'Scheduled preventive maintenance visits',
      'Performance optimization and calibration',
      'Operator training and best practices',
      'Detailed service reports and recommendations'
    ]
  },
  {
    id: '2',
    title: 'Off-Site Repair & Refurbishment',
    description: 'Ship your components to our fully-equipped service center for comprehensive inspection, repair, and refurbishment to extend equipment lifespan and maintain peak performance.',
    image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg',
    features: [
      'Complete disassembly and inspection',
      'Precision cleaning and parts replacement',
      'Specialized refurbishment of critical components',
      'Performance testing and quality assurance',
      'Expedited return shipping options'
    ]
  },
  {
    id: '3',
    title: 'Annual Maintenance Contracts (AMC)',
    description: 'Secure peace of mind with our comprehensive maintenance contracts that ensure your equipment remains in optimal condition year-round with regular scheduled service.',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    features: [
      'Scheduled preventive maintenance visits',
      'Priority emergency response',
      'Discounted spare parts and labor',
      'Detailed documentation and service history',
      'Regular equipment performance reports',
      'Compliance with manufacturer specifications'
    ]
  },
  {
    id: '4',
    title: 'Spare Parts Management',
    description: 'Optimize your maintenance operations with our comprehensive spare parts service that ensures critical components are always available when you need them.',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    features: [
      'Inventory management and stocking recommendations',
      'Original and OEM-equivalent parts availability',
      'Fast global shipping and logistics',
      'Obsolescence management and alternatives',
      'Customized kits for planned maintenance'
    ]
  },
  {
    id: '5',
    title: 'Equipment Upgrades & Retrofits',
    description: 'Extend the life and improve the performance of your existing equipment with our upgrade and retrofit services that incorporate the latest technological advancements.',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    features: [
      'Control system modernization',
      'Energy efficiency improvements',
      'Capacity and pressure range extensions',
      'Safety and compliance upgrades',
      'Integration with plant automation systems'
    ]
  }
];