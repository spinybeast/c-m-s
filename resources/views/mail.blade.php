<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Обращение с сайта cyclone-music-space.ru</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>
<div>
    <p><strong>Имя: </strong>{{$request->get('name')}}</p>
    <p><strong>E-mail: </strong>{{$request->get('email')}}</p>
    <hr>
    <p><strong>Сообщение: </strong>{{$request->get('text')}}</p>
</div>
</body>
</html>