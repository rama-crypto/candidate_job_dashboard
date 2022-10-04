import React, { useContext, useEffect, useMemo, useState } from 'react'
import { RiShareBoxLine } from 'react-icons/ri'
import { useRouter } from 'next/router'

import AuthContext from '../../components/auth/AuthContext'
import { InternshipsApi } from '../../api/internship'
import Desktoplayout from '../../components/layout/layout'
import { Pageloader } from '../../components/loader'
import { fullNameMonths } from '../../constants/monthsAndDays'

const ViewInternship = () => {
    const router = useRouter()
    const { id } = router.query

    const { token } = useContext(AuthContext)

    const internApi = useMemo(() => new InternshipsApi(token), [token])

    const [internship, setInternship] = useState()

    useEffect(() => {
        const fetchInternship = async () => {
            let data = await internApi.fetchInternshipDetail(id)
            setInternship({
                ...data,
                start_date: new Date(data.start_date),
                last_date: new Date(data.last_date),
            })
        }
        token && fetchInternship()
    }, [internApi, id])

    if (!internship) {
        return (
            <>
                <Pageloader />
            </>
        )
    }

    return (
        <Desktoplayout>
            {/* <> */}
            <div className="view-internship">
                <div className="view-internship-card">
                    <div className="internship-details">
                        <div className="internship-logo" />
                        <div className="internship-role-company-name">
                            <div className="internship-role">
                                {internship.role}
                            </div>
                            <div className="company-name">
                                {internship.company_name}
                            </div>
                        </div>
                    </div>
                    <div className="apply-by">
                        Apply by{' '}
                        {fullNameMonths[internship.last_date.getMonth()]}{' '}
                        {internship.last_date.getDate()}
                    </div>
                </div>
                <div className="view-internship-card">
                    <div className="internship-other-details">
                        <div className="internship-other-detail">
                            <div className="internship-other-detail-heading">
                                Start Date
                            </div>
                            <div className="internship-other-detail-content">
                                {
                                    fullNameMonths[
                                        internship.start_date.getMonth()
                                    ]
                                }{' '}
                                {internship.start_date.getDate()}
                            </div>
                        </div>
                        <div className="internship-other-detail">
                            <div className="internship-other-detail-heading">
                                Duration
                            </div>
                            <div className="internship-other-detail-content">
                                {internship.duration}
                            </div>
                        </div>
                        <div className="internship-other-detail">
                            <div className="internship-other-detail-heading">
                                Stipend
                            </div>
                            <div className="internship-other-detail-content">
                                {internship.stipend}
                            </div>
                        </div>
                        <div className="internship-other-detail">
                            <div className="internship-other-detail-heading">
                                Closes on
                            </div>
                            <div className="internship-other-detail-content">
                                {
                                    fullNameMonths[
                                        internship.last_date.getMonth()
                                    ]
                                }{' '}
                                {internship.last_date.getDate()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="view-internship-card">
                    <div className="view-internship-card-heading">
                        Eligibility
                    </div>
                    <div className="view-internship-card-content">
                        {internship.elig}
                    </div>
                    <div className="view-internship-card-heading">
                        Responsibilities
                    </div>
                    <div className="view-internship-card-content">
                        {internship.resp}
                    </div>
                    <div className="view-internship-card-heading">Perks</div>
                    <div className="view-internship-card-content">
                        {internship.perks}
                    </div>
                </div>
                <div className="view-internship-card">
                    <div className="view-internship-card-heading">
                        About the Company
                    </div>
                    <div className="d-flex align-items-center">
                        <a
                            target={'_blank'}
                            href={internship?.website}
                            className="me-2 website"
                            rel={'nofollow noopener noreferrer'}
                        >
                            Website
                        </a>
                        <RiShareBoxLine color="#1a97df" size={16} />
                    </div>
                    <div className="view-internship-card-content">
                        <pre
                            style={{
                                fontSize: '16px',
                                fontWeight: 400,
                            }}
                        >
                            <p className="mt-1 poppins">{internship?.about}</p>
                        </pre>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .view-internship {
                    max-width: 736px;
                    padding: 24px;
                    margin-left: 5%;
                    margin-right: auto;
                    margin-top: 50px;
                    margin-bottom: 50px;
                    border-radius: 15px;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .view-internship-card {
                    padding: 16px;
                    border: 1px solid #dee2e6;
                    border-radius: 15px;
                }
                .view-internship-card-heading {
                    color: #212529;
                    line-height: 1.2;
                    font-size: 1.25rem;
                    font-weight: bolder;
                    margin-bottom: 12px;
                }
                .view-internship-card-content {
                    margin-bottom: 32px;
                    line-height: 1.5;
                    color: #212529;
                    font-size: 16px;
                    font-weight: 400;
                }
                .internship-details {
                    display: flex;
                    margin-bottom: 16px;
                    align-items: center;
                }
                .internship-logo {
                    margin-right: 16px;
                    width: 65px;
                    height: 65px;
                    background: url(${internship.logo});
                    background-size: cover;
                }
                .internship-role-company-name {
                    margin-left: 24px;
                }
                .internship-role {
                    margin-bottom: 8px;
                    color: #212529;
                    line-height: 1.2;
                    font-size: 1.5rem;
                    font-weight: bolder;
                }
                .company-name {
                    font-weight: 500;
                    line-height: 1.2;
                    font-size: 1.25rem;
                    color: #6c757d;
                    text-transform: capitalize;
                }
                .apply-by {
                    color: rgb(70, 90, 197);
                    font-weight: bolder;
                    font-size: 18px;
                    padding-top: 16px;
                }
                .internship-other-details {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    justify-content: space-between;
                    padding: 0px 12px;
                }
                .internship-other-detail {
                    text-align: center;
                    font-weight: 500;
                    line-height: 1.2;
                }
                .internship-other-detail-heading {
                    margin-bottom: 8px;
                    font-size: 1.25rem;
                    color: #6c757d;
                }
                .internship-other-detail-content {
                    color: #212529;
                    font-size: 1rem;
                }
                .website {
                    font-size: 16px;
                    text-decoration: none;
                    color: #1a97df;
                }
            `}</style>
            {/* </> */}
        </Desktoplayout>
    )
}

export default ViewInternship
