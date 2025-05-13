import CustomPromise from '../CustomPromise.js'
import {describe, expect, test} from "@jest/globals";

const resolveMessage = 'Resolved!'
const fulfillMessage = 'Fulfilled'
const rejectError = new Error('Rejected!')
const resolveMessages = []
const rejectMessages = []
const expectedResolveMessages = [fulfillMessage, resolveMessage]
const expectedRejectMessages = [rejectError.message, resolveMessage]


describe('Promise with catch', () => {

    test('is not Promise', () => {
        expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise)
    })

    test('executor not a function', () => {
        expect(() => new CustomPromise()).toThrow('Executor must be a function')
    })

    test('resolve()', async () => {
        const actualString = await CustomPromise.resolve(resolveMessage)
        expect(actualString).toEqual(resolveMessage)
        console.log(1)
        const nonThenableObject = await CustomPromise.resolve({ resolveMessage, then: 'catch' })
        expect(nonThenableObject).toEqual({ resolveMessage, then: 'catch' })
        console.log(2)
        const resolvedThenable = {
            then: (onFulfill) => {
                onFulfill('Fulfilled!')
                throw rejectError
            },
        }
        const actualResolvedThenable = await CustomPromise.resolve(resolvedThenable)
        expect(actualResolvedThenable).toEqual('Fulfilled!')

        const rejectedThenable = {
            then: (onFulfill) => {
                throw rejectError
                // eslint-disable-next-line no-unreachable
                onFulfill('Fulfilled!') // должно игнорироваться
            },
        }
        debugger
        await expect(
            CustomPromise.resolve(rejectedThenable),
        ).rejects.toThrow(rejectError)
    })

    test('reject()', async () => {
        await expect(
            CustomPromise.reject(rejectError),
        ).rejects.toThrow(rejectError)

        const rejectedThenable = {
            then: (onFulfill, onReject) => { onReject(rejectError) },
        }
        await expect(
            CustomPromise.resolve(rejectedThenable),
        ).rejects.toThrow(rejectError)
    })

    test('then() and catch()', async () => {
        const resolvedPromise = new CustomPromise((resolve, reject) => {
            resolve(resolveMessage)
            reject(rejectError) // должно игнорироваться
        })
        const resolveString = await resolvedPromise
            .catch(message => `Catch! ${message}`) // должно игнорироваться
            .then(message => `Another ${message}`)
        expect(resolveString).toEqual(`Another ${resolveMessage}`)

        const resolveChainResult = await resolvedPromise
            .then(message => `New another ${message}`)
            .then(message => message.split(' '))
            .then() // должна отработать функция по умолчанию
            .then(array => array.reverse())
            .then(array => array.join(''))
            .catch(message => `Catch! ${message}`) // должно игнорироваться
        expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''))

        const catchPromise = new CustomPromise((resolve, reject) => {
            resolve(resolveMessage)
            reject(resolveMessage) // должно игнорироваться
        })
        const catchString = await catchPromise
            .then(() => { throw rejectError })
            .catch() // должна отработать функция по умолчанию
            .catch(error => `Catch! ${error.message}`)
        expect(catchString).toEqual(`Catch! ${rejectError.message}`)

        const rejectedPromise1 = new CustomPromise((resolve, reject) => {
            reject(rejectError)
            resolve(resolveMessage) // должно игнорироваться
        })
        const rejectString = await rejectedPromise1
            .then(message => `Another ${message}`) // должно игнорироваться
            .catch(error => `Catch! Reject message: ${error.message}`)
        expect(rejectString).toEqual(`Catch! Reject message: ${rejectError.message}`)

        const rejectedPromise2 = new CustomPromise((resolve, reject) => {
            reject(rejectError)
            resolve(resolveMessage) // должно игнорироваться
        })
        const rejectedPromiseResult = rejectedPromise2
            .then(message => `Another ${message}`) // должно игнорироваться
            .catch((error) => { throw new Error(`Error message: ${error.message}`) })
        await expect(rejectedPromiseResult).rejects.toThrow(new Error(`Error message: ${rejectError.message}`))
    })

    test('event loop', async () => {
        const resolvedPromise = new CustomPromise((resolve) => {
            resolve(resolveMessage)
        })
        expect(resolveMessages).toHaveLength(0)

        const processedResolvedPromise = resolvedPromise
            .then(() => { resolveMessages.push(fulfillMessage) })
        expect(resolveMessages).toHaveLength(0)

        await processedResolvedPromise
            .then(() => resolveMessages.push(resolveMessage))
        expect(resolveMessages).toEqual(expectedResolveMessages)

        const rejectedPromise = new CustomPromise((_, reject) => {
            reject(rejectError)
        })
        expect(rejectMessages).toHaveLength(0)

        const processedRejectedPromise = rejectedPromise
            .catch((err) => { rejectMessages.push(err.message) })
        expect(rejectMessages).toHaveLength(0)

        await processedRejectedPromise
            .then(() => rejectMessages.push(resolveMessage))
        expect(rejectMessages).toEqual(expectedRejectMessages)
    })


})