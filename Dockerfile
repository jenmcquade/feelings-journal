ARG XDEBUG_VERSION="xdebug-3"
FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/laravel-app/public

RUN a2enmod rewrite

# Set working directory
WORKDIR /

# Install dependencies
RUN apt-get update && apt-get install -y \
	libzip-dev \
	zip \
	unzip \
	git \
	curl \
	libcurl4-openssl-dev \
	libpng-dev \
	libonig-dev \
	libxml2-dev

# generate php.ini
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
# enable xdebug
RUN echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20220829/xdebug.so" > $PHP_INI_DIR/conf.d/xdebug.ini

RUN docker-php-ext-install ctype fileinfo mbstring pdo_mysql xml

RUN pecl install xdebug; \
    docker-php-ext-enable xdebug

# add composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Install NPM
RUN apt-get install -y npm

# Install Yarn
RUN npm install --global yarn

# Install git
RUN apt-get install -y git

# Copy the current directory contents into the container at /app
COPY . /var/www/html/

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

WORKDIR /var/www/html/laravel-app

RUN composer install

# Change the owner of the storage and bootstrap/cache directories to www-data
RUN chown -R www-data:www-data /var/www/html/laravel-app/storage /var/www/html/laravel-app/bootstrap/cache

EXPOSE 5173
