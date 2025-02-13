import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

interface IMAGE_INTERFACE {
  imageUrl: string
  alt: string
}

interface FEATURES_INTERFACE {
  name: string
  value: string
}

interface PRODUCT_INTERFACE {
  _id?: string
  name: string
  price?: number
  category?: string
  description?: string
  images: IMAGE_INTERFACE
  productImages?: IMAGE_INTERFACE[]
  sizes?: string[]
  color?: string[]
  features?: FEATURES_INTERFACE[]
}

interface SearchResultsModalProps {
  products: PRODUCT_INTERFACE[]
  onClose: () => void
}

export default function DataDialog({ products, onClose }: SearchResultsModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader onClick={onClose} className="text-white" >
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {products.map((product) => (
            <Link
              onClick={onClose}
              href={`/product/${product._id}`}
              key={product._id}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img
                  src={product.images.imageUrl || "/placeholder.svg"}
                  alt={product.images.alt}
                  className="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{product.name}</h3>
                {product.price && (
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">${product.price.toFixed(2)}</p>
                )}
                {product.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{product.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}