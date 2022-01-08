window.addEventListener("load", () => {


    function showproduct() {

        let flex_div = document.getElementById("flex")
        let product = JSON.parse(localStorage.getItem("display_product"))
        // console.log(product)

        product.forEach((product) => {
            // grid-1
            let img_div = document.getElementById("grid1")
            let description = document.getElementById("description");
            description.innerText = product.description
            for (let i = 0; i < 5; i++) {
                let img = document.createElement("img");
                img.src = product.img[i];
                img_div.appendChild(img)
            }

            // grid-1

            // add to cart 
            let adbtn = document.getElementById("addtocart")
            let Buybtn = document.getElementById("BuyNow")
            adbtn.onclick = () => {
                addToCartBox(product)
                // showProduct();
            }

            Buybtn.onclick = () => {
                addToCartBox(product)
                // showProduct();
                setTimeout(() => {
                    window.location="/payment"
                }, 1000);
            }

            // add to cart 


            // grid-2
            let grid2 = document.getElementById("grid2")
            flex_div.append(img_div, grid2)
            let brand_name = document.getElementById("brand")
            brand_name.textContent = product.brand
            let name = document.getElementById("name")
            name.textContent = product.name
            let price_div = document.getElementById("price_div")
            let price = document.getElementById("price")
            price.textContent = "₹ " + product.price
            let original_p = document.getElementById("mainprice")
            original_p.textContent = "₹ " + product.mainPrice
            let discount = document.getElementById("discount")
            discount.textContent = product.discount + "% off"


            // grid-2
        })

    }

    showproduct()



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

    function category() {
        alert("Size Available")
        // showAlert_Msg("Size Available", "green")
    }

    function category1() {
        alert("Size Not Available Choose Another Size")
    }

    async function addToCartBox(pr) {
        // console.log("pr:", pr);
        // alert("add")
        showAlert_Msg(Product_msg,"green")
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
        } catch (err) {
            console.log("e:", err);
        }
    }



    //cart one
    function cart() {
        let a = document.getElementById("cart-div");
        console.log(a)
        let btn = document.getElementById("cart-icon");
        a.style.visibility = "visible";
        btn.onclick = () => {
            cart_null()
        };
    }

    function cart_null() {
        let a = document.getElementById("cart-div");
        console.log(a)
        a.style.visibility = "hidden";
        let btn = document.getElementById("cart-icon");
        btn.onclick = () => {
            cart()
        };
    }



    function backtohome() {
        window.location.href = "../html/home.html"
    }


    







    function showProduct() {

        let sum = 0;
        let cart_items = document.getElementById("cart-container");
        cart_items.textContent = null;
        let product_data = JSON.parse(localStorage.getItem("mens_store"));
        product_data.forEach((a) => {
            let img = document.createElement("img");
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            let f_div1 = document.createElement("div");
            let price = document.createElement("p");
            let name = document.createElement("p")
            let plus_minus = document.createElement("div")
            let add = document.createElement("div");
            let sub = document.createElement("div");
            sub.onclick = () => {
                dlt(a);
            }
            add.onclick = () => {
                addToCartBox(a)
                showProduct();
            }
            add.textContent = "+";
            sub.textContent = "-";
            plus_minus.append(add, sub);
            plus_minus.id = "plus_minus";
            img.src = a.img;

            let p = a.price;
            let p1 = "";
            for (let i = 1; i < p.length; i++) {
                p1 += p[i];
            }
            console.log(p1);
            sum += +p1;
            price.textContent = a.price;
            name.textContent = a.name;
            div1.append(img);
            div2.append(name, price, plus_minus);

            f_div1.append(div1, div2);
            f_div1.id = "f_div1"
            cart_items.append(f_div1);

        });
        let bt = document.createElement("button");
        bt.textContent = "Pay ₹" + sum;
        bt.id = "total_btn"
        cart_items.append(bt);
        bt.onclick = () => {
            let d = JSON.parse(localStorage.getItem("checklogin"));
            if (d[0] === "Logout") {
                window.location.href = "pay.html";
            } else {
                alert("Please Login");
                window.location.href = "home.html"
            }
        }
    }

    function dlt(a) {
        let r = [];
        let c = 0;
        let items = JSON.parse(localStorage.getItem("mens_store"));
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === a.name && c === 0) {
                c++;
                continue;
            } else {

                r.push(items[i]);
            }
        }

        localStorage.setItem("mens_store", JSON.stringify(r));

        showProduct()
    }




    const check_PinCode = document.getElementById("checkPinCode")
    check_PinCode.addEventListener("click", checkpincode)

    async function checkpincode() {

        let pincode = document.getElementById("pincode").value

        // let ipval = document.getElementById("ipval").value
        let res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        let data = await res.json()
        console.log(pincode)
        //  console.log(data)

        let checking = data[0].Status

        if (checking == "Success") {
          
            showAlert_Msg(DelAvailable, "green")
            //    document.getElementById("showstatus").innerHTML = "Delievery is posible on this location"
        } else {

            showAlert_Msg(DelNotAva, "red")
            //    document.getElementById("showstatus").innerHTML = "Delievery is not posible on this location"
        }
        // pincode=""
        document.getElementById("pincode").value = ""
    }






    var DelAvailable = "Delivery to this Location is Possible.";
    var DelNotAva = "! Invalid Pincode";
    var Product_msg="Product Added to cart Successfully"

    function showAlert_Msg(message, color) {
      console.log('color:', color)
      console.log('message:', message)
      
        if(color==="red"){
            // $('#mark').removeClass("priority_high");
            $('#mark').innerText="priority_high";
           $('.alert').removeClass("green greenborder");
           $('.alert').addClass("red redborder");
        }else{
            // $('#mark').innerText="done";
            $('.alert').removeClass("red redborder");
           $('.alert').addClass("green greenborder");
        }

        let msgg = document.getElementById("msg");
        // msgg.setAttribute = red;
        msgg.textContent = message;

        // function () {
            $('.alert').removeClass("hide");
            $('.alert').addClass("show");
            $('.alert').addClass("showAlert");
            setTimeout(function () {
            $('.alert').addClass("hide");
            $('.alert').removeClass("show");
            
            }, 3000) // hide automatic after 3 sec
        // }


        $('.close-btn').click(function () {
           $('.alert').addClass("hide");
           $('.alert').removeClass("show");
        });
    }




}); //important