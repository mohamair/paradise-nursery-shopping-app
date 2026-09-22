import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedNodes, setAddedNodes] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Natural air humidifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/17/rubber-plant-4850669_1280.jpg", description: "Purifies air effectively.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/12/aloe-vera-3284620_1280.jpg", description: "Soothes skin & purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828841_1280.jpg", description: "Calming scent.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/01/18/18/01/jasmine-3090906_1280.jpg", description: "Sweet aroma.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herb.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/17/31/mint-1162982_1280.jpg", description: "Refreshing scent.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/08/07/14/02/eucalyptus-2604160_1280.jpg", description: "Clarifying scent.", cost: "$22" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/28/12/23/lemon-balm-2350849_1280.jpg", description: "Citrusy aroma.", cost: "$14" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/29/14/12/zz-plant-5961183_1280.jpg", description: "Thrives on neglect.", cost: "$25" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/18/18/19/plant-5187889_1280.jpg", description: "Extremely durable.", cost: "$22" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816941_1280.jpg", description: "Fast grower.", cost: "$12" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/jade-plant-1846162_1280.jpg", description: "Succulent classic.", cost: "$15" },
        { name: "Succulent", image: "https://cdn.pixabay.com/photo/2016/11/29/08/42/succulent-1868482_1280.jpg", description: "Requires minimal water.", cost: "$8" },
        { name: "Ponytail Palm", image: "https://cdn.pixabay.com/photo/2020/03/02/16/32/palm-4896200_1280.jpg", description: "Unique trunk.", cost: "$28" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedNodes({ ...addedNodes, [plant.name]: true });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            Cart 🛒 ({totalCartCount})
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, plantIdx) => (
                  <div key={plantIdx} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={addedNodes[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedNodes[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;