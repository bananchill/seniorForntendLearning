export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/** input => onInput **/
export const getListenerMethodName = (eventName: string): string => {
    return 'on' + capitalize(eventName);
}