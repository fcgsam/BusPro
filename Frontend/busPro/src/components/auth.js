export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return false;
      }
    } catch (error) {
      return false;
    }
  
    return true;
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
  };