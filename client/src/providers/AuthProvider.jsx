import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { auth } from "../firebase.js";
  import {
    useCreateUserHandler,
    useFetchUserHandler,
    useFetchUsernameSuggestion,
  } from "../api/user-api.js";
  import { useMutation } from "../hooks/useMutation.js";
  import { HTTP_METHOD } from "../hooks/http-methods.js";
  import { useLocation } from "react-router-dom";
  
  const context = createContext({});
  
  const googleAuthProvider = new GoogleAuthProvider();
  
  // eslint-disable-next-line react/prop-types
  const AuthProvider = ({ children }) => {
    const createUser = useCreateUserHandler();
    const fetchUsers = useFetchUserHandler();
    const fetchUsernameSuggestion = useFetchUsernameSuggestion();
  
    const { pathname } = useLocation();
  
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
  
    const fetchUserHandler = useMutation("users", HTTP_METHOD.GET);
  
    const login = useCallback(
      async (emailOrUsername, password) => {
        try {
          await signInWithEmailAndPassword(auth, emailOrUsername, password);
        } catch (e) {
          try {
            const userWithSameUsername = (
              await fetchUsers({ username: emailOrUsername })
            )?.data[0];
            await signInWithEmailAndPassword(
              auth,
              userWithSameUsername?.email,
              password
            );
          } catch (e) {
            throw new Error("Invalid login credential");
          }
        }
        const usersWithSameEmail = (await fetchUsers({ email: emailOrUsername }))
          .data;
        if (usersWithSameEmail?.length === 0) {
          await createUser(
            "User" +
              Array.from({ length: 5 }, () =>
                Math.round(Math.random() * 10)
              ).join(""),
            emailOrUsername
          );
        }
      },
      [auth, signInWithEmailAndPassword]
    );
  
    const signup = useCallback(
      async (email, password, username) => {
        const usersWithSameEmailPromise = fetchUsers({ email });
        const usersWithSameUsernamePromise = fetchUsers({ username });
  
        const [{ data: usersWithSameEmail }, { data: usersWithSameUsername }] =
          await Promise.all([
            usersWithSameEmailPromise,
            usersWithSameUsernamePromise,
          ]);
  
        if (usersWithSameEmail?.length !== 0) {
          throw new Error("Email is already taken");
        }
        if (usersWithSameUsername?.length !== 0) {
          throw new Error("Username is already taken");
        }
  
        await Promise.all([
          createUserWithEmailAndPassword(auth, email, password),
          createUser(username, email),
        ]);
      },
      [auth, createUserWithEmailAndPassword]
    );
  
    const thirdPartySignIn = useCallback(
      async (thirdPartyAuthProvider) => {
        const res = await signInWithPopup(auth, thirdPartyAuthProvider);
        const email = res.user.email;
        const usersWithSameEmail = (await fetchUsers({ email }))?.data;
        const suggestedUsername = await fetchUsernameSuggestion(undefined);
        if (usersWithSameEmail?.length === 0) {
          await createUser(suggestedUsername, email);
        }
      },
      [auth, signInWithPopup]
    );
  
    const logout = useCallback(async () => {
      try {
        await signOut(auth);
      } catch (e) {
        console.log(e)
      }
    }, [auth, signOut]);
  
    const reFetchUserData = useCallback(async () => {
      if (firebaseUser && firebaseUser?.email) {
        const res = await fetchUserHandler.run({
          query: {
            email: firebaseUser?.email,
          },
        });
        setUserData(res[0]);
      }
    }, [firebaseUser, fetchUserHandler]);
  
    useEffect(() => {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user && user?.email) {
          const res = await fetchUserHandler.run({
            query: {
              email: user?.email,
            },
          });
          setUserData(res[0]);
        }
        setFirebaseUser(user);
        setLoading(false);
      });
    }, []);
  
    useEffect(() => {
      (async () => {
        if (firebaseUser && firebaseUser?.email) {
          const res = await fetchUserHandler.run({
            query: {
              email: firebaseUser?.email,
            },
          });
          setUserData(res[0]);
        }
      })();
    }, [pathname]);
  
    const value = useMemo(
      () => ({
        login,
        signup,
        loading,
        getCurrentUser: () => firebaseUser,
        getCustomUser: () => userData,
        // Authorization
        getAccessToken: () => firebaseUser?.accessToken,
        logout,
        googleSignIn: () => thirdPartySignIn(googleAuthProvider),
        reFetchUserData,
      }),
      [
        firebaseUser,
        loading,
        userData,
        thirdPartySignIn,
        googleAuthProvider,
        login,
        logout,
        signup,
        reFetchUserData,
        firebaseUser?.accessToken,
      ]
    );
  
    return <context.Provider value={value}>{children}</context.Provider>;
  };
  
  export default AuthProvider;
  
  export const useAuth = () => useContext(context);
  