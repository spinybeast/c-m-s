@extends('layouts.app')

@section('content')
    <div class="container">
        <div>
            <h2 class="pull-left">Отзывы</h2>
            <p class="pull-right">
                <a href="{{ route('reviews.create') }}" class="btn btn-success">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                    Добавить
                </a>
            </p>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light">
                <tr>
                    <th width="10%">Фото</th>
                    <th width="10%">Автор</th>
                    <th>Одобрен</th>
                    <th>Приоритет</th>
                    <th width="50%">Отзыв</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php /** @var \App\Review[] $reviews */ ?>
                @foreach ($reviews as $review)
                    <tr>
                        <td width="10%">
                            <img src="{{ $review->photo }}" alt="{{ $review->author }}" class="img-fluid">
                        </td>
                        <td width="10%">
                            {{ $review->author }}
                            <span class="text-secondary">{{ $review->company }}</span>
                        </td>
                        <td>
                            {{ $review->published ? 'Да' : 'Нет'}}
                        </td>
                        <td>
                            {{ $review->priority ?? 0 }}
                        </td>
                        <td style="width: 50%; white-space: normal">
                            {{ $review->text }}
                        </td>
                        <td>
                            <a href="{{ route('reviews.edit', $review->id) }}" class="btn btn-info">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </a>
                            <form id="deleteReview-{{$review->id}}"
                                  method="post"
                                  action="{{ route('reviews.destroy', $review->id) }}"
                                  style="display: none"
                            >
                                @csrf
                                @method('delete')
                            </form>
                            <a href="#"
                               onclick="
                                       event.preventDefault();
                                       if (confirm('Точно удалить отзыв {{ $review->author }}?')) {
                                       document.getElementById('deleteReview-{{$review->id}}').submit();
                                       }"
                               class="btn btn-danger"
                            >
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
@endsection