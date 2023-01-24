@extends('layouts.admin')

@section('content')
    <div class="container">
        <div>
            <h2 class="pull-left">Видео</h2>
            <p class="pull-right">
                <a href="{{ route('video.create') }}" class="btn btn-success">
                    <i class="fa fa-video" aria-hidden="true"></i>
                    Добавить видео
                </a>
            </p>
            <div class="clearfix"></div>
        </div>
        {{ $videos->links() }}
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light">
                <tr>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Видео</th>
                    <th>Тэги</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                <?php /** @var \App\Video[] $videos */ ?>
                @foreach ($videos as $video)
                    <tr>
                        <td>
                            {{ $video->title }}
                        </td>
                        <td>
                            {{ $video->description }}
                        </td>
                        <td>
                            <div class="video-container">{!! $video->url !!}</div>
                        </td>
                        <td>
                            {{ $video->getOriginal('tags') }}
                        </td>
                        <td>
                            <a href="{{ route('video.edit', $video->id) }}" class="btn btn-info">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </a>
                            <form id="deleteVideo-{{$video->id}}"
                                  method="post"
                                  action="{{ route('video.destroy', $video->id) }}"
                                  style="display: none"
                            >
                                @csrf
                                @method('delete')
                            </form>
                            <a href="#"
                               onclick="
                                       event.preventDefault();
                                       if (confirm('Точно удалить видео {{ $video->title }}?')) {
                                           document.getElementById('deleteVideo-{{$video->id}}').submit();
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
