@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Добавить отзыв</h2>
            </div>
            <div class="card-body">
                @include('admin.review._form', ['review' => new \App\Review(), 'action' => route('reviews.store')])
            </div>
        </div>
    </div>
@endsection