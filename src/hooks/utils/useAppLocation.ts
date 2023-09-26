import { useLocation } from 'react-router-dom';
import { AppLocationState } from 'types';

/**
 * This is a custom useLocation hook
 * It gives us the flexibility to extend the location types
 *
 * @returns () => AppLocationState
 */
export const useAppLocation = (): AppLocationState => useLocation() as AppLocationState;
