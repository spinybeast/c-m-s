<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2B6CNR66YR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-2B6CNR66YR');
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="keywords" content="{{ __('meta.keywords') }}">
    <meta name="description" content="{{ __('meta.description') }}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:title" content="{{ config('app.name') }}">
    <meta property="og:description" content="{{ __('meta.description') }}.">
    <meta property="og:url" content="https://cyclone-music-space.ru/">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image"  content="{{ asset('img/og_image.png') }}" />
    <meta property="og:image:width" content="200">
    <meta property="og:image:height" content="200">

    <title>{{ config('app.name') }}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" type="image/png" href="{{ asset('favicon.ico') }}"/>
</head>
<body>
    @yield('content')

    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
