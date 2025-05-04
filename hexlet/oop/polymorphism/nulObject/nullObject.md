```markdown
# FakeSubscription.js и User.js

## Описание задачи

На Хекслете доступ к курсам осуществляется через подписку — отдельную сущность, которая хранит данные о сроке действия, оплате и других свойствах подписки. Для проверки доступа к платному контенту используется вызов методов, например:

```javascript
user.getCurrentSubscription().hasPremiumAccess();
user.getCurrentSubscription().hasProfessionalAccess();
```

При этом не у всех пользователей есть реальная подписка, так как существует обширная бесплатная часть. Чтобы не выполнять постоянные проверки на наличие подписки (например, `if (user.getCurrentSubscription() && ...)`), применяется паттерн Null Object. Благодаря этому, метод `getCurrentSubscription()` всегда возвращает объект, реализующий нужный интерфейс.

## FakeSubscription.js

Необходимо реализовать и экспортировать по умолчанию класс `FakeSubscription`, который реализует интерфейс настоящей подписки (`Subscription`). Особенности реализации:

- **Конструктор:** Принимает объект пользователя.
- **Логика доступа:**
    - Если пользователь является администратором (проверяется с помощью `user.isAdmin()`), то методы:
        - `hasPremiumAccess()`
        - `hasProfessionalAccess()`

      должны возвращать `true` (то есть, все доступы разрешены).

    - Если пользователь не является администратором, то указанные методы должны возвращать `false` (доступы запрещены).

Таким образом, `FakeSubscription` позволяет унифицировать работу с подпиской, избавляя от необходимости проверять, существует ли подписка.

## User.js

В классе `User` необходимо изменить конструктор следующим образом:

- **Аргументы конструктора:**  
  Принимается email пользователя и опционально объект подписки.

- **Логика установки подписки:**
    - Если снаружи передается реальная подписка, то она используется в качестве текущей подписки пользователя.
    - Если подписка не передана, то внутри конструктора создается экземпляр класса `FakeSubscription` для данного пользователя.

Метод `getCurrentSubscription()` должен возвращать либо реальную, либо фейковую подписку, в зависимости от того, что было передано при создании пользователя.

## Примеры использования

```javascript
import Subscription from '../Subscription.js';
import User from '../User.js';

// Пользователь с реальной подпиской 'premium'
const user1 = new User('vasya@email.com', new Subscription('premium'));
user1.getCurrentSubscription().hasPremiumAccess(); // true
user1.getCurrentSubscription().hasProfessionalAccess(); // false

// Пользователь с реальной подпиской 'professional'
const user2 = new User('vasya@email.com', new Subscription('professional'));
user2.getCurrentSubscription().hasPremiumAccess(); // false
user2.getCurrentSubscription().hasProfessionalAccess(); // true

// Если подписка не передается, создается фейковая подписка, все доступы запрещены
const user3 = new User('vasya@email.com');
user3.getCurrentSubscription().hasPremiumAccess(); // false
user3.getCurrentSubscription().hasProfessionalAccess(); // false

// Администратор определяется по email (например, 'rakhim@hexlet.io')
// Фейковая подписка для администратора должна разрешать все доступы
const user4 = new User('rakhim@hexlet.io');
user4.getCurrentSubscription().hasPremiumAccess(); // true
user4.getCurrentSubscription().hasProfessionalAccess(); // true
```

## Подсказки

- Реализуйте класс `FakeSubscription` таким образом, чтобы его интерфейс полностью соответствовал классу `Subscription`.
- В конструкторе `User` проверьте, передана ли подписка. Если нет — создайте новый экземпляр `FakeSubscription`, передав в него пользователя.
- Определение администратора можно выполнить, например, по проверке email (в примере администратором считается пользователь с email `rakhim@hexlet.io`).

