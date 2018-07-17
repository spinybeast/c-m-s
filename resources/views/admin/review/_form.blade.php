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
        <label for="priority" class="col-4 col-form-label">Приоритет</label>
        <div class="col-8">
            <input id="priority" name="priority" type="number" min="0" class="form-control here" value="{{ $review->priority ?? old('priority') }}">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-4 col-form-label">Соцсети</label>
        <div class="col-8">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-vk"></i></span>
                </div>
                <input type="text" name="socials[vkontakte]" class="form-control" placeholder="Вконтакте" value="{{ array_get($review->socials, 'vkontakte') ?? old('socials.vkontakte') }}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-facebook-official"></i></span>
                </div>
                <input type="text" name="socials[facebook]" class="form-control" placeholder="Facebook" value="{{ array_get($review->socials, 'facebook') ?? old('socials.facebook') }}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-google"></i></span>
                </div>
                <input type="text" name="socials[google]" class="form-control" placeholder="Google" value="{{ array_get($review->socials, 'google') ?? old('socials.google') }}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-twitter"></i></span>
                </div>
                <input type="text" name="socials[twitter]" class="form-control" placeholder="Twitter" value="{{ array_get($review->socials, 'twitter') ?? old('socials.twitter') }}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-instagram"></i></span>
                </div>
                <input type="text" name="socials[instagram]" class="form-control" placeholder="Instagram" value="{{ array_get($review->socials, 'instagram') ?? old('socials.instagram') }}">
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label for="photo" class="col-4 col-form-label">Фото</label>
        <div class="col-8">
            <img class="img-thumbnail" src="{{ $review->photo }}" alt="{{ $review->author }}" style="width: 200px">
            <input type="file" class="form-control-file" name="photo" id="photo">
        </div>
    </div>
    <div class="form-group row">
        <label class="col-4 form-check-label" for="published">Опубликован</label>
        <div class="col-8">
            <input name="published" id="published" type="checkbox" @if ($review->published ?? old('published')) checked @endif>
        </div>
    </div>
    <div class="form-group row">
        <div class="offset-4 col-8">
            <button name="submit" type="submit" class="btn btn-primary">Сохранить</button>
        </div>
    </div>
</form>