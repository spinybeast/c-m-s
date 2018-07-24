@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Редактировать отзыв</h2>
            </div>
            <div class="card-body">
                @include('admin.review._form', ['review' => $review, 'action' => route('reviews.update', $review->id)])
            </div>
        </div>
    </div>
@endsection