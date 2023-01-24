@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Редактировать видео</h2>
            </div>
            <div class="card-body">
                @include('admin.video._form', ['video' => $video, 'action' => route('video.update', $video->id)])
            </div>
        </div>
    </div>
@endsection
