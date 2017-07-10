# wordpress-react
A single-page [Wordpress](https://wordpress.com/) bootstrap theme built with [React](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/), and bundling with [Webpack](https://github.com/webpack/webpack).

## Features
- No need to install any Wordpress plugins
- Separate `dev` and `production` [Webpack](https://github.com/webpack/webpack) builds <i>(accessed with the `?dev` query string)</i>
- Ability to create regular Wordpress custom templates, and include shortcodes, JS, and PHP
- Requested pages are cached
- Uses [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router) and [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- Ability to access pages not in the menu and maintain routing
- Ability to access pages via any permalink type (See Notes below)

----

This is <b>work-in-progress.</b> Not recommended for use on a live site. Several Wordpress features are yet to be implemented.

----

## Installation

1. Download or clone this repository into your Wordpress 'themes' folder
2. Activate the theme in wp-admin
3. `cd` into this theme folder
4. Run `npm install`
5. Build with webpack:

    a. `npm run dev` to build the <b>dev</b> version

    b. `npm run prod` to build the <b>production</b> version

7. Edit your `.htaccess` file as such:

        # BEGIN WordPress
        <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.php$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.php [L]
        </IfModule>
        # END WordPress

8. Set your WP <b>Permalinks</b> settings to <b>Post name</b>


That's all!

----

## Notes

For internal routing purposes it's recommended above to set Permalinks to Post name, but a user should still be able to access any page if they arrive to the site under other permalink types.

----

## Examples

(Use `username`/`password`: `wp` / `wp` for below links)

Example of <b>production</b> build (default):
[https://zenitht.com/wp/](https://zenitht.com/wp/)

Example of <b>dev</b> build accessed with `?dev` param:
[https://zenitht.com/wp/?dev](https://zenitht.com/wp/?dev)

Example of page not in the menu:
[https://zenitht.com/wp/page-not-in-menu/](https://zenitht.com/wp/page-not-in-menu/)

Example of accessing page via Plain permalink type:
[https://zenitht.com/wp/?p=35](https://zenitht.com/wp/?p=35)

Example of page with JS alert in content in Text editing mode:
[https://zenitht.com/wp/level-1/](https://zenitht.com/wp/level-1/)

Example of [custom template](https://github.com/zenithtech/wordpress-react/blob/master/page-CustomPage1.php) page, with multiple JS tags, and PHP:
[https://zenitht.com/wp/page-using-custom-template/](https://zenitht.com/wp/page-using-custom-template/)

----

## License ##

This package is licensed under MIT license. See LICENSE for details.
