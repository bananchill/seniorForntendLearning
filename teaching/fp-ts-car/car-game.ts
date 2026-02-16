//  import { sequenceS } from 'p-ts/Console';
import * as Eq from 'fp-ts/Apply'
import * as Console from 'fp-ts/Console'
import * as IO from 'fp-ts/IO'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import * as J from 'fp-ts/Json'
// import { concatAll } from 'fp-ts/Monoid';
// import * as NonEmptyArray from 'fp-ts/NonEmptyArray';
import * as RA from 'fp-ts/ReadonlyArray'
// import * as Ord from 'fp-ts/Ord';
// import * as R from 'fp-ts/Random';
import * as RTE from 'fp-ts/ReaderTaskEither'
import { flow, pipe } from 'fp-ts/function'
// import * as N from 'fp-ts/number';
import * as t from 'io-ts'
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

const CarBrand = {
  BMW: 'BMW',
  Audi: 'Audi',
  Ford: 'Ford',
} as const
type TCarBrand = (typeof CarBrand)[keyof typeof CarBrand]

const CarEngineBrand = {
  Diesel: 'Diesel',
  Petrol: 'Petrol',
  Electro: 'Electro',
} as const
type TCarEngineBrand = (typeof CarEngineBrand)[keyof typeof CarEngineBrand]

const MAX_ROUNDS = 10

const Settings = t.type({
  minDistance: t.number,
  maxDistance: t.number,
  minYear: t.number,
  maxYear: t.number,
  carBrand: t.keyof(CarBrand),
  engine: t.keyof(CarEngineBrand),
})
type TSettings = t.TypeOf<typeof Settings>

const CarBrandRate = {
  [CarBrand.BMW]: 3,
  [CarBrand.Audi]: 2,
  [CarBrand.Ford]: 1,
} as const

const CarEngineBrandRate = {
  [CarEngineBrand.Diesel]: 3,
  [CarEngineBrand.Petrol]: 2,
  [CarEngineBrand.Electro]: 1,
}

const Car = t.type({
  year: t.number,
  brand: t.keyof(CarBrand),
  engineBrand: t.keyof(CarEngineBrand),
  distance: t.number,
})

type TCar = t.TypeOf<typeof Car>
// type ReadonlyCars = ReadonlyArray<Car>

type DefaultError<TypeError, ErrorInfo = Error> = {
  readonly type: TypeError
  readonly error: ErrorInfo
}

class ReadFileError extends Error {
  constructor(message: string) {
    super(message)
  }
}

class ReadFileError extends Error {
  constructor(message: string) {
    super(message)
  }
}

const RoundState = t.type({
  car1: Car,
  car2: Car,
  answer: t.union([t.literal(1), t.literal(2)]),
})
type TRoundState = t.TypeOf<typeof RoundState>

const pathFile = path.join(__dirname, './settings.json')

const readFileSyncIOE = IOE.tryCatch(
  () => readFileSync(pathFile, 'utf-8'),
  (e) => new ReadFileError(String(e)),
)

const settingsDecode = flow(
  E.tryCatch(Settings.decode, (e) => new ReadFileError(String(e))),
  IOE.FromEither,
)

const loadSettings = pipe(readFileSyncIOE)
const log = (data: any) => Console.log(data())
const run = pipe(
  loadSettings,
  log,
  // IOE.flatMap(generateRounds),
  // IOE.orElse(logs),
  // RTE.fromIOEither,
  // RTE.flatMap(runGame),
  // RTE.map(calculateScore),
  // RTE.flatMap(finishGame),
)

;(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  //const main = run(rl)
  const result = run()
  // console.log(result)

  // const result = await main()

  // if (E.isLeft(result)) {
  // console.error(result.left)
  // }

  rl.close()
})()
