export default function createObject(obj) {
    const handler = {
        get(target, prop) {
            if (prop in target) {
                if(typeof target[prop] === 'object') {
                    return new Proxy(target[prop], handler);
                }
                return target[prop];
            }
            return new Proxy({}, handler);
        }
    }
    return new Proxy(obj, handler)
    }

const obj = createObject({
    key: 'value',
    key2: {
      key3: 'value3',
    },
  });
 
 
 console.log(obj.key2 );

// код корректно продолжает работу:
console.log(obj.key2.key1 );
console.log(obj.key2.key1.key0 );
console.log(obj.obj.obj );