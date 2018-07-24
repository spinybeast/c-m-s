@extends('layouts.admin')

@section('content')
    <div class="container">
        <h1 class="page-header text-center">Управление сайтом</h1>

        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body bg-info text-white text-capitalize text-center">
                        <div>
                            <i class="fa fa-comments fa-5x"></i>
                        </div>
                        <div>Отзывы</div>
                    </div>
                    <a href="{{ route('reviews.index') }}" class="text-info">
                        <div class="card-footer">
                            <span class="pull-left">Перейти</span>
                            <span class="pull-right"><i class="fa fa-arrow-right"></i></span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body bg-danger text-white text-capitalize text-center">
                        <div>
                            <i class="fa fa-youtube-square fa-5x"></i>
                        </div>
                        <div>Видео</div>
                    </div>
                    <a href="{{ route('video.index') }}" class="text-info">
                        <div class="card-footer">
                            <span class="pull-left">Перейти</span>
                            <span class="pull-right"><i class="fa fa-arrow-right"></i></span>
                            <div class="clearfix"></div>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    </div>
@endsection