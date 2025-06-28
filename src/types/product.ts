export type Brand = 
  | 'SPX Gaulin'
  | 'Bertoli'
  | 'FBF Italia'
  | 'TetraPak'
  | 'Niro Sovi';

export type Category = 
  | 'Homogenizers'
  | 'Crankshaft Assemblies'
  | 'Pistons'
  | 'O-rings'
  | 'Valves'
  | 'Gaskets'
  | 'Pressure Gauges'
  | 'Hydraulic Parts';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand: Brand;
  category: Category;
  image: string;
  stock: number;
  featured?: boolean;
  specifications?: Record<string, string>;
  compatibleWith?: string[];
};