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
    @if ($review->id)
        @method('patch')
    @else
        @method('put')
    @endif
    <div class="form-group row">
        <label class="col-4 col-form-label" for="author">Автор</label>
        <div class="col-8">
            <input id="author" name="author" type="text" class="form-control here" required="required" value="{{ $review->author ?? old('author') }}">
        </div>
    </div>
    <div class="form-group row">
        <label for="company" class="col-4 col-form-label">Компания и должность</label>
        <div class="col-8">
            <input id="company" name="company" type="text" class="form-control here" value="{{ $review->company ?? old('company') }}">
        </div>
    </div>
    <div class="form-group row">
        <label for="text" class="col-4 col-form-label">Отзыв</label>
        <div class="col-8">
            <textarea id="text" name="text" cols="40" rows="5" class="form-control" required="required">{{ $review->text ?? old('text') }}</textarea>
        </div>
    </div>
    <div class="form-group row">
        <label for="text" class="col-4 col-form-label">Приоритет</label>
        <div class="col-8">
            <input id="priority" name="priority" type="text" class="form-control here" value="{{ $review->priority ?? old('priority') }}">
        </div>
    </div>
    <div class="form-group row">
        <label for="text" class="col-4 col-form-label">Фото</label>
        <div class="col-8">
            <img class="img-thumbnail" src="{{ $review->photo }}" alt="{{ $review->author }}" style="width: 200px">
            <input type="file" class="form-control-file" name="photo">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-4 form-check-label">Опубликован</label>
        <div class="col-8">
            <input name="published" type="checkbox" @if ($review->published ?? old('published')) checked @endif>
        </div>
    </div>
    <div class="form-group row">
        <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Сохранить</button>
        </div>
    </div>
</form>