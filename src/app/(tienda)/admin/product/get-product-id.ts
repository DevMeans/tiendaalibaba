export interface ProductById {
  id?: string; // Unique identifier for the product
  name: string; // Name of the product
  description:string; // Description of the product
  slug: string ; // SEO-friendly URL for the product
  categoryId:string ; // ID of the category the product belongs to
  images: Image[]; // Array of images associated with the product
  tags: Tag[]; // Array of tags associated with the product
}
export interface Image {
  id: string; // Unique identifier for the image
  productId: string; // ID of the product the image belongs to
  imageUrl: string; // URL of the image
}
export interface Tag {
  id: string; // Unique identifier for the tag
  productId: string; // ID of the product the tag belongs to
  tagId: string; // ID of the actual tag
}
