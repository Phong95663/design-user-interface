const initData = () => (
    fetch('https://user-interface-vuphong95663.c9users.io/api/')// eslint-disable-line
    .then(res => res.json())
);

export default initData;
