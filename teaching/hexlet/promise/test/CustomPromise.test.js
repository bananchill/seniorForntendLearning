import CustomPromise from '../CustomPromise.js'
import {describe, expect, it} from "@jest/globals";

const resolveMessage = 'Resolved!'

describe(resolveMessage, () => {
    it('is not Promise', () => {
        expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
    })

    it('then()', async () => {
        const resolvedPromise = new CustomPromise((resolve) => {
            resolve(resolveMessage)
        })
        debugger
        const resolveString = await resolvedPromise
            .then(message => `Another ${message}`)

        expect(resolveString).toEqual(`Another ${resolveMessage}`)
        debugger
        const resolveChainResult = await resolvedPromise
            .then(message => `New another ${message}`)
            .then(message => message.split(' '))
            .then(array => array.reverse())
            .then(array => array.join(''))
        expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''))
    })

})