import { useDispatch } from "react-redux";
import { TypedDispatch } from "state";

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
