const changeInfo = (token, name, phone, address) => (
    fetch('https://user-interface-vuphong95663.c9users.io/api/change_info.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, phone, address })
    })
    .then(res => res.json())
);

module.exports = changeInfo;
