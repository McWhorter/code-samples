<?php

/**
 * Implements hook_preprocess_page().
 */
function delight_preprocess_page(&$vars) {
  // Define environment.
  $devMode = file_exists(dirname(__FILE__) . '/DEV');
  $vars['devMode'] = $devMode;

  // Define theme helpers.
  $theme_base_url = $vars['base_path'] . $vars['directory'];
  $vars['theme_base_url'] = $theme_base_url;
}

/**
 * Implementation of HOOK_preprocess_block().
 */
function delight_preprocess_block(&$vars, $hook) {
  $block = $vars['block'];
  $custom_classes = array('block');

  // Check to see if a custom template has been configured for this display.
  if ($template = delight_views_add_custom_template($block->delta, 'block')) {
    $vars['template_files'][] = $template;
  }

  // Add a special template for any custom blocks.
  if ($block->module === 'block') {
    if ($template = delight_views_add_custom_template('block-' . $block->delta, 'block')) {
      $vars['template_files'][] = $template;
    }
  }

  // Add custom classes for certina block displays.
  $options = array($block->delta, $block->module . '-' . $block->delta);
  foreach($options as $option) {
    if ($config = delight_custom_template_configuration($option)) {
      array_unshift($custom_classes, $config['block-classes']); break;
    }
  }

  // Set placeholder-block status if it's set.
  $aClasses = explode(' ', $block->views_blocks_classes);
  if (in_array('placeholder-block', $aClasses)) {
    $custom_classes[] = 'placeholder-block';
  }

  // Add ability to alter block editing variables within this theme.
  if (user_access('administer blocks') || user_access('reorder views blocks')) {
    $custom_classes[] = 'with-block-editing';
    delight_preprocess_block_editing($vars, $hook);
  }

  // Convert custom classes array into classname string.
  $vars['custom_classes'] = implode(' ', $custom_classes);
}

/**
 * Implementation of HOOK_preprocess_menu_block_wrapper().
 */
function delight_preprocess_block_editing(&$vars, $hook) {
  $block = $vars['block'];
  $block_name = NULL;

  // Set this new block names instead.
  if ($block_name && $vars['edit_links_array']) {
    $vars['edit_links'] = '<div class="block-controls-wrapper"><div class="block-name">' . $block_name . '</div><div class="block-controls">' . implode(' ', $vars['edit_links_array']) . '</div></div>';
  }
}

/**
 * Implementation of HOOK_preprocess_node().
 */
function delight_preprocess_node(&$vars) {
  $node = $vars['node'];
  $view = $vars['view'];
  $tag = $vars['teaser'] ? 'teaser' : 'full';
  $custom_classes = array('node');
  $build_mode = $node->build_mode;
  $delta = $view->name . '-' . $view->current_display;

  // Add a node template file based on the tag, similar to what
  // views_theme_functions() does for the view itself.
  if (!empty($node->tag)) {
    $tag = $node->tag;
  }

  // Rewrite the node sidebar stuff because it's a mess.
  if ($build_mode === 'sidebar' && $tag === 'full') {
    $tag = $build_mode;
  }

  // Define a custom template file based on the views_blocks block
  // delta which represents specific types of blocks.
  if (!empty($view->_views_blocks_delta)) {
    $delta = $view->_views_blocks_delta;
  }

  // Define our custom template file based on the delta value, if set.
  if ($config = delight_custom_template_configuration($delta)) {
    $tag = $config['node'];
    $custom_classes = ['node-' . $tag];
    array_unshift($custom_classes, $config['node-classes']);

    if ($config['custom-image-preset']) {
      // Preprocess this image with the preset specified.
      $vars['image'] = delight_render_image($node->field_image[0], $config['custom-image-preset']);
    }

    $more_text = $node->field_readmore_text[0]['value'];
    $vars['more_text'] = !empty($more_text) ? $more_text : 'Read more';
  }

  // Register the potential template option.
  $vars['template_files'][] = 'node--' . $tag;

  // Add the post type id which is helpful in many situations.
  $custom_classes[] = 'pt' . $node->pt['term']->tid;

  // Helps custom templates retain unpublished state.
  if (!$vars['status']) {
    $custom_classes[] = 'node-unpublished';
  }

  // Convert custom classes array into classname string.
  $vars['custom_classes'] = implode(' ', $custom_classes);
}

/**
 * Implementation of HOOK_preprocess_views_view().
 */
function delight_preprocess_views_view(&$vars) {
  $view = $vars['view'];

  // Check to see if a custom template has been configured for this display.
  if ($template = delight_views_add_custom_template($view, 'views-view')) {
    $vars['template_files'][] = $template;
  }
}

/**
 * Implementation of HOOK_preprocess_views_view_unformatted().
 */
function delight_preprocess_views_view_unformatted(&$vars) {
  // Check to see if a custom template has been configured for this display.
  if ($template = delight_views_add_custom_template($vars['view'], 'views-view-unformatted')) {
    $vars['template_files'][] = $template;
  }
}

/**
 * Implementation of HOOK_preprocess_views_view_fields().
 */
function delight_preprocess_views_view_fields(&$vars) {
  $view = $vars['view'];

  // Check to see if a custom template has been configured for this display.
  if ($template = delight_views_add_custom_template($view, 'views-view-fields')) {
    $vars['template_files'][] = $template;
  }
}

/**
 * Helper function which creates an image tag powered by imagecache.
 */
function delight_render_image($field_image, $preset = 'thumbnail') {
  require_once(__DIR__ . '/template.ext.inc');
  return _delight_render_image($field_image, $preset);
}

/**
 * Helper function which defines customized display templates.
 */
function delight_views_add_custom_template($view, $display) {
  require_once(__DIR__ . '/template.ext.inc');
  return _delight_views_add_custom_template($view, $display);
}

/**
 * Returns a view tag which can be used with preprocessors
 * in order to define custom templates.
 */
function delight_custom_template_configuration($delta) {
  require_once(__DIR__ . '/template.ext.inc');
  return _delight_custom_template_configuration($delta);
}
