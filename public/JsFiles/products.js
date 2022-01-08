
// window.addEventListener("load",()=>{

    let category = JSON.parse(localStorage.getItem("category"));

    console.log(category);

    let a="";

    if(category[0]==="womens"){
        a="womens";
    }else if(category[0]==="men"){
        a="men";
    } else if(category[0]==="equipment"){
        a="equipment";
    } else if(category[0]==="vitamins"){
        a="vitamins";
    }else{
        a="accessories"
    }

async function showProductsForWomens(a) {
  const category=document.getElementById("category");
  category.innerText=a
  const data="womens"
    try {
        let res = await fetch(`http://localhost:2345/products/${a}`);
        // const data=
        let data = await res.json();
        showproduct(data)

    } catch (e) {
        console.log('e:', e)
    }

}

showProductsForWomens(a)



let container = document.getElementById("container")

function showproduct(data) {
    data.forEach((pr) => {
        let main_div = document.createElement("div")
        container.append(main_div)
        main_div.onclick = function () {
            addtocart(pr)

        }
        let img = document.createElement("img")
        img.src = pr.img[0]
        let brand = document.createElement("p")
        brand.textContent = pr.brand
        let name = document.createElement("p")
        name.textContent = pr.name
        // flex div
        let flex_div = document.createElement("div")
        flex_div.setAttribute("class", "flex gap-1")
        let div1 = document.createElement("div")
        let price = document.createElement("p")
        price.setAttribute("class", "text-base font-normal")
        price.textContent = "₹" + pr.price
        div1.appendChild(price)
        let div2 = document.createElement("div")
        let main_price = document.createElement("p")
        main_price.setAttribute("class", "text-xs py-1 line-through text-gray-400")
        main_price.textContent = " ₹" + pr.mainPrice
        div2.appendChild(main_price)
        let div3 = document.createElement("div")
        let discount = document.createElement("p")
        discount.setAttribute("class", "pinkC text-xs py-1")
        discount.textContent = pr.discount + "% off"
        div3.appendChild(discount)
        flex_div.append(div1, div2, div3)
        // flex div
        main_div.append(img, brand, name, flex_div)

    })
}
if (localStorage.getItem("display_product") == null) {
    localStorage.setItem("display_product", JSON.stringify([]))
}



function addtocart(pr) {

    let display_product = JSON.parse(localStorage.getItem("display_product"))
    display_product = []
    display_product.push(pr)
    localStorage.setItem("display_product", JSON.stringify(display_product))
    console.log(display_product)
    window.location = "/productdisplay"


}

// async function addtocart(pr){
//     console.log("pr:",pr);
//     data={
//         name:pr.name,
//         brand:pr.brand,
//         price:pr.price,
//         mainPrice:pr.mainPrice,
//         discount:pr.discount,
//         size:pr.size,
//         categary:pr.category,
//         img:pr.img,
//     }
//     try {
//         let response = await fetch("http://localhost:2345/checkproduct", {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {'Content-Type': 'application/json'}
//         });
//         let d = await response.json();
//         console.log("d:", d);
//     } catch (err) {
//         console.log("e:", err);
//     }  
// }


function backtohome() {
    window.location.href = "../html/home.html"
}



let mindFitBox = document.getElementById("FitImgBox")
var c = 0;
mindFitBox.addEventListener("click", () => {

    let dAB = document.getElementById("imgMf");
    c += 180;
    dAB.style.transform = `rotate(${c}deg)`;
    dAB.style.transition = " 0.2s linear";


})

let imgMf = document.getElementById("imgMf")

imgMf.addEventListener("click", () => {

    let dAB = document.getElementById("imgMf")
    c += 180
    dAB.style.transform = `rotate(${c}deg)`
    dAB.style.transition = " 0.1s linear";
})




// popUp=>
var d = 0;

function myFunction() {

    let popup = document.getElementById("myPopup");
    d++;
    if (d % 2 == 1) {
        popup.style.display = "block"

    }
    if (d % 2 == 0) {
        popup.style.display = "none"
    }


}

function myFunction() {

    let popup = document.getElementById("myPopup");
    d++;
    if (d % 2 == 1) {
        popup.style.display = "block"

    }
    if (d % 2 == 0) {
        popup.style.display = "none"
    }


}




// });   //important