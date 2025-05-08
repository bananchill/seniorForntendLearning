# Задача

В данном упражнении необходимо реализовать класс-обёртку над стандартным классом `URL`. Наш класс будет предоставлять дополнительные методы и немного расширять стандартный функционал.

## Файл: Url.js

Необходимо реализовать и экспортировать по умолчанию класс для работы с HTTP-адресом.

### Требования к классу

1. **Конструктор**
    - Принимает на вход HTTP-адрес в виде строки.

2. **Методы**

    - `getScheme()`
        - Возвращает протокол передачи данных без двоеточия.

    - `getHostName()`
        - Возвращает имя хоста.

    - `getQueryParams()`
        - Возвращает параметры запроса в виде объекта с парами ключ-значение.
        - **Подсказка:** для работы с query string используйте класс `URLSearchParams` и метод `Object.fromEntries()`.

    - `getQueryParam(name, defaultValue = null)`
        - Получает значение параметра запроса по имени.
        - Если параметр с переданным именем не существует, метод возвращает значение, заданное вторым параметром (по умолчанию `null`).

    - `equals(url)`
        - Принимает объект класса `Url` и возвращает `true` или `false` в зависимости от того, совпадает ли переданный URL с текущим объектом.

### Пример использования

```js

const url = new Url('http://yandex.ru:80?key=value&key2=value2');

url.getScheme(); // 'http'
url.getHostName(); // 'yandex.ru'
url.getQueryParams();
// {
//   key: 'value',
//   key2: 'value2',
// }
url.getQueryParam('key'); // 'value'
// второй параметр — значение по умолчанию
url.getQueryParam('key2', 'lala'); // 'value2'
url.getQueryParam('new', 'ehu'); // 'ehu'
url.getQueryParam('new'); // null

url.equals(new Url('http://yandex.ru:80?key=value&key2=value2')); // true
url.equals(new Url('http://yandex.ru:80?key=value')); // false
```