export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  images: string[];
  description: string;
  amenities: string[];
  region: 'US' | 'Africa';
}

export interface Application {
  id: string;
  propertyId: string;
  fullName: string;
  email: string;
  income: number;
  status: 'pending' | 'payment_confirmed' | 'approved' | 'rejected';
  createdAt: string;
}
