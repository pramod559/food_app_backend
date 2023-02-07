import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import { signupValidationRules, signinValidationRules } from '../helpers/Validators';
import IPasswordService from '../services/IPasswordService';
import ITokenService from '../services/ITokenService';
import SignInUseCase from '../usercases/SignInUseCase';
import SignUpUseCase from '../usercases/SignUpUseCase';
import { validate } from '../helpers/Validators';
import AuthController from './AuthController';
import ITokenStore from '../services/ITokenStore';
import SignOutUseCase from '../usercases/SignOutUseCase';
import TokenValidator from '../helpers/TokenValidator';


export default class AuthRouter {
    public static configure(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService,
        TokenValidator: TokenValidator
    ): express.Router {
        const router = express.Router()
        let controller = AuthRouter.composeController(
            authRepository,
            tokenService,
            tokenStore,
            passwordService

        )
        router.post(
            '/signin',
            signinValidationRules(),
            validate,
            (req: express.Request, res: express.Response) =>
                controller.signin(req, res))
        router.post(
            '/signup',
            signupValidationRules(),
            validate,
            (req: express.Request, res: express.Response) =>
                controller.signup(req, res)
        )

        router.post(
            '/signout',
            (req, res, next) => TokenValidator.validate(req, res, next),
            (req: express.Request, res: express.Response) =>
                controller.signOut(req, res)
        )
        return router
    }
    private static composeController(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService
    ): AuthController {
        const signinUseCase = new SignInUseCase(
            authRepository,
            passwordService
        )
        const signupUseCase = new SignUpUseCase(
            authRepository,
            passwordService
        )
        const signoutUseCase = new SignOutUseCase(
            tokenStore
        )
        const controller = new AuthController(
            signinUseCase,
            signupUseCase,
            signoutUseCase,
            tokenService
        )
        return controller
    }
}