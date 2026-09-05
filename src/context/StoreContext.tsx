import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  BranchLocation,
  HeroBillboardConfig,
  SubBannerConfig,
  FlashSaleConfig,
  FooterConfig,
  BrandConfig,
  SitePolicy,
  HeroSlideItem,
  Slide3ShowcaseProduct,
  PeaceOfMindConfig,
  SolarCareConfig,
  BrandItem,
  FaqItem,
  BlogPost,
  SubCategoryItem
} from '../types';
import {
  PRODUCTS as INITIAL_PRODUCTS,
  CATEGORIES as INITIAL_CATEGORIES,
  BRANCHES as INITIAL_BRANCHES,
  DEFAULT_HERO_BILLBOARD,
  DEFAULT_SUB_BANNERS,
  DEFAULT_FLASH_SALE_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_BRAND_CONFIG,
  DEFAULT_POLICIES,
  DEFAULT_HERO_SLIDES,
  DEFAULT_SLIDE3_PRODUCTS,
  DEFAULT_PEACE_OF_MIND,
  DEFAULT_SOLAR_CARE,
  DEFAULT_BRANDS_LIST,
  DEFAULT_FAQS,
  DEFAULT_BLOGS
} from '../data/mockData';

export const MASTER_ADMIN_KEY = 'SS@Admin@2026#SolarSS';
export const DEFAULT_MANAGER_KEY = 'SolarStock@2026#SS';
export const DEFAULT_ADMIN_ID = 'admin@workforsolarstock.com';

interface StoreState {
  products: Product[];
  categories: Category[];
  branches: BranchLocation[];
  heroBillboard: HeroBillboardConfig;
  subBanners: SubBannerConfig;
  flashSaleConfig: FlashSaleConfig;
  footerConfig: FooterConfig;
  brandConfig: BrandConfig;
  policies: SitePolicy[];
  heroSlides: HeroSlideItem[];
  slide3Products: Slide3ShowcaseProduct[];
  peaceOfMind: PeaceOfMindConfig;
  solarCare: SolarCareConfig;
  brandsList: BrandItem[];
  faqs: FaqItem[];
  blogs: BlogPost[];
  
  isAdminOpen: boolean;
  adminRole: 'manager' | 'boss' | null;
  managerPassword: string;
  setManagerPassword: (newPw: string) => boolean;
  authenticateAdmin: (
    inputPw: string,
    inputId?: string
  ) => {
    success: boolean;
    role: 'manager' | 'boss' | null;
    isMasterKey: boolean;
    isWrongAdminPassword?: boolean;
    message?: string;
  };
  openAdmin: () => void;
  closeAdmin: () => void;
  logoutAdmin: () => void;
  
  // Product Actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFlashSale: (id: string) => void;
  toggleProductStock: (id: string) => void;
  
  // Category Actions
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  updateSubcategories: (categoryId: string, subcategories: SubCategoryItem[] | string[]) => void;
  
  // Branch Actions
  addBranch: (branch: Omit<BranchLocation, 'id'>) => BranchLocation;
  updateBranch: (id: string, updates: Partial<BranchLocation>) => void;
  deleteBranch: (id: string) => void;
  
  // Hero Slider (Slide 1 & Slide 3) Actions
  updateHeroSlide: (id: number, updates: Partial<HeroSlideItem>) => void;
  addHeroSlide: (slide: Omit<HeroSlideItem, 'id'>) => void;
  deleteHeroSlide: (id: number) => void;
  updateSlide3Product: (id: string, updates: Partial<Slide3ShowcaseProduct>) => void;
  addSlide3Product: (prod: Slide3ShowcaseProduct) => void;
  deleteSlide3Product: (id: string) => void;
  
  // Editable Sections
  updatePeaceOfMind: (updates: Partial<PeaceOfMindConfig>) => void;
  updateSolarCare: (updates: Partial<SolarCareConfig>) => void;
  
  // Brands Actions
  updateBrandItem: (idOrIndex: string | number, updates: Partial<BrandItem>) => void;
  addBrandItem: (brand: BrandItem) => void;
  deleteBrandItem: (idOrIndex: string | number) => void;
  
  // FAQs Actions & Reorder
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  deleteFaq: (id: string) => void;
  reorderFaqs: (sourceIndex: number, targetIndex: number) => void;
  
  // Blogs Actions & Reorder
  updateBlog: (id: string, updates: Partial<BlogPost>) => void;
  addBlog: (blog: Omit<BlogPost, 'id'>) => void;
  deleteBlog: (id: string) => void;
  reorderBlogs: (sourceIndex: number, targetIndex: number) => void;
  
