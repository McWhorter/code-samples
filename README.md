![Jason standing at the edge of the Pacific Ocean in Maui, Hawaii](./assets/images/Maui%20LinkedIn.png)

# Welcome

My name is Jason and I'm a detail-oriented developer who has a passion for producing quality code used to power online tools and websites that look great and are intuitive to use.

Below you can find some work samples I've assembled that I believe gives you a good perspective of my code practices, directory organization, overall knowledge, and ability to just see some of my work that I'm most proud of. Thanks for stopping by :) 

## Website Portfolio

I was responsibile for the complete buildout of all structure, styling, and functionality implemented within each site listed below:

- [Old Sacramento Waterfront](https://www.oldsacramento.com/)
- [Gemini Bio](https://www.gembio.com/)
- [Alameda County Employees’ Retirement Association](https://www.acera.org/)
- [Western City Magazine](https://www.westerncity.com/)
- [New York City Employees’ Retirement System](https://www.nycers.org/)
- [Los Angles City Employees’ Retirement System](https://www.lacers.org/)

## Code Samples

Below are small descriptions of each directory contained within this repository. Each gives a glimpse into the work you can expect from me and my typical organization of code, documenation of logic, and overall structure for which I use. Enjoy!

--

### Adaptable Navigation Menu Component

This navigation menu serves as both a vertical or horizontal orientation. It has other features which allow the visibility of submenus based on either hover or click interaction.

This menu is also powered by a breakpoint configuration to aid when it should be in touch or hover state depending on the viewport width.

There are many more options to tinker with. Take a look under the hood at the `Navigation.js` component's documentation.

![Source Icon](./assets/images/icons/doc.svg) [code sample source](https://github.com/McWhorter/code-samples/tree/master/Navigation%20Menu)

---

### Carousel Component

A versatile slider/carousel powered by the Flickity NPM library.

I've created a custom play/pause control to aid WCAG 2.1 AA complience to autoscrolling content.

The component also has a SVG/CSS powered progress loop to indicate the time left before transitioning to the next slide.

![Source Icon](./assets/images/icons/doc.svg) [code sample source](https://github.com/McWhorter/code-samples/tree/master/Carousel)

---

### Accessibility Complient Panel Group Component

This component creates a toggle state to show/hide content based on user click interaction. It is useful to keep content organized and compact and is commonly a dropdown or accordion section.

![Source Icon](./assets/images/icons/doc.svg) [code sample source](https://github.com/McWhorter/code-samples/tree/master/Panel%20Group)

---

### Drupal 6 & 8

I've created base themes from scratch for both Drupal 6 and 8. Below are some examples I feel demonstrate my capabilities with both creating custom Twig/PHP templates, as well as back-end logic in order to properly register them within each theme.

#### Drupal 6

Creating specific node and block markup is key in order to achieving many designs. I constructed a back-end system our team used in order to connect Drupal with each node, block, or view template desired. This gave the team lots of flexibility in addition to allowing us to repurpose templates cutting down on duplicated code. The result was an efficient and manageable way to create custom markup.

![Source Icon](./assets/images/icons/doc.svg) [template.php](https://github.com/McWhorter/code-samples/tree/master/Drupal/6/template.php) Where all the magic happens :)

![Source Icon](./assets/images/icons/doc.svg) [template.ext.inc](https://github.com/McWhorter/code-samples/tree/master/Drupal/6/template.ext.inc) Utility functions and block/node/view configuration, which support `template.php`

#### Drupal 8

Sidebar navigation is a key component for any large website. This menu gives the user the ability to quickly navigate and visual see any nested pages within the current section they're viewing on the website. Below is an example of one which features a toggle button which shows/hides the subitems on mobile/tablet viewports. Then on desktop, shows a typical sidebar navigation list.

![Source Icon](./assets/images/icons/doc.svg) [Subnavigation Block twig template sample](https://github.com/McWhorter/code-samples/tree/master/Drupal/8/subnavigation-block.html.twig)

Behaviors play an intergral role in order to bring functionality to components on Drupal site. Below is an example of a simple accordion which leverages the [aria-tablist](https://github.com/mynamesleon/aria-tablist#readme) framework which adds accessibility support, functionality, and state management.

![Source Icon](./assets/images/icons/doc.svg) [Drupal 8 Javascript behavior sample](https://github.com/McWhorter/code-samples/tree/master/Drupal/8/accordions.js)

A hero or banner is normally a keystone to any website. This is typically an in your face section at the top of the home page or main landing pages of a site. It featuring an impactful image accompanied with an overlayed message and sometimes a call to action button.

![Source Icon](./assets/images/icons/doc.svg) [Hero block twig template sample](https://github.com/McWhorter/code-samples/tree/master/Drupal/8/block--hero.html.twig)

Cards or pods are a very common components used throughout a site. These are bits of content arranged into a large button-like appearance. They typically feature an image, a title, and sometimes a small description. The entire component is typically a call to action for the user to take and can even redirect the user to other key content or supplemental content related to the current page.

![Source Icon](./assets/images/icons/doc.svg) [Node/Pod twig template sample](https://github.com/McWhorter/code-samples/tree/master/Drupal/8/node--pod.html.twig)

---

### Style and Structure Example

These are examples of my typical directory structure, code style preference, and code standards for both a SCSS and {less} preprocessing environment.

![Sass](./assets/images/icons/sass.svg)

![Source Icon](./assets/images/icons/doc.svg) [See my SCSS style, structure, and code](https://github.com/McWhorter/code-samples/tree/master/Style%20Structure/scss)

![{less}](./assets/images/icons/less.svg)

![Source Icon](./assets/images/icons/doc.svg) [See my {less} style, structure, and code](https://github.com/McWhorter/code-samples/tree/master/Style%20Structure/less)
