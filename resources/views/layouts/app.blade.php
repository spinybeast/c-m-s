<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
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
    <meta property="og:url" content="http://cyclone-music-space.ru/#/">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image"  content="{{ asset('img/logo.png') }}" />
    <meta property="og:image:width" content="185">
    <meta property="og:image:height" content="48">

    <title>{{ config('app.name') }}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    <link rel="shortcut icon" type="image/png" href="{{ asset('favicon.ico') }}"/>
</head>
<body>
    @yield('content')

    <script src="{{ asset('js/app.js') }}"></script>
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-54909644-1', 'auto');
        ga('send', 'pageview');
    </script>
</body>
</html>
