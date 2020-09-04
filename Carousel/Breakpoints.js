import Breakpoints from 'breakpoints-js/dist/breakpoints';
import { breakpoints } from './config';

/**
 * Min/Max values based on breakpoints set above. These min/max values are uses
 */
const settings = {
  mobile: {
    min: breakpoints.base,
    max: breakpoints.tablet - 1,
  },
  tablet: {
    min: breakpoints.tablet,
    max: breakpoints.desktop - 1,
  },
  desktop: {
    min: breakpoints.desktop,
    max: breakpoints.desktop_xl - 1,
  },
  desktop_xl: {
    min: breakpoints.desktop_xl,
    max: Infinity,
  },
};

// Create a mobileState property to help manage viewport based functionality.
Object.defineProperty(Breakpoints, 'mobileState', {
  get() {
    const current = this.current();
    const desktop = this.get('desktop');
    return current.max < desktop.min && current.max !== desktop.max;
  },
});

// Create a new instance with our configured breakpoints.
Breakpoints(settings);

export default Breakpoints;
