import training, { ITraining } from "../../../../data/data"
import { IFormData } from "../../../../store/generatorTrainingReducer"

let randomWorkout: ITraining[] = []

const generateRandomExercisesForWorkout = (
    quantityExercise: number,
    arrayExercise: ITraining[],
    spareArray?: ITraining[]
): ITraining[] => {
    const partTraining: ITraining[] = []
    let currentArr: ITraining[] =
        arrayExercise.length <= quantityExercise
            ? spareArray !== undefined
                ? [...arrayExercise, ...spareArray]
                : arrayExercise.slice()
            : arrayExercise.slice()
    let counter: number = 0
    while (partTraining.length < quantityExercise && currentArr.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentArr.length)
        const currentExercise = currentArr[randomIndex]
        partTraining.push(currentExercise)
        currentArr = currentArr.filter(
            (el) => el.subCatigories !== currentExercise.subCatigories
        )
        counter++
        if (counter === 10) {
            return partTraining
        }
    }

    return partTraining
}

function filterArrayByCategory(
    data: IFormData,
    category: string,
    basic: boolean
) {
    const { fitnessLevel, placeToWorkout, problems, sex } = data

    return training
        .filter((el) => !el.LFC.some((item) => problems.includes(item)))
        .filter((item) => item.workingOut.some((el) => el === placeToWorkout))
        .filter((el) => el.sex === sex || el.sex === "unsex")
        .filter((el) => {
            let filteringPattern =
                el.fitnessLevel === Number(fitnessLevel) ||
                el.fitnessLevel === Number(fitnessLevel) - 1
            if (
                category === "back" ||
                (category === "pectoral" &&
                    fitnessLevel === 3 &&
                    placeToWorkout === "home" &&
                    sex === "female" &&
                    basic === false)
            ) {
                filteringPattern =
                    el.fitnessLevel === Number(fitnessLevel) ||
                    el.fitnessLevel === Number(fitnessLevel) - 1 ||
                    el.fitnessLevel === Number(fitnessLevel) - 2
            }
            if (
                (category === "back" && fitnessLevel === 2) ||
                (category === "pectoral" && fitnessLevel === 2) ||
                (category === "legs" && fitnessLevel === 2) ||
                (category === "back" && fitnessLevel === 1) ||
                (category === "pectoral" && fitnessLevel === 1)
            ) {
                if (
                    (category === "back" || category === "pectoral") &&
                    fitnessLevel === 2 &&
                    placeToWorkout === "home" &&
                    basic === false
                ) {
                    filteringPattern = filteringPattern =
                        el.fitnessLevel === Number(fitnessLevel) ||
                        el.fitnessLevel === Number(fitnessLevel) - 1
                } else {
                    filteringPattern = filteringPattern =
                        el.fitnessLevel === Number(fitnessLevel) ||
                        el.fitnessLevel === Number(fitnessLevel) + 1
                }
            }
            if (
                (category === "shoulders" && fitnessLevel === 2) ||
                (category === "biceps" && fitnessLevel === 2) ||
                (category === "triceps" && fitnessLevel === 2) ||
                (category === "legs" && fitnessLevel === 1)
            ) {
                filteringPattern = el.fitnessLevel === Number(fitnessLevel)
            }
            if (
                (category === "shoulders" && fitnessLevel === 1) ||
                (category === "triceps" && fitnessLevel === 1)
            ) {
                filteringPattern = filteringPattern =
                    el.fitnessLevel === Number(fitnessLevel) ||
                    el.fitnessLevel === Number(fitnessLevel) + 1
            }
            if (category === "pres" && fitnessLevel === 3) {
                filteringPattern =
                    el.fitnessLevel === Number(fitnessLevel) ||
                    el.fitnessLevel === Number(fitnessLevel) - 1 ||
                    el.fitnessLevel === Number(fitnessLevel) - 2
            }

            return (
                el.category === category &&
                filteringPattern &&
                el.basicExercise === basic
            )
        })
}

