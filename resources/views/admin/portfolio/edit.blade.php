@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Редактировать трек</h2>
            </div>
            <div class="card-body">
                @include('admin.portfolio._form', ['track' => $track, 'action' => route('portfolio.update', $track->id)])
            </div>
        </div>
    </div>
@endsection
