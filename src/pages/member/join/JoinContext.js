// JoinContext.js
import { createContext, useContext } from "react";

// 1. context 생성
export const JoinContext = createContext();

// 2. 사용할 컴포넌트에서 쉽게 접근하기 위한 custom hook
export const useJoin = () => useContext(JoinContext);