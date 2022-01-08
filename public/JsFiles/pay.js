window.addEventListener("load",()=>{



async function getCartItems() {

    try {
        let res = await fetch('http://localhost:2345/mycarts');
        let data = await res.json();
        if (data.length <= 0) {
            return
        }
        console.log(data);
        if (data.length === 0) {
            window.location.reload();
        }
        showProduct(data)

    } catch (e) {
        console.log('e:', e)
    }

}

getCartItems()

function showProduct(data) {
    let total_price = 0;
    let q=0;
    let div = document.getElementById("items");
    div.innerHTML = null
    data.forEach((a) => {

        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let div3 = document.createElement("div");
        let brand = document.createElement("p");
        let img = document.createElement("img");
        let name = document.createElement("p");
        let price = document.createElement("p");
        let quantity = document.createElement("div");
        let div4 = document.createElement("div");
        let plus = document.createElement("div");
        let minus = document.createElement("div");

        plus.id = "plus";
        minus.id = "minus";
        div4.id = "div4";
        div3.id = "div3";
        div2.id = "div2";
        div1.id = "div1";

        q=q+a.quantity;

        brand.textContent = "Brand" + ": " + a.brand;
        name.textContent = "Name: " + a.name;
        price.textContent = "Price: " + "₹" + a.price;
        quantity.textContent = a.quantity;
        img.src = a.img[0];
        plus.textContent = "+";
        minus.textContent = "-";


        plus.onclick = function () {
            quantI(a);
        }

        minus.onclick = function () {
            quantD(a);
        }

        div4.append(plus, quantity, minus);

        div2.append(img);
        div1.append(brand, name, price, div4);
        div3.append(div2, div1);
        div.append(div3);


        total_price += a.price * a.quantity;


    })



    discount_price = Math.floor(total_price * 0.15);
    pay_price = total_price - discount_price
    showPrice(total_price, discount_price, pay_price,q)
}

async function quantI(pr) {
    // console.log("pr:",pr);
    data = {
        name: pr.name,
        brand: pr.brand,
        quantity: 1,
        price: pr.price,
        mainPrice: pr.mainPrice,
        discount: pr.discount,
        size: pr.size,
        categary: pr.category,
        img: pr.img,
    }
    try {
        let response = await fetch("http://localhost:2345/mycarts", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let d = await response.json();
        console.log("d:", d);
        getCartItems()
    } catch (err) {
        console.log("e:", err);
    }
}


async function quantD(pr) {
    let id = pr._id;
    let a = pr.quantity - 1;

    if (a <= 0) {

        let response = await fetch(`http://localhost:2345/mycarts/${id}`, {

            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        });

        // getCartItems()
        window.location = "/payment";


    }

    let data = {
        quantity: a
    }

    console.log(id);

    try {
        let response = await fetch(`http://localhost:2345/mycarts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let d = await response.json();
        console.log("d:", d);
        getCartItems()
    } catch (err) {
        console.log("e:", err);
    }
}

//checkout and coupon section 
function showPrice(t, d, p,q) {
    // console.log('t,d,p:', t, d, p)
    let total_price = document.getElementById("total_price").innerText = "₹" + t;
    let discount_price = document.getElementById("dis_price").innerText = "₹" + d;
    let pay_price = document.getElementById("pay_price").innerText =p;
    let quantity = document.getElementById("quantity").innerText =q;

}

let btn=document.getElementById("CheckOut-btn");
btn.addEventListener("click",payment);

async function payment(){
    

    // location validation
    let loc_value=document.getElementById("location-btn").value

    if(loc_value===""){        
      //show validation error
        document.getElementById("error-loc").innerText = "*Please Enter address"
        setTimeout(() => {
            document.getElementById("error-loc").innerText = " "
        }, 2000)

        return
    }


    let pay_price = +document.getElementById("pay_price").innerText

    try{
        let data = await fetch("http://localhost:2345/order",{
            method:'POST',
            body:JSON.stringify({price: pay_price*100}),
            headers:{
                'Content-Type':"application/json"
            }
        });

        let info = await data.json();

        var options = {
        "key": "rzp_test_MTzmvOejm2fa4j", 
        "name": "Cult Fit",
        "image": "https://static.cure.fit/assets/images/curefit-v-man.svg",
        "order_id": info.id,
        "callback_url": "http://localhost:2345/successful",
        "theme": {
            "color": "#3399cc"
        }   
        };


        let rzp1 = new Razorpay(options);
        rzp1.open();


    }
    catch(e){
        console.log(e.message);
    }
}


//coupon section
let coupon_btn = document.getElementById("Coupon-btn")
coupon_btn.addEventListener("click", Coupon)
flag = true;

function Coupon() {

    let code = document.getElementById("coupan_code").value
    if (code === "masai30" && flag === true) {
        let new_pay_price = document.getElementById("pay_price").innerText
        new_pay_price = (pay_price - pay_price * 0.3)
        p = new_pay_price.toFixed(2);
        document.getElementById("pay_price").innerText =p;
        flag = false;
    } else if (flag === false) {
        document.getElementById("error").innerText = "This Coupon is Expired now"
        setTimeout(() => {
            document.getElementById("error").innerText = " "
        }, 2000)
    } else {
        document.getElementById("error").innerText = "! INVALID COUPON"
        setTimeout(() => {
            document.getElementById("error").innerText = " "
        }, 2000)
    }
    document.getElementById("coupan_code").value = "";
}


// });



 const location_btn = document.getElementById("location")
 const input=document.getElementById("location-btn")
 location_btn.addEventListener("click", () => {
     if(navigator.geolocation){       //if browser supported geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
     }
     else{
         input.value = "your browser not support"
     }
 })
 function onSuccess(position){
    //  console.log(position)
    let {latitude,longitude} = position.coords;
    // https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
 fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c2ab82e7d6484f4fa91f9e16e7bd159f`)
//  .then(console.log)
//   .then(response => response.json()).then(result => console.log(result))
.then(response => response.json()).then(result => {
    let alldetails = result.results[0].components;
    // console.log(alldetails)
    let{city,postcode,state,country} = alldetails
    // console.log(city,postcode,state,country)
    input.value =`${city} ${postcode}, ${state} ,${country}`
})
 }
 function onError(error){
     if(error.code == 1){
         input.value = "you denied the request"
     }
     else if(error.code == 2){
         input.value = "something went wrong"
     }
     input.setAttribute("disabled",true)
 }



})