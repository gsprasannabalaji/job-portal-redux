const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"));

    if (user && user.userToken) {
      return { Authorization: 'Bearer ' + user.userToken };
    } else {
      return {};
    }
}

export default authHeader;