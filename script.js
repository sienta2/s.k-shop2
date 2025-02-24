document.getElementById("menu-toggle").addEventListener("click", function() {
    let menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// 商品データ生成
let products = [];
function generateProducts(count) {
    for (let i = 0; i < count; i++) {
        let version = Math.floor(Math.random() * 100000) + 1;
        let price = Math.floor(Math.random() * 5000) + 100;
        let isSale = Math.random() < 0.3;
        let isRecommended = Math.random() < 0.5;
        
        products.push({
            name: `商品 ${version}`,
            price: price,
            salePrice: isSale ? Math.floor(price * 0.7) : price,
            version: version,
            isSale: isSale,
            isRecommended: isRecommended
        });
    }
}

// 100個生成（無限スクロールで増やす）
generateProducts(100);
displayProducts();

// 商品を表示する関数
function displayProducts() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        let item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `
            <h3>${product.name} (ver.${product.version})</h3>
            <p>価格: ￥${product.isSale ? `<del>${product.price}</del> → ￥${product.salePrice}` : product.price}</p>
            ${product.isSale ? '<span class="tag sale">セール</span>' : ""}
            ${product.isRecommended ? '<span class="tag recommend">おすすめ</span>' : ""}
            <button class="buy-button" onclick="showThanks()">購入</button>
        `;
        productList.appendChild(item);
    });
}

// 検索機能
function filterProducts() {
    let query = document.getElementById("search-bar").value.toLowerCase();
    let filtered = products.filter(product => product.name.toLowerCase().includes(query));
    displayFilteredProducts(filtered);
}

function displayFilteredProducts(filteredProducts) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        let item = document.createElement("div");
        item.className = "product-item";
        item.innerHTML = `
            <h3>${product.name} (ver.${product.version})</h3>
            <p>価格: ￥${product.isSale ? `<del>${product.price}</del> → ￥${product.salePrice}` : product.price}</p>
            ${product.isSale ? '<span class="tag sale">セール</span>' : ""}
            ${product.isRecommended ? '<span class="tag recommend">おすすめ</span>' : ""}
            <button class="buy-button" onclick="showThanks()">購入</button>
        `;
        productList.appendChild(item);
    });
}

// 無限スクロール
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        generateProducts(50);
        displayProducts();
    }
});

// ありがとうエフェクト
function showThanks() {
    let thanksEffect = document.getElementById("thanks-effect");
    thanksEffect.style.display = "block";
    setTimeout(() => {
        thanksEffect.style.display = "none";
    }, 1000);
}
