import { TypedUseSelectorHook , useDispatch , useSelector} from "react-redux";
import { RootState , AppDispatch } from "./store";
// test

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;