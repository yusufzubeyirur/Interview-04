import React, { createContext, useContext, useEffect, useState } from "react";

// Kullanıcı context'i oluştur
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });

  // Rastgele bir kullanıcının durumunu her iki saniyede bir güncelle
  useEffect(() => {
    const userNames = Object.keys(userState);
    const interval = setInterval(() => {
      const randomUser =
        userNames[Math.floor(Math.random() * userNames.length)];
      setUserState((prevState) => ({
        ...prevState,
        [randomUser]: !prevState[randomUser],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

const UserList = () => {
  const { userState } = useContext(UserContext);

  return (
    <div>
      {Object.entries(userState).map(([userName, isOnline]) => (
        <div key={userName}>
          {userName}: {isOnline ? "🟢" : "🔴"}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  );
}

export default App;
