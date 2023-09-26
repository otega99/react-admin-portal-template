import { useState, useEffect, useCallback, useMemo } from 'react';

type BreakpointNames = 'md' | 'lg' | 'xl';

type BreakpointStateType = Record<BreakpointNames, boolean>;

// breakpoint values
const Breakpoints = {
  md: 768,
  xl: 1200,
  lg: 992
};

export const useMedia = () => {
  const [breakpointState, setBreakpointState] = useState<BreakpointStateType>(
    {} as BreakpointStateType
  );

  const breakpointFunc = useCallback(() => {
    //   conerts the Breakpoints to an array of arrays, then sort in descending order and map
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
    const medias: [MediaQueryList, (e: any) => void][] = Object.entries(Breakpoints)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => {
        // for each child array, get the initial matchmedia values
        const media = window.matchMedia(`(min-width: ${value}px)`);

        // create a function to run on a change event attached to the media variable above
        const listener = (e: MediaQueryListEvent) => {
          setBreakpointState((prev) => ({
            ...prev,
            [key]: e.matches
          }));
        };

        // add a change event to the media when the window size changes
        media.addEventListener('change', listener);

        // this sets the initial media attributes
        setBreakpointState((prev) => ({
          ...prev,
          [key]: media.matches
        }));

        // return an array of the media and the listener
        return [media, listener];
      });

    // clears the event
    return () => {
      medias.forEach(([media, listener]) => {
        media.removeEventListener('change', listener);
      });
    };
  }, []);

  useEffect(() => {
    breakpointFunc();
  }, [breakpointFunc]);

  const isMobile: boolean = useMemo(() => {
    return !breakpointState.md && !breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isTablet: boolean = useMemo(() => {
    return breakpointState.md && !breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isSmallLaptop: boolean = useMemo(() => {
    return breakpointState.lg && !breakpointState.xl;
  }, [breakpointState]);

  const isDesktop: boolean = useMemo(() => {
    return breakpointState.xl;
  }, [breakpointState]);

  return { isMobile, isTablet, isSmallLaptop, isDesktop };
};
