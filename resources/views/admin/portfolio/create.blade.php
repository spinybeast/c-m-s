@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h2 class="text-center">Добавить трек</h2>
            </div>
            <div class="card-body">
                @include('admin.portfolio._form', ['track' => new \App\Track(), 'action' => route('portfolio.store')])
            </div>
        </div>
    </div>
@endsection
