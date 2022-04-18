@if($errors->any())
    <div class="alert alert-danger">
        <p><strong>Что-то пошло не так:</strong></p>
        <ol>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ol>
    </div>
@endif
@if(session()->has('success'))
    <div class="alert alert-success">
        {{ session()->get('success') }}
    </div>
@endif

<form action="{{ $action }}" method="post" enctype="multipart/form-data">
    @csrf
    @if ($track->id)
        @method('patch')
    @else
        @method('post')
    @endif
    <div class="form-group row">
        <label for="title" class="col-4 col-form-label">Название</label>
        <div class="col-8">
            <input id="title" name="title" type="text" class="form-control here" required
                   value="{{ $track->title ?? old('title') }}">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-4 col-form-label" for="tags">Тэги</label>
        <div class="col-8">
            <input id="tags" name="tags" type="text" class="form-control here" required
                   value="{{ $track->getOriginal('tags') ?? old('tags') }}">
            <div class="text-muted"><small>Вводите тэги через запятую</small></div>
        </div>
    </div>
    <div class="form-group row">
        <label for="cover" class="col-4 col-form-label">Обложка</label>
        <div class="col-8">
            @if ($track->id)
                <img class="img-thumbnail" src="{{ $track->cover }}" alt="{{ $track->title }}" style="width: 200px">
            @endif
            <input type="file" accept="image/*" class="form-control-file" name="cover" id="cover">
        </div>
    </div>
    <div class="form-group row">
        <label for="audio" class="col-4 col-form-label">Аудио файл</label>
        <div class="col-8">
            @if ($track->id)
                <audio
                        controls
                        src="{{ $track->audio }}">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
            @endif
            <input type="file" accept="audio/*" class="form-control-file" name="audio" id="audio">
        </div>
    </div>
    <div class="form-group row">
        <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Сохранить</button>
        </div>
    </div>
</form>
