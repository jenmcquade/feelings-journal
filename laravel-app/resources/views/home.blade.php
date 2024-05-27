<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>NothingMore</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/components/App.jsx'])

        <script src="https://cdn.tailwindcss.com"></script>
        @if (app()->isLocal())
            <script type="module" src="http://U:8001/@@vite/client"></script>
            <script type="module" src="http://U:8001/resources/js/app.js"></script>
        @else
            <script src="{{ mix('js/app.js') }}"></script>
        @endif
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
        <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50" id="app">
            
        </div>
    </body>
</html>
