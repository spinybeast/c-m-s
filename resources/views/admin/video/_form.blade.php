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
    @if ($video->id)
        @method('patch')
    @else
        @method('post')
    @endif
    <div class="form-group row">
        <label for="title" class="col-4 col-form-label">Название</label>
        <div class="col-8">
            <input id="title" name="title" type="text" class="form-control here" required
                   value="{{ $video->title ?? old('title') }}">
        </div>
    </div>
    <div class="form-group row">
        <label for="description" class="col-4 col-form-label">Описание</label>
        <div class="col-8">
            <input id="description" name="description" type="text" class="form-control here" required
                   value="{{ $video->description ?? old('description') }}">
        </div>
    </div>
    <div class="form-group row">
        <label for="url" class="col-4 col-form-label">Ссылка</label>
        <div class="col-8">
            <input id="url" name="url" type="text" class="form-control here" required
                   value="{{ $video->url ?? old('url') }}">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-4 col-form-label" for="tags">Тэги</label>
        <div class="col-8">
            <input id="tags" name="tags" type="text" class="form-control here" required
                   value="{{ $video->getOriginal('tags') ?? old('tags') }}">
            <div class="text-muted"><small>Вводите тэги через запятую</small></div>
        </div>
    </div>
    <div class="form-group row">
        <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Сохранить</button>
        </div>
    </div>
</form>
