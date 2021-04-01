import { useContext, useCallback } from 'react';
import { LoadingContext } from "./global-context";
import { isNullOrUndefined } from './format-util';

export function useLoader() {
    const [loader, setLoader] = useContext(LoadingContext);
    loader.state = {}
    const loading = useCallback((msg) => {
        setLoader({loading: !isNullOrUndefined(msg), message: msg})
    },[setLoader]);
    return [loading];
}