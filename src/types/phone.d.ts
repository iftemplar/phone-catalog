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
