**Задача #3: Классы-аккумуляторы**

## План реализации

1. Описать класс `AbstractAccumulator` с конструктором, бросающим `Error` при прямой инициализации.
2. Проверить в конструкторе, что у наследника метод `read` был переопределён.
3. Создать класс `WrongAccumulator`, наследующий от `AbstractAccumulator` без переопределения `read`.
4. Создать класс `Accumulator`, наследующий от `AbstractAccumulator` с корректным методом `read`.
5. Привести примеры использования и ожидаемые результаты.

---

## Синтаксис для README.md

```js
// Попытка прямого создания экземпляра абстрактного класса
new AbstractAccumulator(); // Error: "Cannot instantiate AbstractAccumulator directly"

// Неправильный наследник без переопределения метода read
new WrongAccumulator();    // Error: "Method read() must be overridden"

// Правильный аккумулятор
const accumulator = new Accumulator();

accumulator.read(12);
accumulator.read(1);
accumulator.read(5);

console.log(accumulator.value); // 18
```

### Описание классов

* **AbstractAccumulator**

    * Конструктор принимает `value` (по умолчанию `0`).
    * При прямой инициализации бросает `Error`.
    * Проверяет наличие переопределённого метода `read` у наследника.
    * Метод `read()` по умолчанию бросает `Error`.

* **WrongAccumulator**

    * Наследует `AbstractAccumulator` без переопределения `read`.
    * При создании бросает `Error` о необходимости переопределения `read`.

* **Accumulator**

    * Наследует `AbstractAccumulator`.
    * Переопределяет метод `read(value)`, добавляя `value` к `this.value`.

---

## Примечание

В данном решении разделение логики на абстрактный класс и наследники позволяет:

* Избежать прямой инициализации общего функционала.
* Гарантировать реализацию метода `read` в конкретных классах.
