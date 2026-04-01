export type SafetyStatus = "safe" | "caution" | "conflict";

export type IngredientCategory = "active" | "hydrator" | "exfoliant" | "antioxidant" | "emollient" | "spf";

export interface Ingredient {
  name: string;
  category: IngredientCategory;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  ingredients: Ingredient[];
  safety: SafetyStatus;
  category: string;
}

export interface RoutineStep {
  id: string;
  order: number;
  label: string;
  icon: string;
  productId?: string;
  connectionSafety?: SafetyStatus;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Vitamin C Brightening Serum",
    brand: "GlowLab",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Vitamin C", category: "antioxidant" },
      { name: "Hyaluronic Acid", category: "hydrator" },
      { name: "Ferulic Acid", category: "antioxidant" },
      { name: "Vitamin E", category: "antioxidant" },
    ],
    safety: "safe",
    category: "Serum",
  },
  {
    id: "2",
    name: "Retinol Night Repair Cream",
    brand: "SkinSync",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Retinol", category: "active" },
      { name: "Peptides", category: "active" },
      { name: "Squalane", category: "emollient" },
      { name: "Ceramides", category: "hydrator" },
    ],
    safety: "caution",
    category: "Moisturizer",
  },
  {
    id: "3",
    name: "AHA/BHA Clarifying Toner",
    brand: "ClearDerm",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Glycolic Acid", category: "exfoliant" },
      { name: "Salicylic Acid", category: "exfoliant" },
      { name: "Niacinamide", category: "active" },
      { name: "Witch Hazel", category: "active" },
    ],
    safety: "conflict",
    category: "Toner",
  },
  {
    id: "4",
    name: "Hydra Boost Gel Cream",
    brand: "AquaSkin",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38c5f?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Hyaluronic Acid", category: "hydrator" },
      { name: "Aloe Vera", category: "hydrator" },
      { name: "Centella Asiatica", category: "active" },
      { name: "Glycerin", category: "hydrator" },
    ],
    safety: "safe",
    category: "Moisturizer",
  },
  {
    id: "5",
    name: "Mineral Shield SPF 50",
    brand: "SunGuard",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Zinc Oxide", category: "spf" },
      { name: "Titanium Dioxide", category: "spf" },
      { name: "Vitamin E", category: "antioxidant" },
      { name: "Squalane", category: "emollient" },
    ],
    safety: "safe",
    category: "Sunscreen",
  },
  {
    id: "6",
    name: "Gentle Foam Cleanser",
    brand: "PureSkin",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=300&fit=crop",
    ingredients: [
      { name: "Ceramides", category: "hydrator" },
      { name: "Green Tea", category: "antioxidant" },
      { name: "Panthenol", category: "hydrator" },
    ],
    safety: "safe",
    category: "Cleanser",
  },
];

export const routineSteps: RoutineStep[] = [
  { id: "s1", order: 1, label: "Cleanser", icon: "droplets", productId: "6" },
  { id: "s2", order: 2, label: "Toner", icon: "flask-round", productId: "3", connectionSafety: "safe" },
  { id: "s3", order: 3, label: "Serum", icon: "sparkles", productId: "1", connectionSafety: "conflict" },
  { id: "s4", order: 4, label: "Moisturizer", icon: "cloud", productId: "2", connectionSafety: "caution" },
  { id: "s5", order: 5, label: "Sunscreen", icon: "sun", productId: "5", connectionSafety: "safe" },
];

export const ingredientConflicts: Record<string, string[]> = {
  "Retinol": ["Vitamin C", "Glycolic Acid", "Salicylic Acid", "Benzoyl Peroxide"],
  "Vitamin C": ["Retinol", "Niacinamide", "Benzoyl Peroxide"],
  "Glycolic Acid": ["Retinol", "Salicylic Acid"],
  "Salicylic Acid": ["Retinol", "Glycolic Acid"],
  "Niacinamide": ["Vitamin C"],
  "Benzoyl Peroxide": ["Retinol", "Vitamin C"],
};

export const skinTips = [
  "Always apply SPF as your last skincare step in the morning.",
  "Retinol and AHAs should not be used together — alternate nights.",
  "Vitamin C works best on clean skin before heavier layers.",
  "Hyaluronic acid locks in moisture when applied to damp skin.",
  "Niacinamide helps strengthen your skin barrier over time.",
];
