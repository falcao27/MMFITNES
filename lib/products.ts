export type Category = 'Shorts' | 'Macacões' | 'Macaquinhos' | 'Conjuntos'

export type Product = {
  id: string
  name: string
  category: Category
  color: string
  price: number
  compareAt?: number
  image: string
  description: string
  sizes: string[]
  featured?: boolean
}

export const categories: Category[] = ['Shorts', 'Macacões', 'Macaquinhos', 'Conjuntos']

export const products: Product[] = [
  { id: 'short-move-off-white', name: 'Short Move Off White', category: 'Shorts', color: 'Off white', price: 89.9, compareAt: 109.9, image: '/produtos/short-move-off-white.jpg', description: 'Short de cintura alta com compressão confortável e bolsos laterais para acompanhar todos os seus movimentos.', sizes: ['P', 'M', 'G', 'GG'], featured: true },
  { id: 'short-fit-marrom', name: 'Short Fit Marrom', category: 'Shorts', color: 'Marrom', price: 79.9, image: '/produtos/short-fit-marrom.jpg', description: 'Modelagem anatômica, cintura alta e bolso lateral em uma cor neutra fácil de combinar.', sizes: ['P', 'M', 'G'] },
  { id: 'short-runner-preto', name: 'Short Runner Preto', category: 'Shorts', color: 'Preto', price: 99.9, image: '/produtos/short-runner-preto.jpg', description: 'Short duplo com camada leve, ajuste por cordão e respirabilidade para treinos de alta intensidade.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'macacao-sculpt-vinho', name: 'Macacão Sculpt Vinho', category: 'Macacões', color: 'Vinho', price: 189.9, compareAt: 219.9, image: '/produtos/macacao-sculpt-vinho.jpg', description: 'Macacão longo de alças largas, recortes estratégicos e sustentação que valoriza a silhueta.', sizes: ['P', 'M', 'G'], featured: true },
  { id: 'macacao-flow-oliva', name: 'Macacão Flow Oliva', category: 'Macacões', color: 'Verde oliva', price: 179.9, image: '/produtos/macacao-flow-oliva.jpg', description: 'Peça única longa com decote arredondado e caimento firme para unir praticidade e performance.', sizes: ['P', 'M', 'G', 'GG'], featured: true },
  { id: 'macaquinho-essential-preto', name: 'Macaquinho Essential Preto', category: 'Macaquinhos', color: 'Preto', price: 149.9, image: '/produtos/macaquinho-essential-preto.jpg', description: 'Macaquinho curto versátil, com costas vazadas e modelagem segura para treinar ou compor looks casuais.', sizes: ['P', 'M', 'G'], featured: true },
  { id: 'macaquinho-power-vermelho', name: 'Macaquinho Power Vermelho', category: 'Macaquinhos', color: 'Vermelho', price: 149.9, image: '/produtos/macaquinho-power-vermelho.jpg', description: 'Macaquinho de comprimento médio e alças finas, feito para entregar conforto com personalidade.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'macaquinho-pulse-vermelho', name: 'Macaquinho Pulse Vermelho', category: 'Macaquinhos', color: 'Vermelho', price: 159.9, compareAt: 189.9, image: '/produtos/macaquinho-pulse-vermelho.jpg', description: 'Alças finas, toque macio e corte curto para liberdade total durante o treino.', sizes: ['P', 'M', 'G'] },
  { id: 'macaquinho-pop-hearts', name: 'Macaquinho Pop Hearts', category: 'Macaquinhos', color: 'Preto estampado', price: 139.9, image: '/produtos/macaquinho-pop-hearts.webp', description: 'Estampa de corações, manga curta e detalhe frontal ajustável para um visual cheio de atitude.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'macaquinho-animal-print', name: 'Macaquinho Animal Print', category: 'Macaquinhos', color: 'Onça', price: 139.9, image: '/produtos/macaquinho-animal-print.webp', description: 'Macaquinho estampado com manga curta e amarração frontal, confortável dentro e fora da academia.', sizes: ['P', 'M', 'G', 'GG'] },
  { id: 'macaquinho-lettering-lilas', name: 'Macaquinho Lettering Lilás', category: 'Macaquinhos', color: 'Lilás estampado', price: 139.9, image: '/produtos/macaquinho-lettering-lilas.webp', description: 'Estampa lettering vibrante, manga curta e amarração frontal para um look marcante.', sizes: ['P', 'M', 'G'] },
  { id: 'macaquinho-zebra', name: 'Macaquinho Zebra', category: 'Macaquinhos', color: 'Zebra', price: 139.9, image: '/produtos/macaquinho-zebra.png', description: 'Estampa animal em tons neutros e modelagem curta para produções modernas e confortáveis.', sizes: ['P', 'M', 'G'] },
  { id: 'conjunto-move-rosa', name: 'Conjunto Move Rosa', category: 'Conjuntos', color: 'Rosa', price: 169.9, compareAt: 199.9, image: '/produtos/conjunto-move-rosa.jpg', description: 'Conjunto coordenado de camiseta ajustada e legging de cintura alta, perfeito para um look completo.', sizes: ['P', 'M', 'G', 'GG'], featured: true },
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
