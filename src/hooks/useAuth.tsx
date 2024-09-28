import { useContext } from "react";

import { Auth } from "@/types/auth";
import { AuthContext } from "@/stores/index";

const useAuth = () => useContext<Auth>(AuthContext);

export default useAuth;
