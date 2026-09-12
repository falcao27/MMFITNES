'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Heart, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react'
import { categories, formatPrice, type Category, type Product } from '@/lib/products'

type CartLine = { product: Product; size: string; quantity: number }
type CatalogFilter = 'Todos' | Category

const heroSlides = [
  { eyebrow: 'Nova coleção · Movimento', title: 'Força que veste você.', text: 'Peças que unem conforto, presença e liberdade em cada movimento.', image: '/produtos/macacao-flow-oliva.jpg', imagePosition: 'center top' },
  { eyebrow: 'Macaquinhos · Essenciais', title: 'Seu ritmo. Suas regras.', text: 'Modelagens versáteis para treinar, viver e ir muito além.', image: '/produtos/macaquinho-pulse-vermelho.jpg', imagePosition: 'center 16%' },
]

function ProductCard({ product, favorite, onFavorite, onOpen, onAdd }: { product: Product; favorite: boolean; onFavorite: () => void; onOpen: () => void; onAdd: () => void }) {
  return <article className="product-card">
    <div className="product-image-wrap">
      <button className="product-image-button" type="button" onClick={onOpen} aria-label={`Ver detalhes de ${product.name}`}><img src={product.image} alt={product.name} className="product-image" /></button>
      <button type="button" aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`} className={`heart-button ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite}><Heart /></button>
      {product.compareAt && <span className="offer-badge">Oferta</span>}
      {product.featured && !product.compareAt && <span className="new-badge">Novo</span>}
      <button type="button" className="quick-view" onClick={onOpen}>Ver detalhes</button>
    </div>
    <div className="product-info"><p className="product-type">{product.category} · {product.color}</p><button type="button" className="product-title" onClick={onOpen}>{product.name}</button><div className="price-row"><strong>{formatPrice(product.price)}</strong>{product.compareAt && <s>{formatPrice(product.compareAt)}</s>}</div></div>
    <button type="button" className="add-button" onClick={onAdd}>Adicionar à sacola</button>
  </article>
}

