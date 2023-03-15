const API_URL = "http://localhost:3001";

export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// get all wallets by user id
export const getWalletsApi = (user_id) => {
  return fetch(`/api/wallets/${user_id}`, {
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
  });
};

// Create a new wallet
export const createWallet = (walletData) => {
  return fetch("/api/wallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(walletData),
  });
};

export const createTransaction = (transactionData) => {
  return fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionData),
  });
};
