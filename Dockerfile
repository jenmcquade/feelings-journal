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

COPY . /var/www/html/

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

COPY conf/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

WORKDIR /var/www/html/laravel-app

RUN composer install

# Change the owner of the storage and bootstrap/cache directories to www-data
RUN chown -R www-data:www-data /var/www/html/laravel-app/storage /var/www/html/laravel-app/bootstrap/cache

EXPOSE 5173
