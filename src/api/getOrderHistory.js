const getOrderHistory = (token) => (
    fetch('https://user-interface-vuphong95663.c9users.io/api/order_history.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.json())
);

module.exports = getOrderHistory;
