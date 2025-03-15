/**
 * Описание задачи:
 * Напиши функцию createNoDeleteProxy(obj),
 * которая принимает объект obj и возвращает его Proxy-обёртку,
 * которая перехватывает операцию удаления свойств.
 * Если кто-либо попытается удалить свойство через оператор delete, прокси должна:
 *
 * Логировать предупреждение: "Удаление свойства '<имя свойства>' не разрешено".
 * Отменять операцию удаления (свойство не удаляется).
 * Требования:
 *
 * Перехватить операцию удаления через ловушку deleteProperty.
 * Не обязательно использовать Reflect, можно реализовать логику напрямую через изменение поведения Proxy.
 * Вернуть false из ловушки deleteProperty, чтобы сигнализировать, что удаление не выполнено (или выбросить ошибку, если это требуется).
 * */


const createLoggingProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            console.log(`Чтение свойства "${ prop }"`);
            return Reflect.get(target, prop, receiver);
        },
        // Ловушка для записи в свойство
        set(target, prop, value, receiver) {
            console.log(`Запись свойства "${ prop }" со значением "${ value }"`);
            return Reflect.set(target, prop, value, receiver);
        },
        deleteProperty(target, p) {
            console.debug(`Удаление свойства ${ p } не разрешено`)
            return false;
        }
    })
}