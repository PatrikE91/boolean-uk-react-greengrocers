import './styles/reset.css'
import './styles/index.css'

import initialStoreItems from './store-items'
import { useState } from 'react'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like? 🤔
*/

export default function App() {
  // Setup state here...
  const [store, setStore] = useState(initialStoreItems)
  
  const [cart, setCart] = useState([])

  const addToCart = item => {
    if (cart.some(e => e.id === item.id)) {
      item.quantity++
      item.price = 0.35 * item.quantity

      setCart([...cart])
    } else {
      item.quantity = 1
      setCart(current => [...current, item])
    }
    return
  }

  const increaseButton = item => {
    item.quantity++
    setCart([...cart])
    sum()
  }

  const decreseButton = item => {
    if (item.quantity === 0) {
      cart.map(element => item.id !== element.id)
      return console.log('test', cart)
    }
    item.quantity--
    setCart([...cart])
  }

  const alphabeticOrder = () => {
    const compare = (a,b) => {
      let nameA = a.name.toLowerCase()
      let nameB = b.name.toLowerCase()
      return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0
    }
    const newS = store.slice().sort(compare)
    setStore(newS)
  }

  const sum = () => {
    if (cart.length === 0) {
      return '£ 0.00'
    }

    const cartTotal = cart.reduce((currentTotal, item) => {
      const newTotal = item.price * item.quantity + currentTotal

      return newTotal
    }, 0)

    const sumTotalRounded = `£ ${Number(cartTotal).toFixed(2)}`
    console.log(sumTotalRounded)
    return sumTotalRounded
  }
  const testSum = sum()

  const fruitOnly = () => {
    setStore(initialStoreItems)
    const fruitStore = []
    store.forEach(e => (e.type === 'fruit' ? fruitStore.push(e) : e))
    setStore(fruitStore)
    return
  }

  const veOnly = () => {
    setStore(initialStoreItems)
    const fruitStore = []
    store.forEach(e => (e.type === 'vegetable' ? fruitStore.push(e) : e))
    setStore(fruitStore)
    return
  }

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <button onClick={() => setStore(initialStoreItems)}>All Items</button>
        <button onClick={() => fruitOnly()}>Fruit Only</button>
        <button onClick={() => veOnly()}>Veg Only</button>
        <button onClick={() => alphabeticOrder()}>Filter by Name</button>
        <ul className="item-list store--item-list">
          {store.map(item => {
            return (
              <li key={item.id}>
                <div className="store--item-icon">
                  <img
                    src={'/assets/icons/' + item.id + '.svg'}
                    alt={item.name}
                  />
                </div>
                <button onClick={() => addToCart(item)}>Add to cart</button>
              </li>
            )
          })}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cart.map(item => {
              return (
                <li key={item.id}>
                  <img
                    className="cart--item-icon"
                    src={'assets/icons/' + item.id + '.svg'}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <button
                    onClick={() =>
                      item.quantity <= 1 ? test(item) : decreseButton(item)
                    }
                    className="quantity-btn remove-btn center"
                  >
                    -
                  </button>
                  <span className="quantity-text center">{item.quantity}</span>
                  <button
                    onClick={() => increaseButton(item)}
                    className="quantity-btn add-btn center"
                  >
                    +
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">{testSum}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
