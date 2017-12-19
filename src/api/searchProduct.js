const searchProduct = (key) => {
    const url = `https://user-interface-vuphong95663.c9users.io/api/search.php?key=${key}`;
    return fetch(url)
    .then(res => res.json());
};

export default searchProduct;
