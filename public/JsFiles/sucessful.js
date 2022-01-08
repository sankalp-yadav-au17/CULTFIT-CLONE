async function deleteMycart() {

    try{
        let response = await fetch(`http://localhost:2345/mycarts/cart/deleteAll`, {

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },

        });
    } catch (err) {
        console.log("e:", err);
    }
  
  }
  
  deleteMycart()