function calculateIndicators(data: IFormData): IFormData {
    if (data.placeToWorkout === "home") {
        const { pushUpQuantity, sitUp, squatQuantity, age, weight, ...rest } =
            data
        const fitnessLevel = Math.round(
            (Number(pushUpQuantity) + Number(sitUp) + Number(squatQuantity)) / 3
        )

        const bodyMassIndex = Math.round(
            (Number(weight) / (1.75 * 1.75)) * Number(age)
        )

        return { ...rest, fitnessLevel, bodyMassIndex }
    } else if (data.placeToWorkout === "gym") {
        const {
            benchPress,
            deadLift,
            pullUp,
            squat,
            sitUp,
            age,
            weight,
            ...rest
        } = data
        let cofBenchPress = Number(benchPress) / Number(weight)
        let cofSquat = Number(squat) / Number(weight)
        let cofDeadLift = Number(deadLift) / Number(weight)

        let cofSitUp = 0
        let cofPullUp = 0

        if (Number(sitUp) > 20) {
            Number(sitUp) > 40 ? (cofSitUp = 3) : (cofSitUp = 2)
        } else {
            cofSitUp = 1
        }
        if (Number(pullUp) > 3) {
            Number(pullUp) > 10 ? (cofPullUp = 3) : (cofPullUp = 2)
        } else {
            cofPullUp = 1
        }
        if (cofBenchPress > 0.8) {
            cofBenchPress > 1.2 ? (cofBenchPress = 3) : (cofBenchPress = 2)
        } else {
            cofBenchPress = 1
        }
        if (cofSquat > 1) {
            cofSquat > 1.5 ? (cofSquat = 3) : (cofSquat = 2)
        } else {
            cofSquat = 1
        }
        if (cofDeadLift > 1.1) {
            cofDeadLift > 1.6 ? (cofDeadLift = 3) : (cofDeadLift = 2)
        } else {
            cofDeadLift = 1
        }

        const fitnessLevel = Math.round(
            (Number(cofBenchPress) +
                Number(cofSquat) +
                Number(cofDeadLift) +
                Number(cofSitUp) +
                Number(cofPullUp)) /
                6
        )

        const bodyMassIndex = Math.round(
            (Number(weight) / (1.75 * 1.75)) * Number(age)
        )

        return { ...rest, fitnessLevel, bodyMassIndex }
    }
    return data
}

function generateFullBodyTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        2,
        filterArrayByCategory(updateData, "legs", true)
    )

    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "back", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "pectoral", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "shoulders", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "pres", false)
        )
    )
    return randomWorkout
}

function generateUpperBodyTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        2,
        filterArrayByCategory(updateData, "back", true)
    )
    if (updateData.placeToWorkout === "home") {
        randomWorkout = randomWorkout.concat(
            generateRandomExercisesForWorkout(
                1,
                filterArrayByCategory(updateData, "back", false)
            )
        )
    } else {
        randomWorkout = randomWorkout.concat(
            generateRandomExercisesForWorkout(
                1,
                filterArrayByCategory(updateData, "back", true).filter(
                    (el) =>
                        !randomWorkout.some(
                            (item) => item.subCatigories === el.subCatigories
                        )
                )
            )
        )
    }
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "pectoral", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "pectoral", false)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "biceps", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "biceps", false)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "triceps", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "triceps", false)
        )
    )
    return randomWorkout
}

function generateLowerBodyTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        3,
        filterArrayByCategory(updateData, "legs", true)
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "legs", false),
            filterArrayByCategory(updateData, "legs", true).filter(
                (el) =>
                    !randomWorkout.some(
                        (item) => item.subCatigories === el.subCatigories
                    )
            )
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "pres", false)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "pres", false).filter(
                (el) =>
                    !randomWorkout.some(
                        (item) => item.subCatigories === el.subCatigories
                    )
            )
        )
    )
    return randomWorkout
}

function generateBackTraining(
    updateData: IFormData,
    quantityBaseExercise: number,
    quantityNoBaseExercise: number
) {
    randomWorkout = generateRandomExercisesForWorkout(
        quantityBaseExercise,
        filterArrayByCategory(updateData, "back", true)
    )
    if (updateData.placeToWorkout === "home") {
        randomWorkout = randomWorkout.concat(
            generateRandomExercisesForWorkout(
                quantityNoBaseExercise,
                filterArrayByCategory(updateData, "back", false)
            )
        )
    } else {
        randomWorkout = randomWorkout.concat(
            generateRandomExercisesForWorkout(
                quantityNoBaseExercise,
                filterArrayByCategory(updateData, "back", false),
                filterArrayByCategory(updateData, "back", true).filter(
                    (el) =>
                        !randomWorkout.some(
                            (item) => item.subCatigories === el.subCatigories
                        )
                )
            )
        )
    }
    return randomWorkout
}

function generateLegsTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        4,
        filterArrayByCategory(updateData, "legs", true)
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            2,
            filterArrayByCategory(updateData, "legs", false),
            filterArrayByCategory(updateData, "legs", true).filter(
                (el) =>
                    !randomWorkout.some(
                        (item) => item.subCatigories === el.subCatigories
                    )
            )
        )
    )
    return randomWorkout
}

function generateChestTraining(
    updateData: IFormData,
    quantityBaseExercise: number,
    quantityNoBaseExercise: number
) {
    randomWorkout = generateRandomExercisesForWorkout(
        quantityBaseExercise,
        filterArrayByCategory(updateData, "pectoral", true)
    )

    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            quantityNoBaseExercise,
            filterArrayByCategory(updateData, "pectoral", false),
            filterArrayByCategory(updateData, "pectoral", true).filter(
                (el) =>
                    !randomWorkout.some(
                        (item) => item.subCatigories === el.subCatigories
                    )
            )
        )
    )
    return randomWorkout
}

function generateShouldersTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        3,
        filterArrayByCategory(updateData, "shoulders", true)
    )

    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            3,
            filterArrayByCategory(updateData, "shoulders", false).filter(
                (el) =>
                    !randomWorkout.some(
                        (item) => item.subCatigories === el.subCatigories
                    )
            )
        )
    )
    return randomWorkout
}
function generateHandTraining(updateData: IFormData) {
    randomWorkout = generateRandomExercisesForWorkout(
        1,

        filterArrayByCategory(updateData, "biceps", true)
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            3,
            filterArrayByCategory(updateData, "biceps", false)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            3,

            filterArrayByCategory(updateData, "triceps", true)
        )
    )
    randomWorkout = randomWorkout.concat(
        generateRandomExercisesForWorkout(
            1,
            filterArrayByCategory(updateData, "triceps", false)
        )
    )
    return randomWorkout
}

function generatePressTraining(
    updateData: IFormData,
    quantityExercise: number
) {
    randomWorkout = generateRandomExercisesForWorkout(
        quantityExercise,
        filterArrayByCategory(updateData, "pres", false)
    )
    return randomWorkout
}

function generateTrainingForHome(updateData: IFormData, focus: string) {
    switch (focus) {
        case "fullBody":
            randomWorkout = generateFullBodyTraining(updateData)
            break
        case "upperBody":
            randomWorkout = generateUpperBodyTraining(updateData)
            break
        case "lowerBody":
            randomWorkout = generateLowerBodyTraining(updateData)
            break
        case "back":
            switch (updateData.placeToWorkout) {
                case "home":
                    randomWorkout = generateBackTraining(updateData, 2, 3)
                    break
                case "gym":
                    randomWorkout = generateBackTraining(updateData, 4, 2)
                    break
                default:
                    break
            }
            break
        case "legs":
            randomWorkout = generateLegsTraining(updateData)
            break
        case "chest":
            switch (updateData.placeToWorkout) {
                case "home":
                    randomWorkout = generateChestTraining(
                        updateData,
                        3,
                        4 - updateData.fitnessLevel!
                    )
                    break
                case "gym":
                    switch (updateData.sex) {
                        case "male":
                            randomWorkout = generateChestTraining(
                                updateData,
                                4,
                                2
                            )
                            break
                        case "female":
                            randomWorkout = generateChestTraining(
                                updateData,
                                3,
                                2
                            )
                            break
                        default:
                            break
                    }
                    break
                default:
                    break
            }
            break
        case "shoulders":
            randomWorkout = generateShouldersTraining(updateData)
            break
        case "hand":
            randomWorkout = generateHandTraining(updateData)
            break
        case "press":
            switch (updateData.placeToWorkout) {
                case "home":
                    randomWorkout = generatePressTraining(updateData, 5)
                    break
                case "gym":
                    randomWorkout = generatePressTraining(updateData, 6)
                    break
                default:
                    break
            }
            break
        default:
            break
    }
    return randomWorkout
}
export const generateTraining = (data: IFormData) => {
    const updateData = calculateIndicators(data)
    const result = generateTrainingForHome(updateData, updateData.focus)
    return result
}