const getUserCoookie = () => {
  const cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)user_cookie\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  return cookieValue;
};

module.exports = getUserCoookie;
