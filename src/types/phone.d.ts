export type Phone = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type ColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export type PhoneDetail = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  description: string;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  specs: Record<string, string>;
  imageUrl: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  storage?: string;
  color?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};
