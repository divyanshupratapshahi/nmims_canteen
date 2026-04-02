
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  studentName: string;
  rollNumber: string;
  email: string;
  mobile: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  paymentMethod: 'UPI' | 'Card' | 'COD';
  createdAt: string;
}

export interface TableBooking {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  persons: number;
  specialRequest?: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export type Category = 
  | 'Snacks' 
  | 'Dosa' 
  | 'Pizza' 
  | 'Chinese' 
  | 'Pasta' 
  | 'Sandwiches' 
  | 'Beverages' 
  | 'Meals' 
  | 'Fries & Extras';