  // Billboard & Banner Actions
  updateHeroBillboard: (updates: Partial<HeroBillboardConfig>) => void;
  updateSubBanners: (updates: Partial<SubBannerConfig>) => void;
  
  // Flash Sale Actions
  updateFlashSaleConfig: (updates: Partial<FlashSaleConfig>) => void;
  
  // Footer & Brand Actions
  updateFooterConfig: (updates: Partial<FooterConfig>) => void;
  updateBrandConfig: (updates: Partial<BrandConfig>) => void;
  
  // Policies Actions
  updatePolicy: (id: string, content: string) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'solarstock_full_store_v1';
const MANAGER_PW_KEY = 'solarstock_manager_password';

const StoreContext = createContext<StoreState | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or defaults
  const loadSavedState = () => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        return JSON.parse(item);
      }
    } catch (e) {
      console.warn('Could not load saved store state, using defaults', e);
    }
    return null;
  };

  const saved = loadSavedState();

  // Merge any new products from INITIAL_PRODUCTS into saved products if not present
  const initialProducts = (() => {
    if (!saved?.products || !Array.isArray(saved.products)) return INITIAL_PRODUCTS;
    const existingIds = new Set(saved.products.map((p: Product) => p.id));
    const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
    return [...saved.products, ...missing];
  })();

  // Ensure branches have googleMapUrl
  const initialBranches = (() => {
    if (!saved?.branches || !Array.isArray(saved.branches)) return INITIAL_BRANCHES;
    return saved.branches.map((b: BranchLocation) => {
      const match = INITIAL_BRANCHES.find((ib) => ib.id === b.id);
      return {
        ...b,
        googleMapUrl: b.googleMapUrl || match?.googleMapUrl || `https://maps.google.com/?q=${encodeURIComponent(b.address)}`
      };
    });
  })();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(saved?.categories || INITIAL_CATEGORIES);
  const [branches, setBranches] = useState<BranchLocation[]>(initialBranches);
  const [heroBillboard, setHeroBillboard] = useState<HeroBillboardConfig>(
    saved?.heroBillboard || DEFAULT_HERO_BILLBOARD
  );
  const [subBanners, setSubBanners] = useState<SubBannerConfig>(
    saved?.subBanners || DEFAULT_SUB_BANNERS
  );
  const [flashSaleConfig, setFlashSaleConfig] = useState<FlashSaleConfig>(() => {
    if (!saved?.flashSaleConfig) return DEFAULT_FLASH_SALE_CONFIG;
    return {
      ...DEFAULT_FLASH_SALE_CONFIG,
      ...saved.flashSaleConfig,
      activeProductIds: Array.isArray(saved.flashSaleConfig.activeProductIds)
        ? saved.flashSaleConfig.activeProductIds
        : DEFAULT_FLASH_SALE_CONFIG.activeProductIds
    };
  });
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(
    saved?.footerConfig || DEFAULT_FOOTER_CONFIG
  );
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(
    saved?.brandConfig || DEFAULT_BRAND_CONFIG
  );
  const [policies, setPolicies] = useState<SitePolicy[]>(
    saved?.policies || DEFAULT_POLICIES
  );
  
  // New Customizable Content Sections
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(() => {
    return (saved?.heroSlides && saved.heroSlides.length > 0) ? saved.heroSlides : DEFAULT_HERO_SLIDES;
  });
  const [slide3Products, setSlide3Products] = useState<Slide3ShowcaseProduct[]>(() => {
    return (saved?.slide3Products && saved.slide3Products.length > 0) ? saved.slide3Products : DEFAULT_SLIDE3_PRODUCTS;
  });
  const [peaceOfMind, setPeaceOfMind] = useState<PeaceOfMindConfig>(() => {
    const pom = saved?.peaceOfMind || DEFAULT_PEACE_OF_MIND;
    if (!pom.items || pom.items.length === 0) {
      return {
        ...pom,
        items: DEFAULT_PEACE_OF_MIND.items
      };
    }
    return pom;
  });
  const [solarCare, setSolarCare] = useState<SolarCareConfig>(() => {
    const sc = saved?.solarCare || DEFAULT_SOLAR_CARE;
    if (!sc.features || sc.features.length === 0) {
      return {
        ...sc,
        features: DEFAULT_SOLAR_CARE.features || [
          {
            id: 'sc-1',
            title: sc.feature1Title || 'Instant Unit Replacement',
            subtitle: sc.feature1Desc || 'Zero waiting for repair parts'
          },
          {
            id: 'sc-2',
            title: sc.feature2Title || '730 Days Surge Coverage',
            subtitle: sc.feature2Desc || 'Full lightning & grid fluctuation cover'
          }
        ]
      };
    }
    return sc;
  });
  const [brandsList, setBrandsList] = useState<BrandItem[]>(() => {
    return (saved?.brandsList && saved.brandsList.length > 0) ? saved.brandsList : DEFAULT_BRANDS_LIST;
  });
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    return (saved?.faqs && saved.faqs.length > 0) ? saved.faqs : DEFAULT_FAQS;
  });
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    return (saved?.blogs && saved.blogs.length > 0) ? saved.blogs : DEFAULT_BLOGS;
  });

  // Admin and Password States
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminRole, setAdminRoleState] = useState<'manager' | 'boss' | null>(() => {
    try {
      const saved = localStorage.getItem('solarstock_admin_role');
      if (saved === 'manager' || saved === 'boss') return saved;
    } catch {
      // Ignore storage errors
    }
    return null;
  });

  const setAdminRole = (role: 'manager' | 'boss' | null) => {
    setAdminRoleState(role);
    try {
      if (role) {
        localStorage.setItem('solarstock_admin_role', role);
      } else {
        localStorage.removeItem('solarstock_admin_role');
      }
    } catch (e) {
      console.warn('Could not persist admin role to localStorage', e);
    }
  };

  const [managerPassword, setManagerPasswordState] = useState<string>(() => {
    const savedPw = localStorage.getItem(MANAGER_PW_KEY);
    if (!savedPw || savedPw === 'admin@1234' || savedPw === '123456') {
      return DEFAULT_MANAGER_KEY; // 'SolarStock@2026#SS'
    }
    return savedPw;
  });

  // Save changes to localStorage on any state change
  useEffect(() => {
    try {
      const stateToSave = {
        products,
        categories,
        branches,
        heroBillboard,
        subBanners,
        flashSaleConfig,
        footerConfig,
        brandConfig,
        policies,
        heroSlides,
        slide3Products,
        peaceOfMind,
        solarCare,
        brandsList,
        faqs,
        blogs
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Could not save store state to localStorage', e);
    }
  }, [
    products,
    categories,
    branches,
    heroBillboard,
    subBanners,
    flashSaleConfig,
    footerConfig,
    brandConfig,
    policies,
    heroSlides,
    slide3Products,
    peaceOfMind,
    solarCare,
    brandsList,
    faqs,
    blogs
  ]);

  const authenticateAdmin = (inputPw: string, inputId?: string) => {
    let rawPw = (inputPw || '').trim();
    let rawId = (inputId || '').trim();

    // Strip accidental copy-pasted prefixes
    rawId = rawId.replace(/^(admin\s*id|id|username|email)\s*:\s*/i, '').trim();
    rawPw = rawPw.replace(/^(pass|password|key|main\s*key)\s*:\s*/i, '').trim();

    const trimmedPw = rawPw;
    const trimmedId = rawId.toLowerCase();

    // 1. Master Key check (main key: SS@Admin@2026#SolarSS)
    if (
      trimmedPw === MASTER_ADMIN_KEY ||
      rawId === MASTER_ADMIN_KEY ||
      trimmedPw.includes(MASTER_ADMIN_KEY) ||
      rawId.includes(MASTER_ADMIN_KEY)
    ) {
      setAdminRole('boss');
      return { success: true, role: 'boss' as const, isMasterKey: true };
    }

    // 2. Admin ID + Password check (id: admin@workforsolarstock.com, pass: SolarStock@2026#SS)
    const isTargetAdminId =
      trimmedId === DEFAULT_ADMIN_ID.toLowerCase() ||
      trimmedId === 'admin' ||
      trimmedId.startsWith('admin@workforsolarstock');

    const isPassValid =
      trimmedPw === managerPassword ||
      trimmedPw === DEFAULT_MANAGER_KEY;

    if (isTargetAdminId) {
      if (isPassValid) {
        setAdminRole('manager');
        return { success: true, role: 'manager' as const, isMasterKey: false };
      } else {
        // Wrong password entered for administrator ID
        return {
          success: false,
          role: null,
          isMasterKey: false,
          isWrongAdminPassword: true,
          message: `Access Denied: Incorrect password for administrator ID "${rawId}". Unauthorized access is strictly restricted.`
        };
      }
    }

    // Direct password match (grants manager access even if browser autofilled personal email in username field)
    if (isPassValid) {
      setAdminRole('manager');
      return { success: true, role: 'manager' as const, isMasterKey: false };
    }

    // Attempted admin keyword or wrong legacy keys
    if (
      trimmedPw === '123456' ||
      trimmedPw === '654321' ||
      trimmedPw === 'admin@1234'
    ) {
      return {
        success: false,
        role: null,
        isMasterKey: false,
        isWrongAdminPassword: true,
        message: 'Access Denied: The old administrative credentials have expired. Please use the current credentials.'
      };
    }

    return { success: false, role: null, isMasterKey: false };
  };

  const setManagerPassword = (newPw: string) => {
    if (!newPw || newPw.trim().length < 4) return false;
    const clean = newPw.trim();
    setManagerPasswordState(clean);
    localStorage.setItem(MANAGER_PW_KEY, clean);
    return true;
  };

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);
  const logoutAdmin = () => {
    setAdminRole(null);
    setIsAdminOpen(false);
    try {
      localStorage.removeItem('solarstock_admin_role');
    } catch {
      // Ignore
    }
  };

  // Product Methods
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = { ...productData, id };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductFlashSale = (id: string) => {
    setFlashSaleConfig((prev) => {
      const exists = prev.activeProductIds.includes(id);
      return {
        ...prev,
        activeProductIds: exists
          ? prev.activeProductIds.filter((pId) => pId !== id)
          : [...prev.activeProductIds, id]
      };
    });
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isOutOfStock: !p.isOutOfStock } : p))
    );
  };

  // Category Methods
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const slug = catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = slug || `cat-${Date.now()}`;
    const newCat: Category = { ...catData, id };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateSubcategories = (categoryId: string, subcategories: SubCategoryItem[] | string[]) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        if (Array.isArray(subcategories) && typeof subcategories[0] === 'string') {
          return {
            ...c,
            subCategories: subcategories as string[],
            subcategories: (subcategories as string[]).map((name, i) => ({
              id: `sub-${i}`,
              name,
              itemCount: 5
            }))
          };
        }
        return {
          ...c,
          subcategories: subcategories as SubCategoryItem[],
          subCategories: (subcategories as SubCategoryItem[]).map((s) => s.name)
        };
      })
    );
  };

  // Branch Methods
  const addBranch = (branchData: Omit<BranchLocation, 'id'>) => {
    const id = `branch-${Date.now()}`;
    const newBranch: BranchLocation = { ...branchData, id };
    setBranches((prev) => [...prev, newBranch]);
    return newBranch;
  };

  const updateBranch = (id: string, updates: Partial<BranchLocation>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Hero Slides (Slide 1 & Slide 3)
  const updateHeroSlide = (id: number, updates: Partial<HeroSlideItem>) => {
    setHeroSlides((prev) =>
      prev.map((slide) => (slide.id === id ? { ...slide, ...updates } : slide))
    );
  };

  const addHeroSlide = (slideData: Omit<HeroSlideItem, 'id'>) => {
    const newId = Math.max(0, ...heroSlides.map((s) => s.id)) + 1;
    setHeroSlides((prev) => [...prev, { ...slideData, id: newId }]);
  };

  const deleteHeroSlide = (id: number) => {
    setHeroSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSlide3Product = (id: string, updates: Partial<Slide3ShowcaseProduct>) => {
    setSlide3Products((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const addSlide3Product = (prod: Slide3ShowcaseProduct) => {
    setSlide3Products((prev) => [...prev, prod]);
  };

  const deleteSlide3Product = (id: string) => {
    setSlide3Products((prev) => prev.filter((p) => p.id !== id));
  };

  // Peace of Mind & Solar Care
  const updatePeaceOfMind = (updates: Partial<PeaceOfMindConfig>) => {
    setPeaceOfMind((prev) => ({ ...prev, ...updates }));
  };

  const updateSolarCare = (updates: Partial<SolarCareConfig>) => {
    setSolarCare((prev) => ({ ...prev, ...updates }));
  };

  // Brands
  const updateBrandItem = (idOrIndex: string | number, updates: Partial<BrandItem>) => {
    setBrandsList((prev) => {
      if (typeof idOrIndex === 'number') {
        const next = [...prev];
        if (next[idOrIndex]) {
          next[idOrIndex] = { ...next[idOrIndex], ...updates };
        }
        return next;
      }
      return prev.map((b, idx) => (b.id === idOrIndex || b.name === idOrIndex || `brand-${idx}` === idOrIndex ? { ...b, ...updates } : b));
    });
  };

  const addBrandItem = (brand: BrandItem) => {
    setBrandsList((prev) => [...prev, brand]);
  };

  const deleteBrandItem = (idOrIndex: string | number) => {
    setBrandsList((prev) => {
      if (typeof idOrIndex === 'number') {
        return prev.filter((_, idx) => idx !== idOrIndex);
      }
      return prev.filter((b, idx) => b.id !== idOrIndex && b.name !== idOrIndex && `brand-${idx}` !== idOrIndex);
    });
  };

  // FAQs with Reorder
  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const addFaq = (faqData: Omit<FaqItem, 'id'>) => {
    const newFaq: FaqItem = { ...faqData, id: `faq-${Date.now()}` };
    setFaqs((prev) => [...prev, newFaq]);
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const reorderFaqs = (sourceIndex: number, targetIndex: number) => {
    setFaqs((prev) => {
      if (sourceIndex < 0 || sourceIndex >= prev.length || targetIndex < 0 || targetIndex >= prev.length) {
        return prev;
      }
      const clone = [...prev];
      const [moved] = clone.splice(sourceIndex, 1);
      clone.splice(targetIndex, 0, moved);
      return clone;
    });
  };

  // Blogs with Multiple Images & Reorder
  const updateBlog = (id: string, updates: Partial<BlogPost>) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const addBlog = (blogData: Omit<BlogPost, 'id'>) => {
    const newBlog: BlogPost = { ...blogData, id: `blog-${Date.now()}` };
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const reorderBlogs = (sourceIndex: number, targetIndex: number) => {
    setBlogs((prev) => {
      if (sourceIndex < 0 || sourceIndex >= prev.length || targetIndex < 0 || targetIndex >= prev.length) {
        return prev;
      }
      const clone = [...prev];
      const [moved] = clone.splice(sourceIndex, 1);
      clone.splice(targetIndex, 0, moved);
      return clone;
    });
  };

  // Billboard & Banner Updates
  const updateHeroBillboard = (updates: Partial<HeroBillboardConfig>) => {
    setHeroBillboard((prev) => ({ ...prev, ...updates }));
  };

  const updateSubBanners = (updates: Partial<SubBannerConfig>) => {
    setSubBanners((prev) => ({ ...prev, ...updates }));
  };

  // Flash Sale Updates
  const updateFlashSaleConfig = (updates: Partial<FlashSaleConfig>) => {
    setFlashSaleConfig((prev) => ({ ...prev, ...updates }));
  };

  // Footer & Brand Updates
  const updateFooterConfig = (updates: Partial<FooterConfig>) => {
    setFooterConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateBrandConfig = (updates: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({ ...prev, ...updates }));
  };

  // Policies Updates
  const updatePolicy = (id: string, content: string) => {
    setPolicies((prev) =>
      prev.map((pol) => (pol.id === id ? { ...pol, content } : pol))
    );
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBranches(INITIAL_BRANCHES);
    setHeroBillboard(DEFAULT_HERO_BILLBOARD);
    setSubBanners(DEFAULT_SUB_BANNERS);
    setFlashSaleConfig(DEFAULT_FLASH_SALE_CONFIG);
    setFooterConfig(DEFAULT_FOOTER_CONFIG);
    setBrandConfig(DEFAULT_BRAND_CONFIG);
    setPolicies(DEFAULT_POLICIES);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setSlide3Products(DEFAULT_SLIDE3_PRODUCTS);
    setPeaceOfMind(DEFAULT_PEACE_OF_MIND);
    setSolarCare(DEFAULT_SOLAR_CARE);
    setBrandsList(DEFAULT_BRANDS_LIST);
    setFaqs(DEFAULT_FAQS);
    setBlogs(DEFAULT_BLOGS);
    setManagerPasswordState(DEFAULT_MANAGER_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MANAGER_PW_KEY);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        branches,
        heroBillboard,
        subBanners,
        flashSaleConfig,
        footerConfig,
        brandConfig,
        policies,
        heroSlides,
        slide3Products,
        peaceOfMind,
        solarCare,
        brandsList,
        faqs,
        blogs,
        isAdminOpen,
        adminRole,
        managerPassword,
        setManagerPassword,
        authenticateAdmin,
        openAdmin,
        closeAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductFlashSale,
        toggleProductStock,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSubcategories,
        addBranch,
        updateBranch,
        deleteBranch,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updateSlide3Product,
        addSlide3Product,
        deleteSlide3Product,
        updatePeaceOfMind,
        updateSolarCare,
        updateBrandItem,
        addBrandItem,
        deleteBrandItem,
        updateFaq,
        addFaq,
        deleteFaq,
        reorderFaqs,
        updateBlog,
        addBlog,
        deleteBlog,
        reorderBlogs,
        updateHeroBillboard,
        updateSubBanners,
        updateFlashSaleConfig,
        updateFooterConfig,
        updateBrandConfig,
        updatePolicy,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

