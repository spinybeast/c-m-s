@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                Отзывы
            </div>
            <!-- /.panel-heading -->
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Автор</th>
                            <th>Отзыв</th>
                            <th>Фото</th>
                            <th>Опубликован</th>
                            <th>Приоритет</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php /** @var \App\Review[] $reviews */ ?>
                        @foreach ($reviews as $review)
                            <tr>
                                <td>{{ $review->author }} <span class="text-secondary">{{ $review->company }}</span></td>
                                <td>{{ str_limit($review->text, 30) }}</td>
                                <td>{{ $review->photo }}</td>
                                <td>{{ $review->published ? 'Да' : 'Нет'}}</td>
                                <td>{{ $review->priority ?? 0 }}</td>
                                <td>
                                    <a href="{{ route('reviews.show', $review->id) }}" class="btn">
                                        <i class="fa fa-info" aria-hidden="true"></i>
                                    </a>
                                    <a href="{{ route('reviews.edit', $review->id) }}" class="btn">
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                    </a>
                                    <a href="{{ route('reviews.destroy', $review->id) }}" class="btn">
                                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </a>
                                </td>
                            </tr>

                        @endforeach
                        </tbody>
                    </table>
                </div>
                <!-- /.table-responsive -->
            </div>
            <!-- /.panel-body -->
        </div>

    </div>
@endsection