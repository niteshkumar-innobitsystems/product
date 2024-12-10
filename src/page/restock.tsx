import React, { useState, useEffect, useRef } from 'react';
import Nav from './components/navbar';
import Style from '../css/restock.module.css';  // Import the CSS module

interface Item {
  productName: string;
  category: string;
  price: number;
  quantity:number;
  availability: string;
  productDescription?: string;
  sku?: string;
  brand?: string;
  color?: string;
  size?: string;
  material?: string;
  discount?: string;
  rating?: number;
}

const StockPage: React.FC = () => {
  // State for item properties
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    quantity:'',
    availability: '',
    productDescription: '',
    sku: '',
    brand: '',
    color: '',
    size: '',
    material: '',
    discount: '',
    rating: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [items, setItems] = useState<Item[]>([]);

  // Refs for form inputs to allow focusing
  const inputRefs = {
    productName: useRef<HTMLInputElement>(null),
    category: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
    availability: useRef<HTMLSelectElement>(null)
  };

  // Load existing items from localStorage when the page is loaded
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('itemList') || '[]');
    setItems(storedItems);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validation
    let newErrors = { ...errors };
    if (value === '') {
      newErrors[field] = `${field} is required`;
    } else {
      newErrors[field] = '';
    }

    if (field === 'price' && isNaN(Number(value))) {
      newErrors.price = 'Price must be a valid number';
    }
    if (field === 'quantity' && isNaN(Number(value))) {
      newErrors.price = 'Quantity must be a valid number';
    }
    if (field === 'discount' && isNaN(Number(value))) {
      newErrors.discount = 'Discount must be a valid number';
    }
    if (field === 'rating' && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 5)) {
      newErrors.rating = 'Rating must be a number between 0 and 5';
    }
    
    setErrors(newErrors);
  };

  const handleAddItem = () => {
    if (Object.values(errors).some(err => err !== '') || !formData.productName || !formData.category || !formData.price || !formData.availability) {
      if (!formData.productName) inputRefs.productName.current?.focus();
      else if (!formData.category) inputRefs.category.current?.focus();
      else if (!formData.price) inputRefs.price.current?.focus();
      else if (!formData.availability) inputRefs.availability.current?.focus();
      else if (!formData.quantity) inputRefs.quantity.current?.focus();
      
      return;
    }

    const newItem: Item = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseFloat(formData.price),
      rating: formData.rating ? parseFloat(formData.rating) : undefined
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));

    // Reset form fields
    setFormData({
      productName: '',
      category: '',
      price: '',
      quantity:'',
      availability: '',
      productDescription: '',
      sku: '',
      brand: '',
      color: '',
      size: '',
      material: '',
      discount: '',
      rating: ''
    });
  };

  return (
    <div>
      <Nav />
      <section className={Style.stockPage}>
        <div className={Style.formContainer}>
          <h2>Manage Stock</h2>
          <form>
            {/* Product Name */}
            <div className={Style.formGroup}>
              <label>Product Name:</label>
              <input
                ref={inputRefs.productName}
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="Enter product name" required
              />
              {errors.productName && <span className={Style.error}>{errors.productName}</span>}
            </div>

            {/* Category */}
            <div className={Style.formGroup}>
              <label>Category:</label>
              <input
                ref={inputRefs.category}
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="Enter category" required
              />
              {errors.category && <span className={Style.error}>{errors.category}</span>}
            </div>

            {/* Price */}
            <div className={Style.formGroup}>
              <label>Price:</label>
              <input
                ref={inputRefs.price}
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Enter price" required
              />
              {errors.price && <span className={Style.error}>{errors.price}</span>}
            </div>
            <div className={Style.formGroup}>
              <label>Quantity:</label>
              <input
                ref={inputRefs.quantity}
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="Enter Quantity" required
              />
              {errors.quantity && <span className={Style.error}>{errors.quantity}</span>}
            </div>

            {/* Availability */}
            <div className={Style.formGroup}>
              <label>Availability:</label>
              <select
                ref={inputRefs.availability}
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              >
                <option value="">Select Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              {errors.availability && <span className={Style.error}>{errors.availability}</span>}
            </div>

            {/* Optional Fields */}
            <div className={Style.formGroup}>
              <label>Product Description:</label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => handleInputChange('productDescription', e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            {/* Other fields */}
            <div className={Style.formGroup}>
              <label>SKU:</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Enter SKU"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Brand:</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Enter brand"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Color:</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="Enter color"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Size:</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                placeholder="Enter size"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Material:</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                placeholder="Enter material"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Discount:</label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                placeholder="Enter discount"
              />
            </div>

            <div className={Style.formGroup}>
              <label>Rating (0-5):</label>
              <input
                type="text"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                placeholder="Enter rating (0-5)"
              />
              {errors.rating && <span className={Style.error}>{errors.rating}</span>}
            </div>

            <button type="button" className={Style.submitBtn} onClick={handleAddItem}>Add Item</button>
          </form>
        </div>

        <div className={Style.stockList}>
          <h3>Current Stock:</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4}>No items in stock.</td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>₹{item.price}</td>
                    <td>{item.availability}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default StockPage;
