// Product data
        const products = {
            // Dining Room
            dining1: {
                name: "Scandinavian Dining Table",
                price: 899,
                description: "This elegant oak dining table features clean Scandinavian design lines with tapered legs. Perfect for intimate dinners or casual meals, the natural wood grain adds warmth to any dining space."
            },
            dining2: {
                name: "Velvet Dining Chairs (Set of 4)",
                price: 1299,
                description: "Set of four contemporary dining chairs with plush velvet upholstery and powder-coated metal legs. Available in multiple colors to match your decor."
            },

            // Living Room
            living1: {
                name: "Modular Sectional Sofa",
                price: 2499,
                description: "Modern sectional sofa with removable cushions and customizable configuration. The high-density foam and premium fabric ensure both comfort and durability."
            },
            living2: {
                name: "Geometric Coffee Table",
                price: 749,
                description: "Statement coffee table featuring tempered glass top with geometric metal base in brushed gold finish. A perfect centerpiece for your living room."
            },

            // Bedroom
            bedroom1: {
                name: "Oak Platform Bed",
                price: 1599,
                description: "Low-profile platform bed crafted from solid oak with minimalist design. Includes slats that eliminate the need for a box spring."
            },
            bedroom2: {
                name: "Modern Dresser",
                price: 1299,
                description: "Contemporary six-drawer dresser featuring smooth-gliding drawers, soft-close mechanisms, and elegant brass hardware."
            },

            // Office
            office1: {
                name: "Executive Office Chair",
                price: 649,
                description: "Premium ergonomic office chair with full-grain leather upholstery and polished aluminum frame. Adjustable height, tilt, and lumbar support for all-day comfort."
            },
            office2: {
                name: "Adjustable Standing Desk",
                price: 899,
                description: "Electric height-adjustable desk with sustainable wood finish. Smooth transition between sitting and standing positions with programmable height settings."
            },

            // Outdoor
            outdoor1: {
                name: "Patio Lounge Set",
                price: 1799,
                description: "Weather-resistant outdoor furniture set featuring powder-coated aluminum frame and UV-resistant cushions. Includes sofa, two armchairs and coffee table."
            },

            // Storage
            storage1: {
                name: "Walnut Bookcase",
                price: 599,
                description: "Open-shelf bookcase in rich walnut veneer with minimalist metal frame. Perfect for displaying books and decorative items."
            },

            // Accent
            accent1: {
                name: "Marble Console Table",
                price: 849,
                description: "Elegant entryway console table featuring genuine marble top and matte black metal frame. Slim profile perfect for narrow spaces."
            }
        };

        // Cart functionality
        let cart = [];
        let total = 0;

        // Show section and hide others
        function showSection(sectionId) {
            document.getElementById('home').style.display = sectionId === 'home' ? 'block' : 'none';
            document.getElementById('products').style.display = sectionId === 'products' ? 'block' : 'none';
            document.getElementById('product-details').style.display = sectionId === 'product-details' ? 'block' : 'none';
            document.getElementById('cart').style.display = sectionId === 'cart' ? 'block' : 'none';
            
            if (sectionId === 'home') {
                window.scrollTo(0, 0);
            }
        }

        // Show product details
        function showProductDetails(productId) {
            const product = products[productId];
            document.getElementById('detail-title').textContent = product.name;
            document.getElementById('detail-price').textContent = '$' + product.price;
            document.getElementById('detail-description').textContent = product.description;
            
            // Update add to cart button
            const addToCartBtn = document.getElementById('detail-add-to-cart');
            addToCartBtn.onclick = function() {
                addToCart(null, productId, product.name, product.price);
                showSection('cart');
            };
            
            showSection('product-details');
        }

        // Add to cart
        function addToCart(event, productId, productName, price) {
            if (event) event.stopPropagation();
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: price,
                    quantity: 1
                });
            }
            
            // Update total
            total += price;
            
            // Update cart UI
            updateCartUI();
            
            // Show cart notification
            const cartCount = document.querySelector('.cart-count');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Update cart UI
        function updateCartUI() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
                cartTotal.textContent = '0';
                return;
            }
            
            // Clear cart
            cartItemsContainer.innerHTML = '';
            
            // Add items
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd736f0d-11b9-4835-8c24-5e176bc2d3cc.png" alt="${item.name} product image" />
                    </div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-quantity">${item.quantity}</div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Update total
            cartTotal.textContent = total;
        }

        // Checkout function
        function checkout() {
            alert('Thank you for your purchase! Your order total is $' + total);
            cart = [];
            total = 0;
            updateCartUI();
            document.querySelector('.cart-count').textContent = '0';
            showSection('home');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showSection('home');
        });