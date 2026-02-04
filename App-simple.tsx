/**
 * نسخه ساده Bootstrap از برنامه فست‌فودیو
 * طراحی ساده و تمیز با استفاده از Bootstrap 5
 */
import React, { useState, useEffect, useMemo } from 'react';
import { categories, products, branches, Branch } from './data/mockData';
import { Product, Category, CartItem } from './types';

type ViewState = 'home' | 'branches' | 'menu';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.category === selectedCategory &&
      (p.name.includes(searchQuery) || p.description.includes(searchQuery))
    );
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleBranchSelect = (branch: Branch) => {
    if (!branch.isOpen) return;
    setSelectedBranch(branch);
    setView('menu');
  };

  const goHome = () => {
    setView('home');
    setSelectedBranch(null);
  };

  const goToBranches = () => {
    setView('branches');
  };

  // View: Home Page
  if (view === 'home') {
    return (
      <div className="min-vh-100 bg-dark text-white rtl" style={{fontFamily: 'Vazirmatn'}}>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold fs-3 text-warning">FASTFOODIO</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">منو</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={goToBranches}>شعب ما</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">درباره ما</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">تماس</a>
                </li>
              </ul>
              <button onClick={goToBranches} className="btn btn-warning fw-bold rounded-pill px-4">
                سفارش آنلاین
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="position-relative vh-100 d-flex align-items-center justify-content-center overflow-hidden" style={{marginTop: '76px'}}>
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <img
              src="/images/burger-3.jpg"
              className="w-100 h-100 object-fit-cover"
              alt="Hero Burger"
              style={{opacity: 0.7}}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{opacity: 0.6}}></div>
          </div>
          <div className="position-relative text-center p-4 container">
            <h1 className="display-1 fw-bold mb-4 lh-1">
              طعم واقعی <br/> <span className="text-warning">برگر</span> دست‌ساز
            </h1>
            <p className="fs-4 text-light mb-5 lh-base fw-medium">
              ما در فست‌فودیـو فقط غذا درست نمی‌کنیم، ما برای شما خاطره‌ای خوشمزه می‌سازیم.
            </p>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <button onClick={goToBranches} className="btn btn-light btn-lg fw-bold rounded-pill px-5 py-3">
                سفارش آنلاین
              </button>
              <button className="btn btn-outline-light btn-lg fw-bold rounded-pill px-5 py-3">
                مشاهده منو
              </button>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-5 bg-secondary">
          <div className="container text-center">
            <h2 className="display-4 fw-bold mb-5">چرا فست‌فودیـو؟</h2>
            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-white border-warning h-100">
                  <div className="card-body p-4 text-center">
                    <div className="fs-1 mb-4">🥩</div>
                    <h5 className="card-title fw-bold text-warning mb-3">گوشت ۱۰۰٪ تازه</h5>
                    <p className="card-text text-muted">استفاده از بهترین قطعات گوشت گوساله تازه که به صورت روزانه آماده می‌شوند.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-white border-warning h-100">
                  <div className="card-body p-4 text-center">
                    <div className="fs-1 mb-4">🥖</div>
                    <h5 className="card-title fw-bold text-warning mb-3">نان پخت روز</h5>
                    <p className="card-text text-muted">نان‌های مخصوص فست‌فودیـو که هر صبح در نانوایی اختصاصی ما پخته می‌شوند.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="card bg-dark text-white border-warning h-100">
                  <div className="card-body p-4 text-center">
                    <div className="fs-1 mb-4">👨‍🍳</div>
                    <h5 className="card-title fw-bold text-warning mb-3">دستور پخت ویژه</h5>
                    <p className="card-text text-muted">ترکیباتی که فقط در فست‌فودیـو پیدا می‌کنید، همراه با سس‌های جادویی ما.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark py-4 border-top">
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="fs-2 fw-bold text-warning">FASTFOODIO</div>
            <div className="d-flex gap-3">
              <i className="bi bi-instagram fs-4 text-warning"></i>
              <i className="bi bi-telephone fs-4 text-warning"></i>
            </div>
            <p className="text-muted mb-0 fw-bold">© ۲۰۲۴ تمامی حقوق برای فست‌فودیـو محفوظ است.</p>
          </div>
        </footer>
      </div>
    );
  }

  // View: Branch Selection
  if (view === 'branches') {
    return (
      <div className="min-vh-100 bg-light rtl" style={{fontFamily: 'Vazirmatn'}}>
        <header className="bg-white shadow-sm sticky-top p-4 border-bottom">
          <div className="container d-flex justify-content-between align-items-center">
            <button onClick={goHome} className="btn btn-outline-secondary rounded-pill p-3">
              <i className="bi bi-arrow-right fs-5"></i>
            </button>
            <h1 className="h4 fw-bold mb-0">کجا هستید؟</h1>
            <div style={{width: '48px'}}></div>
          </div>
        </header>

        <main className="container py-5">
          <div className="text-center py-5">
            <h2 className="display-5 fw-bold mb-3 text-dark">انتخاب شعبه</h2>
            <p className="fs-5 text-muted">نزدیک‌ترین شعبه را برای سفارش آنلاین انتخاب کنید</p>
          </div>

          <div className="row g-4">
            {branches.map(branch => (
              <div key={branch.id} className="col-12 col-md-6 col-lg-4">
                <div
                  onClick={() => handleBranchSelect(branch)}
                  className={`card h-100 shadow-sm ${branch.isOpen ? 'border-warning' : 'opacity-50'} cursor-pointer`}
                  style={{cursor: 'pointer'}}
                >
                  <div className="position-relative" style={{height: '200px', overflow: 'hidden'}}>
                    <img src={branch.image} className="card-img-top h-100 object-fit-cover" alt={branch.name} />
                    {!branch.isOpen && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                        <span className="badge bg-white text-dark fs-6 fw-bold px-3 py-2 rounded-pill">بسته است</span>
                      </div>
                    )}
                    {branch.isOpen && (
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-success text-white px-3 py-2 rounded-pill">باز است</span>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{branch.name}</h5>
                    <p className="card-text text-muted small">{branch.address}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <i className="bi bi-clock"></i>
                        <span className="fw-bold small">۳۰-۴۵ دقیقه</span>
                      </div>
                      <i className={`bi bi-arrow-left fs-4 ${branch.isOpen ? 'text-warning' : 'text-muted'}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // View: Menu/Order
  return (
    <div className="min-vh-100 bg-light d-flex flex-column rtl" style={{fontFamily: 'Vazirmatn'}}>
      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={goToBranches} className="btn btn-warning rounded-pill p-3 fw-bold" style={{transform: 'rotate(15deg)'}}>
              FF
            </button>
            <div className="d-none d-sm-block">
              <h1 className="h5 fw-bold mb-0">فست‌فودیـو</h1>
              <div className="d-flex align-items-center gap-2 small text-muted">
                <i className="bi bi-geo-alt-fill text-warning"></i>
                <span>{selectedBranch?.name}</span>
                <span className="text-muted">•</span>
                <i className="bi bi-clock"></i>
                <span>۳۰-۴۵ دقیقه</span>
              </div>
            </div>
          </div>

          <div className="flex-grow-1" style={{maxWidth: '300px'}}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="چی میل داری؟"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <button onClick={() => setIsCartOpen(true)} className="btn position-relative p-3 bg-dark text-white rounded-pill">
            <i className="bi bi-cart3 fs-5"></i>
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="bg-white border-top overflow-auto" style={{whiteSpace: 'nowrap'}}>
          <div className="container-fluid px-4 py-2 d-flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn rounded-pill px-4 py-2 fw-bold flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'btn-dark text-white'
                    : 'btn-outline-secondary'
                }`}
              >
                <span className="me-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow-1 container py-5">
        {/* Promo Section */}
        <div className="card mb-5 border-0 shadow-lg overflow-hidden">
          <div className="position-relative" style={{height: '250px'}}>
            <img src="/images/promo-1.jpg" className="card-img" alt="Promo" />
            <div className="card-img-overlay d-flex align-items-center bg-dark bg-opacity-50">
              <div className="container text-white">
                <div className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold">پیشنهاد ویژه</div>
                <h2 className="h3 fw-bold mb-3">پارتی باکس ویژه آخر هفته</h2>
                <div className="d-flex align-items-center text-warning fw-bold">
                  <span className="me-2">همین حالا سفارش دهید</span>
                  <i className="bi bi-arrow-left"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white rounded-pill p-3 shadow-sm">
                <span className="fs-4">{categories.find(c => c.id === selectedCategory)?.icon}</span>
              </div>
              <h2 className="h4 fw-bold mb-0">{categories.find(c => c.id === selectedCategory)?.name}</h2>
            </div>
            <span className="badge bg-white text-dark px-4 py-2 rounded-pill shadow-sm fw-bold border">
              {filteredProducts.length} محصول
            </span>
          </div>

          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <ProductCard
                  product={product}
                  onAdd={() => addToCart(product)}
                  quantity={cart.find(i => i.id === product.id)?.quantity || 0}
                  onRemove={() => removeFromCart(product.id)}
                />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-5 bg-white rounded-4 border">
              <div className="fs-1 mb-4 text-muted">🍔</div>
              <h3 className="h5 fw-bold text-dark mb-3">اینجا چیزی نیست!</h3>
              <p className="text-muted">لطفاً کلمه دیگری را جستجو کنید</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Cart Button (Mobile) */}
      {totalItems > 0 && (
        <div className="position-fixed bottom-0 start-0 end-0 p-3 d-lg-none">
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-dark w-100 rounded-pill p-3 d-flex justify-content-between align-items-center shadow-lg"
          >
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold">{totalItems}</span>
              <span className="fw-bold">سبد خرید</span>
            </div>
            <span className="fw-bold fs-5">{cartTotal.toLocaleString()} تومان</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="position-fixed top-0 end-0 bottom-0 bg-white shadow-lg" style={{width: '400px', maxWidth: '90vw'}}>
          <div className="d-flex flex-column h-100">
            <div className="p-4 border-bottom bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <button onClick={() => setIsCartOpen(false)} className="btn btn-outline-secondary rounded-pill p-2">
                  <i className="bi bi-x-lg"></i>
                </button>
                <h3 className="h5 fw-bold mb-0">سبد خرید شما</h3>
                <span className="badge bg-dark rounded-pill px-3 py-2 fw-bold">{totalItems} مورد</span>
              </div>
            </div>

            <div className="flex-grow-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '120px', height: '120px'}}>
                    <span className="fs-1">🛒</span>
                  </div>
                  <h4 className="fw-bold mb-3">سبد خریدت خالیه!</h4>
                  <p className="text-muted">بهترین برگرهای شهر منتظر تواَن. همین حالا اولین آیتم رو اضافه کن.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body p-3">
                        <div className="row align-items-center">
                          <div className="col-3">
                            <img src={item.image} alt={item.name} className="rounded-3 w-100" style={{height: '60px', objectFit: 'cover'}} />
                          </div>
                          <div className="col-9">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title fw-bold mb-0">{item.name}</h6>
                              <span className="fw-bold text-dark">{(item.price * item.quantity).toLocaleString()} تومان</span>
                            </div>
                            <p className="card-text small text-muted mb-3">{item.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group rounded-pill overflow-hidden shadow-sm">
                                <button onClick={() => addToCart(item)} className="btn btn-outline-warning btn-sm rounded-0">
                                  <i className="bi bi-plus"></i>
                                </button>
                                <span className="btn btn-warning btn-sm fw-bold px-3">{item.quantity}</span>
                                <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger btn-sm rounded-0">
                                  <i className="bi bi-dash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-top bg-light">
                <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted fw-bold">جمع کل</span>
                    <span className="fw-bold">{cartTotal.toLocaleString()} تومان</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted fw-bold">هزینه ارسال</span>
                    <span className="text-success fw-bold">رایگان</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>قابل پرداخت</span>
                    <span>{cartTotal.toLocaleString()} تومان</span>
                  </div>
                </div>

                <button className="btn btn-dark w-100 py-3 fw-bold rounded-pill">
                  تکمیل و پرداخت نهایی
                  <i className="bi bi-arrow-left me-2"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: Product,
  onAdd: () => void,
  quantity: number,
  onRemove: () => void
}> = ({ product, onAdd, quantity, onRemove }) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="position-relative" style={{height: '200px', overflow: 'hidden'}}>
        <img src={product.image} className="card-img-top h-100 object-fit-cover" alt={product.name} />
        {quantity > 0 && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">{quantity} در سبد</span>
          </div>
        )}
      </div>

      <div className="card-body flex-grow-1">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0">{product.name}</h5>
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-star-fill text-warning"></i>
            <span className="small fw-bold text-muted">۴.۸</span>
          </div>
        </div>
        <p className="card-text text-muted small mb-4" style={{lineHeight: '1.5'}}>
          {product.description}
        </p>
      </div>

      <div className="card-footer bg-transparent border-0 pt-0">
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5">{product.price.toLocaleString()} تومان</span>

          {quantity > 0 ? (
            <div className="btn-group rounded-pill overflow-hidden shadow-sm">
              <button onClick={onAdd} className="btn btn-outline-warning btn-sm rounded-0">
                <i className="bi bi-plus"></i>
              </button>
              <span className="btn btn-warning btn-sm fw-bold px-3">{quantity}</span>
              <button onClick={onRemove} className="btn btn-outline-danger btn-sm rounded-0">
                <i className="bi bi-dash"></i>
              </button>
            </div>
          ) : (
            <button onClick={onAdd} className="btn btn-dark rounded-pill px-4 py-2 fw-bold">
              <i className="bi bi-plus fs-5"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
