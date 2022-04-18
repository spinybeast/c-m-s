@extends('layouts.admin')

@section('content')
    <div class="container">
        <div>
            <h2 class="pull-left">Портфолио</h2>
            <p class="pull-right">
                <a href="{{ route('portfolio.create') }}" class="btn btn-success">
                    <i class="fa fa-music" aria-hidden="true"></i>
                    Добавить трек
                </a>
            </p>
            <div class="clearfix"></div>
        </div>
        {{ $tracks->links() }}
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light">
                <tr>
                    <th width="10%">Обложка</th>
                    <th width="30%">Название</th>
                    <th>Тэги</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php /** @var \App\Track[] $tracks */ ?>
                @foreach ($tracks as $track)
                    <tr>
                        <td>
                            <img src="{{ $track->cover }}" alt="{{ $track->title }}" class="img-fluid">
                        </td>
                        <td>
                            {{ $track->title }}
                        </td>
                        <td>
                            {{ $track->getOriginal('tags') }}
                        </td>
                        <td>
                            <a href="{{ route('portfolio.edit', $track->id) }}" class="btn btn-info">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </a>
                            <form id="deleteTrack-{{$track->id}}"
                                  method="post"
                                  action="{{ route('portfolio.destroy', $track->id) }}"
                                  style="display: none"
                            >
                                @csrf
                                @method('delete')
                            </form>
                            <a href="#"
                               onclick="
                                       event.preventDefault();
                                       if (confirm('Точно удалить трек {{ $track->title }}?')) {
                                           document.getElementById('deleteTrack-{{$track->id}}').submit();
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
