// src/app/security/register/register-view-model.ts

import { SelectedSecurityQuestionsViewModel } from '../../models/selected-security-questions-view-model';

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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    selectedSecurityQuestions: SelectedSecurityQuestionsViewModel[];
}