export function Storefront({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>('Todos')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [slide, setSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const currentSlide = heroSlides[slide]

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('pt-BR')
    return products.filter((product) => {
      const matchesCategory = activeFilter === 'Todos' || product.category === activeFilter
      const haystack = `${product.name} ${product.category} ${product.color}`.toLocaleLowerCase('pt-BR')
      return matchesCategory && (!term || haystack.includes(term))
    })
  }, [activeFilter, products, search])

  useEffect(() => {
    const savedCart = localStorage.getItem('mmfitnes-cart')
    const savedFavorites = localStorage.getItem('mmfitnes-favorites')
    if (savedCart) try { setCart(JSON.parse(savedCart)) } catch { localStorage.removeItem('mmfitnes-cart') }
    if (savedFavorites) try { setFavorites(JSON.parse(savedFavorites)) } catch { localStorage.removeItem('mmfitnes-favorites') }
  }, [])
  useEffect(() => { localStorage.setItem('mmfitnes-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('mmfitnes-favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { document.body.style.overflow = cartOpen || selectedProduct ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [cartOpen, selectedProduct])

  function goToCatalog(filter: CatalogFilter = 'Todos') { setActiveFilter(filter); setMenuOpen(false); window.setTimeout(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }), 0) }
  function openProduct(product: Product) { setSelectedProduct(product); setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]) }
  function addToCart(product: Product, size = 'M') {
    const actualSize = product.sizes.includes(size) ? size : product.sizes[0]
    setCart((items) => { const found = items.find((item) => item.product.id === product.id && item.size === actualSize); return found ? items.map((item) => item === found ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { product, size: actualSize, quantity: 1 }] })
    setSelectedProduct(null); setCartOpen(true)
  }
  function changeQuantity(productId: string, size: string, change: number) { setCart((items) => items.map((item) => item.product.id === productId && item.size === size ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0)) }
  function removeLine(productId: string, size: string) { setCart((items) => items.filter((item) => !(item.product.id === productId && item.size === size))) }
  function toggleFavorite(productId: string) { setFavorites((items) => items.includes(productId) ? items.filter((id) => id !== productId) : [...items, productId]) }
  function checkout() {
    const lines = cart.map((item) => `• ${item.quantity}x ${item.product.name} — tam. ${item.size} (${formatPrice(item.product.price * item.quantity)})`).join('\n')
    const message = `Olá! Quero fazer este pedido na MMFitnes:\n\n${lines}\n\nTotal: ${formatPrice(cartTotal)}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  function subscribe(event: FormEvent) { event.preventDefault(); if (email.trim()) setSubscribed(true) }

  return <main>
    <div className="announcement">Frete grátis para compras acima de R$ 299 <span>·</span> Troca fácil em até 7 dias</div>
    <header className="site-header">
      <button type="button" aria-label="Abrir menu" className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <a href="#top" className="logo" aria-label="MMFitnes, início">MM<span>FITNES</span></a>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Navegação principal"><button type="button" onClick={() => goToCatalog('Todos')}>Novidades</button>{categories.map((category) => <button type="button" onClick={() => goToCatalog(category)} key={category}>{category}</button>)}</nav>
      <div className="header-actions"><button type="button" aria-label="Buscar produtos" className="icon-button" onClick={() => setSearchOpen(!searchOpen)}><Search /></button><button type="button" aria-label={`Sacola com ${cartCount} itens`} className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag /><span>{cartCount}</span></button></div>
      {searchOpen && <div className="search-panel"><Search /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="O que você está procurando?" aria-label="Pesquisar no catálogo" /><button type="button" aria-label="Fechar busca" onClick={() => { setSearchOpen(false); setSearch('') }}><X /></button></div>}
    </header>

    <section className="hero" id="top"><div className="hero-color" /><div className="hero-copy"><p className="eyebrow">{currentSlide.eyebrow}</p><h1>{currentSlide.title}</h1><p>{currentSlide.text}</p><button type="button" className="primary-cta" onClick={() => goToCatalog('Todos')}>Conhecer coleção <ArrowRight /></button></div><div className="hero-photo"><img src={currentSlide.image} alt="Mulher usando roupa fitness MMFitnes" style={{ objectPosition: currentSlide.imagePosition }} /><div className="hero-tag"><span>DROP</span><strong>01</strong></div></div><div className="slide-controls"><button type="button" aria-label="Slide anterior" onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)}><ChevronLeft /></button><span>0{slide + 1}<i />0{heroSlides.length}</span><button type="button" aria-label="Próximo slide" onClick={() => setSlide((slide + 1) % heroSlides.length)}><ChevronRight /></button></div></section>

    <section className="benefits" aria-label="Benefícios da loja"><p><strong>01</strong> Modelagens que valorizam</p><p><strong>02</strong> Conforto para todo o dia</p><p><strong>03</strong> Compra segura</p></section>

    <section className="category-section" id="colecoes"><div className="section-intro"><p className="eyebrow coral">Escolha seu movimento</p><h2>Vista sua<br /><em>melhor versão.</em></h2></div><div className="category-grid">{categories.map((category, index) => { const cover = products.find((product) => product.category === category)?.image; return <button type="button" className="category-card" onClick={() => goToCatalog(category)} key={category}><img src={cover} alt="" /><span>0{index + 1}</span><strong>{category}</strong><ArrowRight /></button> })}</div></section>

    <section className="catalog-section" id="catalogo"><div className="catalog-head"><div><p className="eyebrow coral">Coleção MM</p><h2>{activeFilter === 'Todos' ? 'Todos os produtos' : activeFilter}</h2></div><p>{filteredProducts.length} {filteredProducts.length === 1 ? 'peça' : 'peças'}</p></div><div className="filter-row" role="group" aria-label="Filtrar por categoria">{(['Todos', ...categories] as CatalogFilter[]).map((filter) => <button type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}</div>{filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard product={product} favorite={favorites.includes(product.id)} onFavorite={() => toggleFavorite(product.id)} onOpen={() => openProduct(product)} onAdd={() => addToCart(product)} key={product.id} />)}</div> : <div className="no-results"><Search /><h3>Nenhuma peça encontrada</h3><p>Tente outro termo ou veja o catálogo completo.</p><button type="button" onClick={() => { setSearch(''); setActiveFilter('Todos') }}>Limpar filtros</button></div>}</section>

    <section className="manifesto"><div><p className="eyebrow">Feita para a vida real</p><h2>Seu corpo.<br />Seu ritmo.<br /><em>Sua força.</em></h2></div><div className="manifesto-copy"><p>A gente acredita em roupas que acompanham mulheres em movimento — sem limitar, sem esconder, sem pedir licença.</p><button type="button" onClick={() => goToCatalog('Todos')}>Descobrir a coleção <ArrowRight /></button></div></section>

    <section className="newsletter"><div><p className="eyebrow coral">Fique por dentro</p><h2>Novidades<br />em primeira mão.</h2></div>{subscribed ? <div className="subscribe-success"><Check /><div><strong>Cadastro realizado!</strong><p>Você já faz parte do movimento MM.</p></div></div> : <form onSubmit={subscribe}><label htmlFor="email">Seu melhor e-mail</label><div><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@email.com" /><button type="submit" aria-label="Cadastrar e-mail"><ArrowRight /></button></div><small>Ao se cadastrar, você concorda em receber novidades da MMFitnes.</small></form>}</section>

    <footer><div><a href="#top" className="logo">MM<span>FITNES</span></a><p>Independência em movimento.</p></div><div className="footer-links"><button type="button" onClick={() => goToCatalog('Todos')}>Loja</button><a href="#colecoes">Coleções</a><a href="mailto:contato@mmfitnes.com">Contato</a></div><small>© 2026 MMFitnes. Todos os direitos reservados.</small></footer>

    {selectedProduct && <div className="modal-backdrop" onClick={() => setSelectedProduct(null)} role="presentation"><section className="product-modal" role="dialog" aria-modal="true" aria-label={`Detalhes de ${selectedProduct.name}`} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="Fechar detalhes" onClick={() => setSelectedProduct(null)}><X /></button><div className="modal-image"><img src={selectedProduct.image} alt={selectedProduct.name} /></div><div className="modal-copy"><p className="product-type">{selectedProduct.category} · {selectedProduct.color}</p><h2>{selectedProduct.name}</h2><div className="modal-price"><strong>{formatPrice(selectedProduct.price)}</strong>{selectedProduct.compareAt && <s>{formatPrice(selectedProduct.compareAt)}</s>}</div><p className="description">{selectedProduct.description}</p><div className="size-title"><span>Tamanho</span><small>Selecione uma opção</small></div><div className="size-options">{selectedProduct.sizes.map((size) => <button type="button" className={selectedSize === size ? 'active' : ''} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div><button type="button" className="modal-add" onClick={() => addToCart(selectedProduct, selectedSize)}>Adicionar à sacola <ShoppingBag /></button><div className="modal-assurance"><Check /> Compra segura e troca fácil</div></div></section></div>}

    {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)} role="presentation"><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Sua sacola" onClick={(event) => event.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow coral">Seu pedido</p><h2>Sua sacola <span>({cartCount})</span></h2></div><button type="button" aria-label="Fechar sacola" onClick={() => setCartOpen(false)}><X /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag /><h3>Sua sacola está vazia</h3><p>Encontre a peça que combina com seu movimento.</p><button type="button" onClick={() => { setCartOpen(false); goToCatalog('Todos') }}>Explorar coleção</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={`${item.product.id}-${item.size}`}><img src={item.product.image} alt={item.product.name} /><div className="cart-item-copy"><div><h3>{item.product.name}</h3><p>Cor: {item.product.color} · Tam: {item.size}</p></div><strong>{formatPrice(item.product.price * item.quantity)}</strong><div className="quantity"><button type="button" aria-label="Diminuir quantidade" onClick={() => changeQuantity(item.product.id, item.size, -1)}><Minus /></button><span>{item.quantity}</span><button type="button" aria-label="Aumentar quantidade" onClick={() => changeQuantity(item.product.id, item.size, 1)}><Plus /></button></div></div><button type="button" className="remove-item" aria-label={`Remover ${item.product.name}`} onClick={() => removeLine(item.product.id, item.size)}><Trash2 /></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><small>Frete e forma de pagamento combinados no atendimento.</small><button type="button" className="checkout-button" onClick={checkout}>Enviar pedido pelo WhatsApp <MessageCircle /></button><button type="button" className="keep-shopping" onClick={() => setCartOpen(false)}>Continuar comprando</button></div></>}</aside></div>}
  </main>
}
