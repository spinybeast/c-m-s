@extends('layouts.app')

@section('content')
    <div class="container">
        <form>
            <div class="form-group row">
                <label class="col-4 col-form-label" for="author">Автор</label>
                <div class="col-8">
                    <input id="author" name="author" type="text" class="form-control here" required="required">
                </div>
            </div>
            <div class="form-group row">
                <label for="company" class="col-4 col-form-label">Компания</label>
                <div class="col-8">
                    <input id="company" name="company" type="text" class="form-control here">
                </div>
            </div>
            <div class="form-group row">
                <label for="text" class="col-4 col-form-label">Отзыв</label>
                <div class="col-8">
                    <textarea id="text" name="text" cols="40" rows="4" class="form-control" required="required"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-4">Опубликован</label>
                <div class="col-8">
                    <label class="custom-control custom-checkbox">
                        <input name="published" type="checkbox" value="">
                    </label>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-4 col-8">
                    <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
@endsection