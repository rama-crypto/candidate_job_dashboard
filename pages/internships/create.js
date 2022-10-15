import React, { useState, useContext, useMemo, useRef } from 'react'
import Desktoplayout from '../../components/layout/layout'
import { InternshipsApi } from '../../api/internship'
import AuthContext from '../../components/auth/AuthContext'
import * as yup from 'yup'

const Createinternship = () => {
    const { token } = useContext(AuthContext)

    const internApi = useMemo(() => new InternshipsApi(token), [token])

    const [role, setRole] = useState('')
    const [location, setLocation] = useState('')
    const [last_date, setLast_date] = useState('')
    const [apply_form, setApplyForm] = useState('')
    const [stipend, setStipend] = useState('')
    const [duration, setDuration] = useState('')
    const [start_date, setStart_date] = useState('')
    const [mode, setMode] = useState('')
    const [elig, setElig] = useState('')
    const [resp, setResp] = useState('')
    const [perks, setPerks] = useState('')
    const [website, setWebsite] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [company_name, setCompany_name] = useState('')
    const [about, setAbout] = useState('')

    const [submitErrors, setSubmitErrors] = useState('')

    const postInternSchema = yup.object().shape({
        role: yup
            .string()
            .max(100, 'Role should not exceed 100 characters!')
            .required('This is a required field!'),
        location: yup
            .string()
            .max(50, 'Location name should not exceed 50 characters!')
            .required('This is a required field!'),
        last_date: yup
            .date('Please enter a valid date!')
            .nullable('Please enter a valid date!')
            .typeError('Please enter a valid date!')
            .min(new Date(), 'Last date to apply cannot be in the past!')
            .required('This is a required field!'),
        apply_form: yup
            .string()
            .url('Please enter a correct url!')
            .required('This is a required field!'),
        stipend: yup
            .string()
            .max(40, 'The value of this field should not exceed 40 characters!')
            .required('This is a required field!'),
        duration: yup
            .string()
            .max(15, 'Duration should not exceed 15 characters!')
            .required('This is a required field!'),
        start_date: yup
            .date('Please enter a valid date!')
            .nullable('Please enter a valid date!')
            .typeError('Please enter a valid date!')
            .min(new Date(), 'Starting date cannot be before today!')
            .required('This is a required field!'),
        mode: yup
            .number()
            .typeError('Amount must be a number')
            .required('This is a required field!'),
        elig: yup
            .string()
            .max(
                800,
                'The eligibility description should not exceed 800 characters!'
            )
            .required('This is a required field!'),
        resp: yup
            .string()
            .max(800, 'The responsibility should not exceed 800 characters!')
            .required('This is a required field!'),
        perks: yup
            .string()
            .max(800, 'This field should not exceed 800 characters!')
            .required('This is a required field!'),
        website: yup.string().url('Please enter a correct url!'),
        linkedin: yup.string().url('Please enter a correct url!'),
        company_name: yup
            .string()
            .max(100, 'Company name should not exceed 100 characters!')
            .required('This is a required field!'),
        about: yup
            .string()
            .max(800, 'The about should not exceed 800 characters!')
            .required('This is a required field!'),
    })

    const formReset = () => {
        setRole('')
        setLocation('')
        setLast_date('')
        setApplyForm('')
        setStipend('')
        setDuration('')
        setStart_date('')
        setMode('')
        setElig('')
        setResp('')
        setPerks('')
        setWebsite('')
        setLinkedin('')
        setCompany_name('')
        setAbout('')
        setSubmitErrors(undefined)
    }

    const formSubmit = async () => {
        const data = {
            role,
            location,
            last_date,
            apply_form,
            stipend,
            duration,
            start_date,
            mode,
            elig,
            resp,
            perks,
            website,
            linkedin,
            company_name,
            about,
        }
        const isValid = await postInternSchema.isValid(data, {
            abortEarly: false,
        })
        if (isValid) {
            setSubmitErrors(undefined)
            // setLoading(true)
            const formData = new FormData()
            for (let key in data) {
                formData.append(key, data[key])
            }
            internApi.createInternship(formData)
            formReset()
        } else {
            const errors = await postInternSchema
                .validate(data, {
                    abortEarly: false,
                })
                .catch((err) => {
                    let errorMap = new Map()
                    for (let error of err.inner) {
                        let message = error.message
                        let path = error.path
                        errorMap.set(path, message)
                    }
                    return errorMap
                })
            console.log('post job form errors', errors)
            console.log('type', typeof errors)
            setSubmitErrors(errors)
        }
    }
    return (
        <Desktoplayout>
            <div className="post-internship-form d-flex flex-column mt-5 mb-5">
                <div className="d-flex">
                    <p
                        style={{
                            fontSize: '26px',
                            fontWeight: 600,
                        }}
                    >
                        Internship Creation Form
                    </p>
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Role
                    </div>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Job Title, for example, Software Development, Design,
                        UI/UX etc.
                    </div>
                    {submitErrors && submitErrors.get('role') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('role')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Location
                    </div>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Location of the internship
                    </div>
                    {submitErrors && submitErrors.get('location') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('location')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Last date to apply
                    </div>
                    <input
                        type="date"
                        value={last_date}
                        onChange={(e) => setLast_date(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Last date for the applicants to apply
                    </div>
                    {submitErrors && submitErrors.get('last_date') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('last_date')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Application Form
                    </div>
                    <input
                        type="text"
                        value={apply_form}
                        onChange={(e) => setApplyForm(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Google Form or any other link through which the
                        applicants are supposed to apply for the opportunity
                    </div>
                    {submitErrors && submitErrors.get('form') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('form')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Stipend
                    </div>
                    <input
                        type="text"
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Stipend being offered for the internship in INR or state
                        that it is a volunteering internship
                    </div>
                    {submitErrors && submitErrors.get('stipend') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('stipend')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Starting Date
                    </div>
                    <input
                        type="date"
                        value={start_date}
                        onChange={(e) => setStart_date(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Starting date for the Internship
                    </div>
                    {submitErrors && submitErrors.get('start_date') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('start_date')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Duration
                    </div>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Duration of the Internship
                    </div>
                    {submitErrors && submitErrors.get('duration') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('duration')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Mode (hrs/week)
                    </div>
                    <input
                        type="text"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Expected number of hours the intern is supposed to
                        contribute to the internship responsibilities per week
                    </div>
                    {submitErrors && submitErrors.get('mode') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('mode')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Eligibility
                    </div>
                    <textarea
                        onChange={(e) => setElig(e.target.value)}
                        value={elig}
                    />
                    {submitErrors && submitErrors.get('elig') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('elig')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Intern's Day to Day Responsibilities
                    </div>
                    <textarea
                        value={resp}
                        onChange={(e) => setResp(e.target.value)}
                    />
                    {submitErrors && submitErrors.get('resp') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('resp')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Perks and Benefits
                    </div>
                    <textarea
                        value={perks}
                        onChange={(e) => setPerks(e.target.value)}
                    />
                    {submitErrors && submitErrors.get('perks') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('perks')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        Company Name
                    </div>
                    <input
                        type="text"
                        value={company_name}
                        onChange={(e) => setCompany_name(e.target.value)}
                    />
                    <div className="input-group-desc">Name of Company</div>
                    {submitErrors && submitErrors.get('company_name') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('company_name')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">Company Website</div>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Website URL of Company
                    </div>
                    {submitErrors && submitErrors.get('website') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('website')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">Company Linkedin</div>
                    <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                    />
                    <div className="input-group-desc">
                        Linkedin Account URL of Company
                    </div>
                    {submitErrors && submitErrors.get('linkedin') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('linkedin')}
                        </div>
                    )}
                </div>
                <div className="input-group">
                    <div className="input-group-heading">
                        <span className="input-group-required">*</span>
                        About Company
                    </div>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    {submitErrors && submitErrors.get('about') && (
                        <div className="input-group-submit-error">
                            {submitErrors.get('about')}
                        </div>
                    )}
                </div>
                <div className="post-internship-form-submit">
                    <button
                        style={{
                            borderWidth: '0px',
                            color: 'white',
                            backgroundColor: '#5a52b7',
                            fontSize: '14px',
                            height: '42px',
                            width: '130px',
                            borderRadius: '8px',
                        }}
                        onClick={(event) => {
                            event.preventDefault()
                            formSubmit()
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <style jsx>{`
                .create-heading {
                    margin-left: 5%;
                    margin-right: auto;
                }
                .post-internship-form {
                    border: 1px solid rgba(0, 0, 0, 0.125);
                    padding: 24px;
                    background: #fff;
                    border-radius: 10px;

                    width: 60%;
                    min-width: 480px;
                    margin-left: 5%;
                    margin-right: auto;
                    gap: 16px;
                }

                .input-group {
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5;
                    display: block;
                }

                .input-group-heading {
                    color: #212529;
                    margin-bottom: 8px;
                }

                .input-group-required {
                    color: red;
                }

                .input-group input,
                .input-group textarea {
                    display: block;
                    width: 100%;
                    padding: 6px 12px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #212529;
                    border: 1px solid #ced4da;
                    border-radius: 4px !important;
                    transition: border-color 0.15s ease-in-out,
                        box-shadow 0.15s ease-in-out;
                }

                .input-group input:focus,
                .input-group textarea:focus {
                    border-color: #86b7fe;
                    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
                }

                .input-group textarea {
                    min-height: 190px;
                }

                .input-group-desc {
                    margin-top: 4px;
                    font-size: 14px;
                    color: #6c757d;
                }

                .input-group-submit-error {
                    color: red;
                }

                .post-internship-form-submit {
                    text-align: center;
                }
            `}</style>
        </Desktoplayout>
    )
}

export default Createinternship
