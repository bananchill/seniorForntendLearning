//  import { sequenceS } from 'fp-ts/Apply';
// import * as Console from 'fp-ts/Console';
// import * as Eq from 'fp-ts/Eq';
import * as IO from 'fp-ts/IO'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import * as J from 'fp-ts/Json'
// import { concatAll } from 'fp-ts/Monoid';
// import * as NonEmptyArray from 'fp-ts/NonEmptyArray';
// import * as Ord from 'fp-ts/Ord';
// import * as R from 'fp-ts/Random';
import * as RTE from 'fp-ts/ReaderTaskEither'
import { flow, pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
// import * as N from 'fp-ts/number';
// import * as t from 'io-ts';
// import * as tt from 'io-ts-types';
import { readFileSync } from 'node:fs'
import path from 'node:path'
// import path from 'node:path';
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import * as NEA from 'fp-ts/NonEmptyArray'

/* Напишем простую игру - оценщик автомобилей.
 * Игра состоит из 10 раундов. Если в раунде игрок оценивает верно, то получает +1 очко, иначе - ничего.
 *
 * Настройки игры читаются из settings.json.
 * В нашей игре машины дороже когда
 * - они новее
 * - у них более дорогая марка(BMW > Audi > Ford)
 * - у них более дорогой двигатель(дизель > бензин > электро)
 * - у них меньше пробег(с допустимой разницей в 100 км)
 */

const MAX_ROUNDS = 10

interface Car {
  year: string
  brand: any
  engineBrand: string
  distance: number
}

type DefaultError<TypeError, ErrorInfo = Error> = {
  readonly type: TypeError
  readonly error: ErrorInfo
}
enum ErrorType {
  JsonStringifyError = 'JsonStringifyError',
  ReadFileError = 'ReadFileError',
  InvalidCarsSettingsError = 'InvalidCarsSettingsError',
}

type JsonStringifyError = DefaultError<ErrorType.JsonStringifyError>

type ReadFileError = DefaultError<ErrorType.ReadFileError>

type InvalidCarsSettingsError = DefaultError<ErrorType.InvalidCarsSettingsError>

const settingsPath = (pathFile: string) => path.join(__dirname, pathFile)

const readFileSyncIOE = (path: string): E.Either<ReadFileError, string> =>
  flow(
    IOE.tryCatch(() => readFileSync(path, 'utf-8'), E.toError),
    E.mapLeft<Error, ReadFileError>((e) => ({
      type: ErrorType.ReadFileError,
      error: E.toError(e),
    })),
  )()

const parseJsonIOE = (data: string) =>
  pipe(
    data,
    J.parse,
    E.bimap<unknown, JsonStringifyError, unknown, Car[]>(
      (e) => ({
        type: ErrorType.JsonStringifyError,
        error: E.toError(String(e)),
      }),
      (c) => c as Car[],
    ),
  )
const isNonEmptyArray = <T>(input: T) => Array.isArray(input) && !!input?.length

const checkCarsSettings = (cars: Car[]): E.Either<InvalidCarsSettingsError, Car[]> => {
  return isNonEmptyArray<Car[]>(cars)
    ? E.right(cars)
    : E.left({
        type: ErrorType.InvalidCarsSettingsError,
        error: E.toError('Cars must be non-empty array'),
      })
}

const loadSettings = (): E.Either<ReadFileError | JsonStringifyError, Car[]> => {
  const result = pipe(
    './settings.json',
    settingsPath,
    readFileSyncIOE,
    E.flatMap(parseJsonIOE),
  )

  return result
}

const generateRounds = (
  cars: Car[],
): IOE.IOEither<InvalidCarsSettingsError, readonly [Car, Car][]> =>
  pipe(
    cars,
    checkCarsSettings,
    IOE.fromEither,
    IOE.bimap(
      (e) =>
        e instanceof Error
          ? (e as InvalidCarsSettingsError)
          : ({
              type: ErrorType.InvalidCarsSettingsError,
              error: E.toError('Cars must be non-empty array'),
            } as InvalidCarsSettingsError),
      (neaCars) => {
        const setRounds = new Set<string>()
        const rounds: [Car, Car][] = []
        for (let i = 0; i < MAX_ROUNDS; i++) {
          for (let j = i + 1; j < MAX_ROUNDS; j++) {
            if (
              !neaCars[i] ||
              !neaCars[j] ||
              setRounds.has(JSON.stringify([neaCars[i], neaCars[j]]))
            ) {
              continue
            }
            const round: [Car, Car] = [neaCars[i]!, neaCars[j]!]

            setRounds.add(JSON.stringify(round))
            rounds.push(round)
          }
        }

        return rounds
      },
    ),
  )

const logs = (data: any) => {
  console.log(data)
  return data
}
const run = pipe(
  loadSettings,
  IOE.flatMap(generateRounds),
  // IOE.orElse(logs),
  RTE.fromIOEither,
  // RTE.flatMap(runGame),
  // RTE.map(calculateScore),
  // RTE.flatMap(finishGame),
)

run()

// ;(async () => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   })

//   const main = run(rl)

//   await main()
// })()
