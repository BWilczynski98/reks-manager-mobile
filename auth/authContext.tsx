import { createContext, type ReactNode, useReducer, useMemo, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type AuthProviderType = {
  children: ReactNode;
};

enum AUTH_ACTION_TYPE_KEYS {
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

type Token = string | null;

type RestoreToken = { type: AUTH_ACTION_TYPE_KEYS.RESTORE_TOKEN; payload: { token: Token } };
type SignIn = { type: AUTH_ACTION_TYPE_KEYS.SIGN_IN; payload: { token: Token } };
type SignOut = { type: AUTH_ACTION_TYPE_KEYS.SIGN_OUT };

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  token: string | null;
}
type AuthActions = RestoreToken | SignIn | SignOut;

export const AuthContext = createContext<any>(null);

function authReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case AUTH_ACTION_TYPE_KEYS.RESTORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isLoading: false,
      };
    case AUTH_ACTION_TYPE_KEYS.SIGN_IN:
      return { ...state, isSignout: false, token: action.payload.token };
    case AUTH_ACTION_TYPE_KEYS.SIGN_OUT:
      return { ...state, isSignout: true, token: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [state, dispatch] = useReducer(authReducer, { isLoading: true, isSignout: false, token: null });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        userToken = await SecureStore.getItemAsync("token");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: AUTH_ACTION_TYPE_KEYS.RESTORE_TOKEN, payload: { token: userToken } });
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      state: state,
      signIn: async (data: Token) => {
        await SecureStore.setItemAsync("token", data as string);
        dispatch({ type: AUTH_ACTION_TYPE_KEYS.SIGN_IN, payload: { token: data } });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("token");
        dispatch({ type: AUTH_ACTION_TYPE_KEYS.SIGN_OUT });
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
