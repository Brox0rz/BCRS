/**
 * Title: register-view-model.ts
 * Author: Professor Krasso
 * Date: 9/18/2023
 */
import { selectedSecurityQuestionModel} from "./selected-security-questions-view-model"
/**
 * Interface for the RegisterViewModel
 * @property firstName
 * @property lastName
 * @property email
 * @property password
 * @property selectSecurityQuestions
 * @example:
 * {
 *    firstName: 'John',
 *    lastName: 'Doe',
 *    email: 'doe@nodebucket.com',
 *    password: 'Password01',
 *    selectedSecurityQuestions: {
 *      {   question: 'What is your mother's maiden name?',
 *          answer: 'Smith'
 *       }
 *    }
 * }
 */
export interface RegisterViewModel {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    selectedSecurityQuestions: selectedSecurityQuestionsViewModel[]
}