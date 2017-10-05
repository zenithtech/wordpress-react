# wordpress-react
Componentized single-page [Wordpress](https://wordpress.com/) bootstrapped theme built with [React](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/), routing with [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router), and bundling with [Webpack](https://github.com/webpack/webpack).

## Features
- No requirement to install any Wordpress plugins, works out-of-the-box
- No requirement for special `.htaccess` settings
- Ability to create regular Wordpress custom templates, and include shortcodes, JS, and PHP
- Ability to create custom JSX React component templates (See [Custom JSX templates examples](#custom-jsx-templates-examples))
- Ability to use multiple menus <i>(eg. header menu, footer menu)</i>
- Menus built on the client-side from flat trees
- Separate `dev` and `production` builds <i>(accessed with the `?dev` URL query param)</i> (See [Examples](#examples) below)
- Maintains non-WP URL query params thoughout the app (See [Query param examples](#query-param-examples) below)
- Requested pages are cached for the session and not requested again
- Ability to differ cached pages from non-cached
- Ability to access pages not in the menu and maintain routing
- Ability to access pages via any standard permalink type (See [Notes](#notes) below)
- Dynamic `<head>` tag, `wp_head()` and `wp_footer()` hooks
- Ability install and use WP plugins regularly (See [Plugin test examples](#plugin-test-examples) below)
- PageSpeed results near 100% out-of-the-box (while plugins deactivated): https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fzenitht.com%2Fwp%2Fblog%2F&tab=desktop

----

This is an experimental theme. Not recommended for use on a live site.

----

## Installation

1. Download or clone this repository into your Wordpress 'themes' folder
2. Activate the theme in wp-admin
3. `cd` into this theme folder
4. Run `npm install`
5. Build with webpack:

    a. `npm run dev` to build the <b>dev</b> version

    b. `npm run prod` to build the <b>production</b> version

6. Set your WP <b>Permalinks</b> settings to <b>Post name</b>

That's all!

----

## Notes

For internal routing purposes it's recommended above to set Permalinks to Post name. A user would still be able to access any page if they arrive to a page under other permalink types.

----

## Examples

Example of <b>production</b> build (default):

[https://zenitht.com/wp/](https://zenitht.com/wp/)

Example of <b>dev</b> build accessed with `dev` param:

[https://zenitht.com/wp/?dev](https://zenitht.com/wp/?dev)

Example of page not in the menu:

[https://zenitht.com/wp/page-not-in-menu/](https://zenitht.com/wp/page-not-in-menu/)

Example of accessing page via Plain permalink type:

[https://zenitht.com/wp/?p=35](https://zenitht.com/wp/?p=35)

Example of page with JS alert in content in Text editing mode:

[https://zenitht.com/wp/level-1/](https://zenitht.com/wp/level-1/)

Example of [custom template](page-CustomPage1.php) page, with multiple JS tags, and PHP:

[https://zenitht.com/wp/page-using-custom-template/](https://zenitht.com/wp/page-using-custom-template/)

Example of page with status set as 'Draft'

[https://zenitht.com/wp/?page_id=1859](https://zenitht.com/wp/?page_id=1859)



## Custom React components in JSX templates examples

![screenshot_0](https://zenitht.com/screenshots/wp-react/screenshot_0.png)

Example of custom JSX React component template, consisting of [page-history.jsx](page-history.jsx) and [page-history.php](page-history.php) pair:

[https://zenitht.com/wp/history/](https://zenitht.com/wp/history/)

See more details at [https://zenitht.com/wp/jsx-custom-templates/](https://zenitht.com/wp/jsx-custom-templates/).



## Query param examples

Example of <b>production</b> build accessed with `page_id&someParam` params, maintaining `someParam` param:

[https://zenitht.com/wp/?page_id=35&someParam=123123](https://zenitht.com/wp/?page_id=35&someParam=123123)

Example of <b>dev</b> build accessed with `dev&p` params, maintaining `dev` param:

[https://zenitht.com/wp/?p=35&dev](https://zenitht.com/wp/?p=35&dev)

Example of <b>dev</b> build accessed with `dev&page_id` params, maintaining `dev` param:

[https://zenitht.com/wp/?page_id=35&dev](https://zenitht.com/wp/?page_id=35&dev)

Example of <b>dev</b> build accessed with `page_id&dev&p&someParam` params, maintaining `dev&someParam` params:

[https://zenitht.com/wp/?page_id=35&dev&someParam=123123](https://zenitht.com/wp/?page_id=35&dev&someParam=123123)



## Plugin test examples

Example of [wordpress-zSlider](https://github.com/zenithtech/wordpress-zSlider) within custom template:

[https://zenitht.com/wp/wordpress-zslider-test/](https://zenitht.com/wp/wordpress-zslider-test/)

Plugin test using BWS Captcha WP plugin:

[https://zenitht.com/wp/bws-captcha-shortcode-plugin-test/](https://zenitht.com/wp/bws-captcha-shortcode-plugin-test/)

Plugin test using ConvertPlug WP plugin:

[https://zenitht.com/wp/wp-plugin-test-convertplug/](https://zenitht.com/wp/wp-plugin-test-convertplug/)

Plugin test using Ninja Forms WP plugin:

[https://zenitht.com/wp/plugin-test-ninja-forms/](https://zenitht.com/wp/plugin-test-ninja-forms/)


----

## License ##

This package is licensed under MIT license. See [LICENSE](LICENSE) for details.
