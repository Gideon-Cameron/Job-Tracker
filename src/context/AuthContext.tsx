import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // ✅ Import Firestore
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  UserCredential, 
  User 
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore"; // ✅ Firestore functions

// Define authentication context type
interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // ✅ Fetch user data from Firestore when logged in
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (!userDoc.exists()) {
          console.log("User data not found in Firestore.");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Store user info in Firestore when signing up
  const signup = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
    });
    return userCredential;
  };

  // ✅ Ensure login returns UserCredential
  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
