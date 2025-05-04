export default function swapKeyValue(memoryKV) {
    Object.entries(memoryKV.obj).forEach(([key, value]) => {
        memoryKV.unset(key, value);
        memoryKV.set(value, key);
    })
}