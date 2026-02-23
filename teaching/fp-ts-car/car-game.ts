import { sequenceS } from 'fp-ts/Apply'
import * as Eq from 'fp-ts/Eq'
import * as Console from 'fp-ts/Console'
import * as IO from 'fp-ts/IO'
import * as IOE from 'fp-ts/IOEither'
import * as E from 'fp-ts/Either'
import * as J from 'fp-ts/Json'
import { concatAll } from 'fp-ts/Monoid'
import * as NEA from 'fp-ts/NonEmptyArray'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Ord from 'fp-ts/Ord'
import * as R from 'fp-ts/Random'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as TE from 'fp-ts/TaskEither'
import { flow, pipe } from 'fp-ts/function'
import * as N from 'fp-ts/number'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { readFileSync } from 'node:fs'
import path from 'node:path'
// import path from 'node:path';
import readline from 'node:readline'

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

const Settings = t.type({
  minDistance: t.number,
  maxDistance: t.number,
  minYear: t.number,
  maxYear: t.number,
  carBrand: tt.readonlyNonEmptyArray(t.keyof(CarBrand)),
  engine: tt.readonlyNonEmptyArray(t.keyof(CarEngineBrand)),
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

type PricedCar = Omit<TCar, 'engineBrand' | 'brand'> & {
  brandPrice: number
  engineBrandPrice: number
}

class ReadFileError extends Error {
  constructor(message: string) {
    super(message)
  }
}

class ParseError extends Error {
  constructor(message: string) {
    super(message)
  }
}
class DecodeError extends Error {
  constructor(message: string) {
    super(message)
  }
}

const Answer = t.union([t.literal(0), t.literal(1)])

const RoundState = t.type({
  car1: Car,
  car2: Car,
  answer: Answer,
})
type TRoundState = t.TypeOf<typeof RoundState>

const Score = t.type({
  score: t.number,
  round: t.number,
  answer: Answer,
})
type TScore = t.TypeOf<typeof Score>

const pathFile = path.join(__dirname, './settings.json')

const readFileSyncIOE = IOE.tryCatch(
  () => readFileSync(pathFile, 'utf-8'),
  (e) => new ReadFileError(String(e)),
)
const parseJson = flow(
  J.parse,
  E.mapLeft((e) => new ParseError(String(e))),
)

const settingsDecode = flow(
  parseJson,
  E.flatMap(Settings.decode),
  E.mapLeft((e) => (e instanceof ParseError ? e : new DecodeError(String(e)))),
  IOE.fromEither,
)

const loadSettings = pipe(readFileSyncIOE, IOE.flatMap(settingsDecode))

const generateCar = (setting: TSettings): IO.IO<TCar> =>
  sequenceS(IO.Apply)({
    year: R.randomInt(setting.minYear, setting.maxYear),
    brand: R.randomElem(setting.carBrand),
    engineBrand: R.randomElem(setting.engine),
    distance: R.randomInt(setting.minDistance, setting.maxDistance),
  })

const generatePricedCar = (car: TCar): PricedCar => ({
  ...car,
  brandPrice: CarBrandRate[car.brand],
  engineBrandPrice: CarEngineBrandRate[car.engineBrand],
})

const ordByDistance = Ord.contramap((car: PricedCar) => car.distance)(N.Ord)

const ordByYear = Ord.contramap((car: PricedCar) => car.year)(N.Ord)

const ordByBrand = Ord.contramap((car: PricedCar) => car.brandPrice)(N.Ord)

const ordByEngineBrand = Ord.contramap((car: PricedCar) => car.engineBrandPrice)(N.Ord)

const ordMonoid = Ord.getMonoid<PricedCar>()

const combinedOrd = concatAll(ordMonoid)([
  ordByBrand,
  ordByEngineBrand,
  ordByYear,
  ordByDistance,
])

const generateRound = (settings: TSettings) =>
  pipe(
    IO.Do,
    IO.bind('car1', () => generateCar(settings)),
    IO.bind('car2', () => generateCar(settings)),
    IO.map(({ car1, car2 }) => {
      const priced1 = generatePricedCar(car1)
      const priced2 = generatePricedCar(car2)

      const answer = combinedOrd.compare(priced1, priced2) === 1 ? 0 : 1

      return { car1, car2, answer: answer as TRoundState['answer'] }
    }),
    IOE.fromIO,
  )

const generateRounds = (settings: TSettings) =>
  pipe(
    NEA.range(1, MAX_ROUNDS),
    NEA.traverse(IOE.ApplicativeSeq)(() => generateRound(settings)),
  )

const ask =
  (
    question: string,
  ): RTE.ReaderTaskEither<readline.Interface, Error, TRoundState['answer']> =>
  (rl) =>
    TE.tryCatch(
      () =>
        new Promise<TRoundState['answer']>((resolve, reject) => {
          rl.question(question, (answer) =>
            pipe(
              Number(answer),
              Answer.decode,
              E.fold(
                (e) => reject(new Error(String(e))),
                (a) => resolve(a),
              ),
            ),
          )
        }),
      (e) => new Error(String(e)),
    )

const formatCarInline = (car: TCar): string =>
  `${car.brand} | ${car.engineBrand} | ${car.year} | ${car.distance} км`

const formatRound = (round: TRoundState, index: number): string => {
  return `
  \n 0 - машина 1 дороже, 1 - машина 2 дороже ? 
===============================
Раунд ${index + 1}

Машина 1
-------------------------------
${formatCarInline(round.car1)}

Машина 2
-------------------------------
${formatCarInline(round.car2)}


answer: ${round.answer}
===============================
`
}

const startRound = (round: TRoundState, index: number) =>
  pipe(
    ask(formatRound(round, index)),
    RTE.map((answer) => ({
      answer: round.answer,
      round: index,
      score: Number(answer) === round.answer ? 1 : 0,
    })),
  )

const runGame = (rounds: readonly TRoundState[]) =>
  pipe(
    rounds,
    RA.mapWithIndex((i, r) => [i, r] as const),
    RA.traverse(RTE.ApplicativeSeq)(([i, r]) => startRound(r, i)),
  )

const calculateScore = (scores: readonly TScore[]) =>
  pipe(
    scores,
    RA.foldMap(N.MonoidSum)((s) => s.score),
  )

const finishGame = (score: number) =>
  RTE.fromIO(Console.log(`Игра окончена! Ваш результат: ${score} очков.`))

const run = pipe(
  loadSettings,
  IOE.flatMap(generateRounds),
  RTE.fromIOEither,
  RTE.flatMap(runGame),
  RTE.map(calculateScore),
  RTE.flatMap(finishGame),
)

;(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const main = run(rl)

  await main()

  rl.close()
})()
