@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Добавить видео</h2>
            </div>
            <div class="card-body">
                @include('admin.video._form', ['video' => new \App\Video(), 'action' => route('video.store')])
            </div>
        </div>
    </div>
@endsection
