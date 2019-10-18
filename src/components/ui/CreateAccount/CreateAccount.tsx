import React from 'react';
import styled from 'styled-components';
import router from 'next/router';

import Input from '../Input';
import Button from '../Button';

import { StyledLogin } from '../Login';
import { string } from 'prop-types';
import { User } from '../../models/User/User';

const StyledPage = styled(StyledLogin)`
    fieldset {
        border: none;
        padding: 0;
    }

    .error-message {
        background: var(--cancel-color);
        color: var(--white);
        border-radius: 5px;
        padding: 5px 0;
        margin-top: 0;
    }
`;

interface IState {
    errors: CustomError[];
    firstName: string;
    lastName: string;
    email: string;
    organizationCode;
    username: string;
    password: string;
    confirmPassword: string;
}

class CreateAccount extends React.PureComponent {
    state: IState = {
        errors: [],
        firstName: 'Colin',
        lastName: 'Knebl',
        email: 'colin.knebl@outlook.com',
        organizationCode: '149417',
        username: 'colinknebl',
        password: 'password',
        confirmPassword: 'password',
    };

    constructor(props) {
        super(props);
    }
    render() {
        let hasPasswordError: boolean = this.state.errors.some(
            error => error.type === 'password'
        );
        let hasEmailError: boolean = this.state.errors.some(
            error => error.type === 'email'
        );
        let hasUsernameError: boolean = this.state.errors.some(
            error => error.type === 'username'
        );

        return (
            <StyledPage>
                <h1>Create Account!</h1>

                <fieldset>
                    <form>
                        <Input
                            value={this.state.firstName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'firstName',
                                    event.target.value
                                );
                            }}
                            type='text'
                            placeholder='First Name'
                            isErrored={false}
                            required
                        />
                        <Input
                            value={this.state.lastName}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'lastName',
                                    event.target.value
                                );
                            }}
                            type='text'
                            placeholder='Last Name'
                            isErrored={false}
                            required
                        />
                        <Input
                            value={this.state.email}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'email',
                                    event.target.value
                                );
                            }}
                            type='email'
                            placeholder='Email'
                            isErrored={hasEmailError}
                            required
                        />
                        <Input
                            value={this.state.organizationCode}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'organizationCode',
                                    event.target.value
                                );
                            }}
                            type='text'
                            placeholder='Organization ID'
                            isErrored={false}
                            required
                        />
                        <Input
                            value={this.state.username}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'username',
                                    event.target.value
                                );
                            }}
                            type='text'
                            placeholder='Username'
                            isErrored={hasUsernameError}
                            required
                        />
                        <Input
                            value={this.state.password}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'password',
                                    event.target.value
                                );
                            }}
                            type='password'
                            placeholder='Password'
                            isErrored={hasPasswordError}
                            required
                        />
                        <Input
                            value={this.state.confirmPassword}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                this._onInputChange(
                                    'confirmPassword',
                                    event.target.value
                                );
                            }}
                            type='password'
                            placeholder='Confirm Password'
                            isErrored={hasPasswordError}
                            required
                        />

                        <Button
                            text='Create Account'
                            type='primary'
                            onClick={event => {
                                event.preventDefault();
                                this.setState({ errors: [] });
                                this._createAccount();
                            }}
                        />
                    </form>
                </fieldset>

                {this.state.errors.length > 0 &&
                    this.state.errors.map(error => (
                        <ErrorMessage key={error.message} error={error} />
                    ))}
            </StyledPage>
        );
    }

    private _onInputChange(field: string, value: string) {
        this.setState({
            [field]: value,
        });
    }

    private _createAccount = async () => {
        const errors: CustomError[] = [];
        if (this.state.password !== this.state.confirmPassword) {
            errors.push(new CustomError('Passwords do not match!', 'password'));
        }

        if (errors.length) {
            this.setState({
                errors,
            });
        } else {
            const user = await ((User.CreateUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                organizationCode: this.state.organizationCode,
                username: this.state.username,
                password: this.state.password,
            }) as unknown) as Promise<{
                id: string;
                email: string;
                password: string;
            }>).catch((error: Error) => {
                const errors: CustomError[] = [];
                if (this._isTaken(error.message, 'email')) {
                    errors.push(
                        new CustomError(
                            'Looks like this email is taken! Please choose another.',
                            'email'
                        )
                    );
                }
                if (this._isTaken(error.message, 'username')) {
                    errors.push(
                        new CustomError(
                            'Looks like this username is taken! Please choose another.',
                            'username'
                        )
                    );
                }
                if (errors.length) {
                    this.setState({
                        errors,
                    });
                }
            });
            console.log('TCL: privateasync_createAccount -> user', user);
            if (user && user.email && user.password) {
                const loggedInUser = await User.Login(
                    user.email,
                    this.state.password
                );
            }
        }
    };

    private _isTaken(message: string, fieldName: IErrorTypes) {
        return (
            message.includes(`Field name = ${fieldName}`) &&
            message.includes('unique constraint')
        );
    }
}

export default CreateAccount;

function ErrorMessage({ error }: { error: Error }) {
    return <p className='error-message'>{error.message}</p>;
}

type IErrorTypes = 'password' | 'email' | 'username';

class CustomError extends Error {
    private _type: IErrorTypes;
    constructor(message: string, type: IErrorTypes) {
        super(message);

        this._type = type;
    }

    get type() {
        return this._type;
    }
}
