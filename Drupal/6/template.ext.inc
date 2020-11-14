<?php

/**
 * Returns a view tag which can be used with preprocessors
 * in order to define custom templates.
 *
 * @param $delta
 *   Array key which of the requested block options.
 * @return Array
 *   An associative array of customized options for said block.
 */
function _dtheme_custom_template_configuration($delta) {
  $blocks = array(
    'term-block_1-0' => array( // Overview
      'block'                  => 'overview',
      'block-classes'          => 'overview',
      'views-view'             => 'empty',
      'views-view-unformatted' => 'empty',
      'node'                   => 'overview',
    ),
    'term-block_1-1' => array( // Posts
      'block'                  => 'default',
      'block-classes'          => 'posts',
      'views-view'             => 'default',
      'views-view-unformatted' => 'default',
      'node'                   => 'teaser',
    ),
    'term-block_1-2' => array( // Pods Right
      'block'                  => 'default',
      'block-classes'          => 'pods pods-right',
      'views-view'             => 'default',
      'views-view-unformatted' => 'default',
      'node'                   => 'pod',
    ),
    'term-block_1-3' => array( // Pods Below
      'block'                  => 'default',
      'block-classes'          => 'pods pods-below',
      'views-view'             => 'default',
      'views-view-unformatted' => 'default',
      'node'                   => 'pod',
    ),
    'term-block_1-4' => array( // Footer Links
      'block'                  => 'simple',
      'block-classes'          => 'footer-links',
      'views-view'             => 'unordered-list',
      'views-view-unformatted' => 'list-item',
      'node'                   => 'link',
    ),
    'term-block_1-5' => array( // Home Hero
      'block'                  => 'simple--loader',
      'block-classes'          => 'home-hero',
      'views-view'             => 'empty',
      'views-view-unformatted' => 'empty',
      'node'                   => 'home-hero',
      'custom-image-preset'    => 'hero',
    ),
    'term-block_1-6' => array( // Banner
      'block'                  => 'simple',
      'block-classes'          => 'banner',
      'views-view'             => 'empty',
      'views-view-unformatted' => 'empty',
      'node'                   => 'banner',
      'custom-image-preset'    => 'banner',
    ),
  );

  $block = $blocks[$delta];

  if (empty($block)) {
    $block = null;
  }

  return $block;
}

/**
 * Helper function which defines custom display template.
 *
 * @param $view
 *   View class instance
 * @param $display
 *   Array key of the type of template requested
 * @return String
 *   Custom template file name
 */
function _dtheme_views_add_custom_template($view, $display) {
  $template = NULL;
  $delta = is_string($view) ? $view : $view->name . '-' . $view->current_display;

  if (!is_string($view) && !empty($view->_views_blocks_delta)) {
    $delta = $view->_views_blocks_delta;
  }

  // Define a custom template file based on the display delta.
  if ($config = dtheme_custom_template_configuration($delta)) {
    $template = $display . '--' . $config[$display];
  }

  return $template;
}

/**
 * Helper function which creates an image tag powered by imagecache.
 *
 * @param $field_image
 *   field image array from the node object
 * @param $preset
 *   Image cache preset name requested
 * @return HTMLString
 *   An img element html string
 */
function _dtheme_render_image($field_image, $preset = 'thumbnail') {
  $image = NULL;
  $path = $field_image['filepath'];
  $alt = $field_image['data']['alt'];

  if ($path) {
    $src = imagecache_create_url($preset, $path);
    $attributes = array(
      'src' => check_url($src),
      'alt' => $alt,
      'loading' => 'lazy',
    );

    // We do not want to add alt text to this image if it doesn't have it set.
    // In addition, we will add the presentation role to the image.
    // @see https://www.w3.org/WAI/WCAG21/Techniques/html/H67
    if (empty($alt)) {
      $attributes['alt'] = '';
      $attributes['role'] = 'presentation';
    }

    $image = '<img ' . drupal_attributes($attributes) . '>';
  }

  return $image;
}
