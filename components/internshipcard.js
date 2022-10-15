import React from 'react'
import Button from '../components/Button'
import { fullNameMonths, shortNameMonths } from '../constants/monthsAndDays'
import { useRouter } from 'next/router'
import Roundimage from './roundimage'
const Internshipcard = ({ internship }) => {
    const router = useRouter()

    const start_date = new Date(internship.start_date)
    const last_date = new Date(internship.last_date)

    return (
        <>
            <div className="internship-card tw-min-w-[70%]">
                <div className="tw-flex tw-flex-col">
                    <div className="tw-flex  tw-justify-start tw-m-3">
                        <div className="tw-w-24 tw-h-24 tw-mr-5" style={{ backgroundImage: "/portal_icon.png", borderRadius: "50%", backgroundSize: "cover" }} />
                        <div className="">
                            <h3>{internship.role}</h3>
                            <h5 className="tw-text-sm tw-text-gray-400">{internship.company_name}</h5>
                        </div>
                        <h5 className="tw-ml-auto tw-text-sm  tw-text-[#465AC5]">Apply by {fullNameMonths[last_date.getMonth()]}{' '}
                            {last_date.getDate()}</h5>
                    </div>
                    <p className="tw-m-3 tw-text-lg tw-text-slate-400 tw-font-regular" style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical ",
                        margin: "0 0 1em 0",
                        overflow: "hidden",
                    }}>{internship.about} </p>
                    <div className="tw-flex tw-gap-3 m-3">
                        <div className="tw-p-2 tw-pr-8 tw-pl-8 tw-rounded-lg tw-bg-[#F2F4F6] tw-text-black tw-font-bold">{internship.duration}</div>
                        <div className="tw-p-2 tw-pr-8 tw-pl-8 tw-rounded-lg tw-bg-[#F2F4F6] tw-text-black tw-font-bold">{internship.location}</div>
                    </div>
                </div>
                <div className="internship-actions">
                    <div className="tw-mr-auto tw-gap-2 tw-flex tw-items-center tw-justify-center tw-text-center">
                        <svg className="tw-block tw-m-auto" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect x="0.199219" y="0.339844" width="40" height="40" fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_1058_692" transform="scale(0.01)" />
                                </pattern>
                                <image id="image0_1058_692" width="100" height="100" xlinkHref="data:image/png;base64,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" />
                            </defs>
                        </svg>
                        <p className="tw-block tw-m-auto tw-text-lg tw-text-slate-400"><span className="tw-text-black tw-font-semibold">&#8377; {internship.stipend}</span> /month </p>
                    </div>
                    <Button
                        padding="6px 12px"
                        style={{
                            background: '#fff',
                            color: '#000',
                            lineHeight: 1.5,
                            color: '#212529',
                            fontSize: '16px',
                            fontWeight: '400',
                            border: '1px solid #dee2e6',
                            minWidth: '125px',
                            borderRadius: '4px',
                        }}
                        onClick={() => {
                            router.push(`/internships/${internship.id}`)
                        }}
                    >
                        View More
                    </Button>
                    <Button
                        padding=".375rem .75rem"
                        style={{
                            lineHeight: 1.5,
                            borderRadius: '.25rem',
                            minWidth: '125px',
                            fontSize: '1rem',
                            fontWeight: '400',
                            backgroundColor: '#5a52b7',
                            color: 'white',
                        }}
                        onClick={() => window.open(internship.apply_form)}
                    >
                        Apply
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .internship-card {
                    max-width: 400px;
                    padding: 16px;
                    border: 1px solid rgba(0, 0, 0, 0.125);
                    border-radius: 10px;
                    background: #fff;
                    display: flex;
                    width: calc(33.333% - 48px);
                    flex-direction: column;
                }
                @media screen and (max-width: 1490px) {
                    .internship-card {
                        width: calc(50% - 24px);
                        max-width: none;
                    }
                }
                @media screen and (max-width: 1100px) {
                    .internship-card {
                        width: 100%;
                    }
                }
                .internship-details {
                    flex: 1;
                }
                .internship-logo {
                    height: 65px;
                    max-width: 200px;
                    margin-bottom: 10px;
                }
                .internship-role {
                    line-height: 1.2;
                    font-weight: bolder;
                    font-size: 20px;
                    margin-bottom: 8px;
                }
                .internship-company-name {
                    line-height: 1.2;
                    color: #6c757d;
                    font-size: 15px;
                    margin-bottom: 8px;
                    text-transform: capitalize;
                }
                .internship-last-date {
                    color: rgb(70, 90, 197);
                    font-weight: bolder;
                    font-size: 15px;
                    margin-bottom: 8px;
                }
                .internship-other-details {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 28px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .internship-other-detail {
                    font-size: 15px;
                    margin-bottom: 16px;
                }
                .internship-other-detail-heading {
                    line-height: 1.2;
                    color: rgb(196, 196, 196);
                    margin-bottom: 8px;
                }
                .internship-other-detail-content {
                    text-align: center;
                    font-weight: bolder;
                }
                .internship-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                    gap: 10px;
                }
            `}</style>
        </>
    )
}

export default React.memo(Internshipcard, () => true)
