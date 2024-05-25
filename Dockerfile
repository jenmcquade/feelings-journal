ARG XDEBUG_VERSION="xdebug-3"
FROM php:8.3.7-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

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
RUN echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20230831/xdebug.so" > $PHP_INI_DIR/conf.d/xdebug.ini

RUN docker-php-ext-install ctype fileinfo mbstring pdo_mysql xml

RUN pecl install xdebug; \
    docker-php-ext-enable xdebug

# add composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the current directory contents into the container at /app
COPY ./laravel-app/ /var/www/html/

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

RUN composer install

# Change the owner of the storage and bootstrap/cache directories to www-data
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
