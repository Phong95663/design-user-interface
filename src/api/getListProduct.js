const getListProduct = (idType, page) => {
    let url;
    // if (idType !== 'COLLECTION') {
        url = `https://user-interface-vuphong95663.c9users.io/api/product_by_type.php?id_type=${idType}&page=${page}`;
    // } else {
    //     url = `https://user-interface-vuphong95663.c9users.io/api/get_collection.php?page=${page}`;
    // }
    return fetch(url)
    .then(res => res.json());
};

export default getListProduct;
