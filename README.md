# wordpress-react
This is a single-page [React](https://facebook.github.io/react/)/[Flux](https://facebook.github.io/flux/) [Wordpress](https://wordpress.com/) theme.

----

This is <b>work-in-progress.</b> Not recommended for use on a live site.

----

To install:
1. Download or clone this repository into your Wordpress 'themes' folder
2. Activate the theme in wp-admin
3. cd into this theme folder
4. For <b>dev</b> version run `npm run dev` <i>(accessed with the `?dev` query string)</i>
5. For <b>production</b> version run `npm run prod`
6. Edit this line in the `.htaccess` file:

    `RewriteRule . /index.php [L]`

    to

    `RewriteRule . /$1 [P]`


That's all!

----

Examples:

production: [https://zenitht.com/wp/](https://zenitht.com/wp/)

dev: [https://zenitht.com/wp/?dev](https://zenitht.com/wp/?dev)

u: wp / p: wp

----
