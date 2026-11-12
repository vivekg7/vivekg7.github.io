// The story collections the films come from, in the order the filters list
// them. Keys are what a story file's `collection` holds.
export const collections = {
  panchatantra: { label: "Panchatantra", labelHi: "पंचतंत्र" },
  jataka: { label: "Jataka tales", labelHi: "जातक कथाएँ" },
  "tenali-rama": { label: "Tenali Rama", labelHi: "तेनालीराम" },
  "akbar-birbal": { label: "Akbar–Birbal", labelHi: "अकबर-बीरबल" },
  mahabharata: { label: "Mahabharata", labelHi: "महाभारत" },
  tolstoy: { label: "Leo Tolstoy", labelHi: "टॉल्स्टॉय" },
  moral: { label: "Moral stories", labelHi: "नैतिक कहानियाँ" },
} as const;

export type CollectionKey = keyof typeof collections;
