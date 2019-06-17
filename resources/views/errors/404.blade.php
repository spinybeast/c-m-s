@extends('layouts.app')

@section('content')
    <div class="wrapper home h-100">
        <header>
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="/img/logo.png" alt="Cyclone Music Space" height="35"/>
                    </a>
                </div>
            </nav>
        </header>
        <main class="h-100">
            <div class="main-cover h-100">
                <div class="container h-100">
                    <div class="jumbotron">
                        <div class="text-center">
                            <h1>
                                <span style="font-size: 150px">404</span><br>
                                <span>Sorry, page does not exist</span>
                            </h1><br>
                            <a class="btn btn-opacity ng-scope" href="/">Go home</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <footer class="footer">
        <div class="container d-flex flex-row justify-content-between align-items-center">
            <div class="d-flex flex-row">
                {{ date('Y') }} &copy; Cyclone Music Space<span class="d-none d-sm-inline">. All rights reserved.</span>
            </div>
            <div class="d-flex flex-row">
                <a class="btn btn-social-icon btn-vk" target="_blank" title="Мы ВКонтакте" href="https://vk.com/cyclone_music_space">
                    <i class="fa fa-vk"></i>
                </a>
                <a class="btn btn-social-icon btn-facebook" target="_blank" title="Мы на Facebook" href="https://www.facebook.com/anton.brezhnev.58">
                    <i class="fa fa-facebook"></i>
                </a>
                <a class="btn btn-social-icon btn-soundcloud" target="_blank" title="Мы на Soundcloud" href="https://soundcloud.com/tony-cyclonez">
                    <i class="fa fa-soundcloud"></i>
                </a>
            </div>
        </div>
    </footer>
@endsection
