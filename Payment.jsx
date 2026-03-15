import { useState } from "react";  // 'useState' to manage state in functional components
import { useNavigate } from "react-router-dom";  // 'useNavigate' to handle navigation between pages

function Payment() {
    // State variables to store the account number and amount to be deposited
    const [product, setProduct] = useState("");  
    const [sku, setSku] = useState("");  
    const [amount, setAmount] = useState("");  
    const [currency, setCurrency] = useState("");  
    const [quantity, setQuantity] = useState("");  
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const res = await fetch('http://localhost:6161/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, sku, amount, currency, quantity }),
        });
    
        if (res.ok) {
            const approvalUrl = await res.text();
            console.log('PayPal approval URL:', approvalUrl);
            alert('Redirecting to PayPal for payment approval...');
            window.location.href = approvalUrl; // Redirect to PayPal
        } else {
            console.error('Payment creation failed', await res.text());
            alert('Error creating payment. Please try again.');
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>  
                Product Name:
                <input 
                    type="text"  
                    name="product" 
                    onChange={(e) => setProduct(e.target.value)}  
                    value={product}
                />
                <br></br>  
                Enter SKU (Stock Keeping Unit):
                <input 
                    type="text"  
                    name="sku" 
                    onChange={(e) => setSku(e.target.value)}  
                    value={sku}
                />
                <br></br>  
                Product Price:
                <input 
                    type="text"  
                    name="amount" 
                    onChange={(e) => setAmount(e.target.value)}  
                    value={amount}
                />
                <br></br> 
                Currency:
                <input 
                    type="text"  
                    name="currency" 
                    onChange={(e) => setCurrency(e.target.value)}  
                    value={currency}
                />
                <br></br> 
                Product Quantity:
                <input 
                    type="text"  
                    name="quantity" 
                    onChange={(e) => setQuantity(e.target.value)}  
                    value={quantity}
                />
                <br></br> 
               
                <button className="btn btn-success" type="submit">Pay Online</button>  
            </form>
        </div>
    );
}

export default Payment;
