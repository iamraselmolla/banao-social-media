import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState(0)




    const authInfo = {}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;