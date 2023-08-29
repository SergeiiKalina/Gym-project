const generateTraining = require('./formgenerationtraining')

const training = require('../data/data')

const testData = {
    age: 'Age',
    bodyType: 'body type',
    email: '',
    firstName: '',
    fitnessLevel: '2',
    focus: 'focus',
    goal: 'goal',
    lastName: '',
    lifestyle: 'lifestyle',
    placeOfTraining: 'gym',
    problems: ['back'],
    sex: 'male',
}

describe('generateTraining function', () => {
    it('generates training data correctly', () => {
        const expectedTrainingData = [
            [
                { id: 1, basicExercise: true },
                { id: 2, basicExercise: true },
                { id: 3, basicExercise: false },
                { id: 4, basicExercise: false },
            ],
            [
                { id: 3, basicExercise: false },
                { id: 4, basicExercise: false },
            ],
            [
                { id: 5, basicExercise: true },
                { id: 6, basicExercise: true },
            ],
        ]
        // Вызываем функцию generateTraining
        const result = generateTraining(testData)

        result.forEach((innerArray) => {
            innerArray.forEach((object) => {
                expect(object).toHaveProperty('basicExercise')
            })
        })
    })
})
