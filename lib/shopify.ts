const SHOPIFY_API_VERSION = '2026-04'

const query = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        compareAtPriceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  description: string
  productType: string
  tags: string[]
  featuredImage?: { url: string; altText?: string; width?: number; height?: number }
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  compareAtPriceRange: { minVariantPrice: { amount: string; currencyCode: string } }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token) return []

  try {
    const response = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
      body: JSON.stringify({ query, variables: { first: 20 } }),
      next: { revalidate: 60 },
    })
    if (!response.ok) return []
    const payload = await response.json()
    return payload.data?.products?.nodes ?? []
  } catch {
    return []
  }
}

export function formatPrice(amount: string, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(Number(amount))
}

export function isOffer(product: ShopifyProduct) {
  return Number(product.compareAtPriceRange.minVariantPrice.amount) > Number(product.priceRange.minVariantPrice.amount)
}

export function isPremium(product: ShopifyProduct) {
  return product.productType.toLowerCase().includes('premium') || product.tags.some((tag) => tag.toLowerCase().includes('premium'))
}
