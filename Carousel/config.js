// -----------------------------------------------------------------------------
// Max width of layout container.
// -----------------------------------------------------------------------------

const layout = {
  max_width: 1200,
};

// -----------------------------------------------------------------------------
// Theme Gutters
// -----------------------------------------------------------------------------

const gutters = {
  base: 20,
  mobile: 36,
  tablet: 80,
  desktop: 40,
  desktop_xl: 'auto',
};

// -----------------------------------------------------------------------------
// Theme Breakpoints
// -----------------------------------------------------------------------------

const breakpoints = {
  base: 0,
  mobile: 375,
  tablet: 768,
  desktop: 1025,
  desktop_xl: layout.max_width + gutters.desktop * 2,
};

// -----------------------------------------------------------------------------
// Header heights for each breakpoint.
// -----------------------------------------------------------------------------

const heights = {
  mobile: 80,
  tablet: 80,
  desktop: 120,
  desktop_xl: 120,
};

// -----------------------------------------------------------------------------
// Centralized offsets used by various components.
// -----------------------------------------------------------------------------

const offsets = {
  sidebar: 35,
  padding: 20,
  mobile: heights.mobile,
  tablet: heights.tablet,
  desktop: heights.desktop,
  desktop_xl: heights.desktop_xl,
};

// -----------------------------------------------------------------------------
// Measurement Units Matrix
// @warning This feature is experimental and needs a great deal of thought
// when changing some of the units. This is due to calculations being made that
// assume a pixel expression.
// (eg. media queries based on breakpoint and gutter values)
// -----------------------------------------------------------------------------

const units = {
  layout: 'px',
  offset: 'px',
  gutter: 'px',
  breakpoint: 'px',
  header_height: 'px',
};

// -----------------------------------------------------------------------------
// isNumber utility which checks to see if a value is a number,
// if it is it appends the appriote unit to the value.
// -----------------------------------------------------------------------------

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

// -----------------------------------------------------------------------------
// Unitize JS objects to CSS units for use within a CSS preprocessor.
// -----------------------------------------------------------------------------

const unitize = (suffix, obj) => {
  const output = {};
  Object.entries(obj).forEach(([prop, value]) => {
    const propName = `${prop.replace('_', '-')}-${suffix.replace('_', '-')}`;
    output[propName] = isNumber(value) ? `${value}${units[suffix]}` : value;
  });
  return output;
};

// -----------------------------------------------------------------------------
// Adds a suffix passed to each object key, then returns the transformed object.
// -----------------------------------------------------------------------------

const rekey = (suffix, obj) => {
  const output = {};
  Object.entries(obj).forEach(([prop, value]) => {
    const propName = `${prop.replace('_', '-')}-${suffix.replace('_', '-')}`;
    output[propName] = value;
  });
  return output;
};

// -----------------------------------------------------------------------------
// Prep and merge together all variables for the preprocessor.
// -----------------------------------------------------------------------------

const variables = {
  ...unitize('layout', layout),
  ...unitize('offset', offsets),
  ...unitize('gutter', gutters),
  ...unitize('header_height', heights),
  ...unitize('breakpoint', breakpoints),
};

// -----------------------------------------------------------------------------
// Exports configuration.
// -----------------------------------------------------------------------------

module.exports = {
  units,
  layout,
  heights,
  offsets,
  gutters,
  breakpoints,
  variables,
};
